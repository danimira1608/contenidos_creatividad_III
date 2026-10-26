import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import ArcadeFrame from '../components/layout/ArcadeFrame'
import GameHud from '../components/coffee-run/GameHud'
import EssentialsChecklist from '../components/coffee-run/EssentialsChecklist'
import LevelBanner from '../components/coffee-run/LevelBanner'
import FallingItemsLayer from '../components/coffee-run/FallingItemsLayer'
import PlayerBag from '../components/coffee-run/PlayerBag'
import LevelUpOverlay from '../components/coffee-run/LevelUpOverlay'
import GameOverOverlay from '../components/coffee-run/GameOverOverlay'
import PauseOverlay from '../components/coffee-run/PauseOverlay'
import LevelIntroOverlay from '../components/coffee-run/LevelIntroOverlay'
import { saveLastRun } from '../utils/lastRun'
import './LevelPlay.css'

const WIN_REDIRECT_MS = 7000
const LOSE_REDIRECT_MS = 5000

const TICK_MS = 50
const CATCH_BAND_START = 74
const CATCH_BAND_END = 86
const CATCH_RADIUS = 8.5
const BAG_MIN_POSITION = 18
const BAG_MAX_POSITION = 82
const BAG_STEP = 10
const INTRO_COUNT_START = 3
const INTRO_TICK_MS = 2500
const MAX_ATTEMPTS = 2

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

// The heart bonus (extra life) gets more weight the fewer lives the player
// has left, so recovery becomes more likely exactly when it matters most —
// instead of always being an even coin flip against the points bonus.
function pickBonus(pool, currentLives, maxLives) {
  const weighted = pool.flatMap((item) => {
    if (item.id !== 'heart') return [item]
    const urgency = maxLives - currentLives
    return Array(1 + urgency).fill(item)
  })
  return pickRandom(weighted)
}

function createFallingItem(content, currentLives) {
  const roll = Math.random()
  let kind = 'essential'
  let pool = content.essentialItems
  let isBonusPool = false

  if (roll < 0.12) {
    kind = 'bonus'
    pool = content.bonusItems.filter((item) => !item.onlyWhenBelowMaxLives || currentLives < content.maxLives)
    isBonusPool = true
    if (pool.length === 0) {
      kind = 'essential'
      pool = content.essentialItems
      isBonusPool = false
    }
  } else if (roll < 0.4) {
    kind = 'distractor'
    pool = content.distractorItems
  }

  const def = isBonusPool ? pickBonus(pool, currentLives, content.maxLives) : pickRandom(pool)
  return {
    id: `${Date.now()}-${Math.random()}`,
    kind,
    itemId: def.id,
    image: def.image,
    filter: def.filter,
    points: def.points,
    xPercent: 12 + Math.random() * 76,
    yPercent: 8,
  }
}

function formatScore(score) {
  return String(score).padStart(5, '0')
}

function formatTime(totalSeconds) {
  const clamped = Math.max(0, totalSeconds)
  const minutes = Math.floor(clamped / 60)
  const seconds = clamped % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function LevelPlay({ content, selectedBag, playerName, totalScore, onLevelComplete, nextRoute, backTo, backLabel }) {
  const [bagPosition, setBagPosition] = useState(50)
  const [score, setScore] = useState(totalScore)
  const [remainingSeconds, setRemainingSeconds] = useState(content.timeLimitSeconds)
  const [lives, setLives] = useState(content.maxLives)
  const [essentialsCollected, setEssentialsCollected] = useState([])
  const [bonusLivesGained, setBonusLivesGained] = useState(0)
  const [extraPoints, setExtraPoints] = useState(0)
  const [fallingItems, setFallingItems] = useState([])
  const [isPaused, setIsPaused] = useState(false)
  const [introCount, setIntroCount] = useState(INTRO_COUNT_START)
  const [attemptNumber, setAttemptNumber] = useState(1)

  // Preview mode (?preview=intro|pause|win|lives|time) shows a popup without playing.
  const [searchParams] = useSearchParams()
  const preview = searchParams.get('preview')

  const hasStarted = introCount <= 0
  const isGameOver = lives <= 0
  const isWin = !isGameOver && essentialsCollected.length === content.essentialItems.length
  const isTimeUp = !isWin && !isGameOver && remainingSeconds <= 0
  const isRoundOver = isGameOver || isWin || isTimeUp
  const isFrozen = isRoundOver || isPaused || !hasStarted || Boolean(preview)
  const canRetry = attemptNumber < MAX_ATTEMPTS

  const bagPositionRef = useRef(bagPosition)
  const livesRef = useRef(lives)
  const isFrozenRef = useRef(isFrozen)
  const spawnTimerRef = useRef(0)
  const fallingItemsRef = useRef([])
  const hasCommittedScoreRef = useRef(false)

  const timeBonus = isWin ? remainingSeconds : 0
  const cumulativeScore = score + timeBonus

  useEffect(() => {
    bagPositionRef.current = bagPosition
  }, [bagPosition])

  useEffect(() => {
    livesRef.current = lives
  }, [lives])

  useEffect(() => {
    isFrozenRef.current = isFrozen
  }, [isFrozen])

  const togglePause = () => {
    if (isRoundOver) return
    setIsPaused((current) => !current)
  }

  useEffect(() => {
    if (introCount <= 0 || preview) return undefined
    const timeout = setTimeout(() => setIntroCount((current) => current - 1), INTRO_TICK_MS)
    return () => clearTimeout(timeout)
  }, [introCount, preview])

  useEffect(() => {
    if (!isWin || hasCommittedScoreRef.current) return
    hasCommittedScoreRef.current = true
    const finalScore = score + remainingSeconds
    onLevelComplete(finalScore)
    saveLastRun(playerName, finalScore, selectedBag.id)
  }, [isWin, score, remainingSeconds, onLevelComplete, playerName, selectedBag.id])

  const navigate = useNavigate()
  const [redirectProgress, setRedirectProgress] = useState(0)

  const goToNextLevel = () => {
    navigate(nextRoute)
  }

  const goHome = () => {
    navigate('/')
  }

  const goToRanking = () => {
    onLevelComplete(score)
    saveLastRun(playerName, score, selectedBag.id)
    navigate('/ranking')
  }

  const handleRoundLoss = () => {
    if (canRetry) {
      goHome()
    } else {
      goToRanking()
    }
  }

  const retryLevel = () => {
    setAttemptNumber((current) => current + 1)
    setBagPosition(50)
    setScore(totalScore)
    setRemainingSeconds(content.timeLimitSeconds)
    setLives(content.maxLives)
    setEssentialsCollected([])
    setBonusLivesGained(0)
    setExtraPoints(0)
    setFallingItems([])
    fallingItemsRef.current = []
    spawnTimerRef.current = 0
    setIsPaused(false)
    setRedirectProgress(0)
    hasCommittedScoreRef.current = false
  }

  useEffect(() => {
    if (!isRoundOver) return undefined

    const redirectMs = isWin ? WIN_REDIRECT_MS : LOSE_REDIRECT_MS
    const startedAt = Date.now()
    const interval = setInterval(() => {
      const fraction = Math.min(1, (Date.now() - startedAt) / redirectMs)
      setRedirectProgress(fraction)
      if (fraction >= 1) {
        clearInterval(interval)
        if (isWin) {
          goToNextLevel()
        } else {
          handleRoundLoss()
        }
      }
    }, 50)

    return () => clearInterval(interval)
  }, [isRoundOver, isWin, canRetry])

  const moveLeft = () => {
    setBagPosition((current) => Math.max(BAG_MIN_POSITION, current - BAG_STEP))
  }

  const moveRight = () => {
    setBagPosition((current) => Math.min(BAG_MAX_POSITION, current + BAG_STEP))
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isFrozenRef.current) return
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        moveLeft()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        moveRight()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const applyCatchEffect = (item) => {
    if (item.kind === 'essential') {
      setScore((current) => current + (item.points ?? 10))
      setEssentialsCollected((current) => (current.includes(item.itemId) ? current : [...current, item.itemId]))
    } else if (item.kind === 'distractor') {
      setLives((current) => Math.max(0, current - 1))
    } else if (item.itemId === 'phone-case') {
      setScore((current) => current + 50)
      setExtraPoints((current) => current + 50)
    } else if (item.itemId === 'heart') {
      setLives((current) => {
        if (current >= content.maxLives) return current
        setBonusLivesGained((gained) => gained + 1)
        return current + 1
      })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isFrozenRef.current) return

      // The falling-items list lives in a ref (not just state) so this whole
      // tick can be computed synchronously in plain JS. Passing a function to
      // setFallingItems here would let React StrictMode invoke it twice in
      // development to check for impurity, which would fire applyCatchEffect
      // (score/lives changes) twice per real catch.
      const current = fallingItemsRef.current
      const moved = current.map((item) => ({ ...item, yPercent: item.yPercent + content.fallStep }))

      spawnTimerRef.current += TICK_MS
      let next = moved
      if (spawnTimerRef.current >= content.spawnIntervalMs) {
        spawnTimerRef.current = 0
        next = [...moved, createFallingItem(content, livesRef.current)]
      }

      const survivors = []
      const caught = []
      for (const item of next) {
        const inBand = item.yPercent >= CATCH_BAND_START && item.yPercent <= CATCH_BAND_END
        const inBagX = Math.abs(item.xPercent - bagPositionRef.current) <= CATCH_RADIUS

        if (inBand && inBagX) {
          caught.push(item)
          continue
        }
        if (item.yPercent > 106) continue
        survivors.push(item)
      }

      fallingItemsRef.current = survivors
      setFallingItems(survivors)
      caught.forEach(applyCatchEffect)
    }, TICK_MS)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isFrozenRef.current) return
      setRemainingSeconds((current) => Math.max(0, current - 1))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const essentialItemsWithState = content.essentialItems.map((item) => ({
    ...item,
    collected: essentialsCollected.includes(item.id),
  }))

  return (
    <>
      <nav className="page-nav">
        <Link className="page-nav__link" to={backTo}>
          ← {backLabel}
        </Link>
      </nav>

      <ArcadeFrame decorated={false}>
        <img className="level-play__background" src={content.backgroundImage} alt="" />
        <div className="level-play__overlay" />

        <FallingItemsLayer items={fallingItems} />
        <LevelBanner title={content.levelName} />

        <GameHud
          level={content.level}
          levelName={content.levelName}
          score={formatScore(score)}
          time={formatTime(remainingSeconds)}
          lives={lives}
          maxLives={content.maxLives}
          isPaused={isPaused}
          onTogglePause={togglePause}
        />
        <EssentialsChecklist
          title={content.essentialsTitle}
          items={essentialItemsWithState}
          bonusLabel={content.bonusLabel}
          bonusPoints={`+${extraPoints}`}
          bonusCount={bonusLivesGained}
        />
        <PlayerBag
          positionPercent={bagPosition}
          bagImage={selectedBag.image}
          bagFilter={selectedBag.filter}
          onMoveLeft={moveLeft}
          onMoveRight={moveRight}
          disabled={isFrozen}
        />

        {(preview ? preview === 'intro' : !hasStarted) && (
          <LevelIntroOverlay
            level={content.level}
            levelName={content.levelName}
            essentialsTitle={content.essentialsTitle}
            essentialItems={content.essentialItems}
            introSubtitle={content.introSubtitle}
            introHighlight={content.introHighlight}
            difficultyNote={content.difficultyNote}
            countdownLabel={content.introCountdownLabel}
            count={introCount}
          />
        )}

        {(preview ? preview === 'pause' : hasStarted && isPaused && !isRoundOver) && (
          <PauseOverlay onResume={togglePause} />
        )}

        {(preview ? preview === 'win' : isWin) && (
          <LevelUpOverlay
            nextLevelLabel={content.nextLevelLabel}
            playerName={playerName}
            score={formatScore(cumulativeScore)}
            timeBonus={timeBonus}
            onContinue={goToNextLevel}
            progress={redirectProgress}
            ctaLabel={nextRoute === '/ranking' ? 'VER RANKING' : 'SIGUIENTE NIVEL'}
          />
        )}

        {(preview ? preview === 'lives' || preview === 'time' : isGameOver || isTimeUp) && (
          <GameOverOverlay
            reason={preview ? preview : isGameOver ? 'lives' : 'time'}
            finalScore={formatScore(cumulativeScore)}
            canRetry={canRetry}
            attemptsRemaining={MAX_ATTEMPTS - attemptNumber}
            onRetry={retryLevel}
            onGoHome={handleRoundLoss}
            progress={redirectProgress}
          />
        )}
      </ArcadeFrame>
    </>
  )
}

export default LevelPlay
