import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import ArcadeFrame from '../components/layout/ArcadeFrame'
import PixelButton from '../components/common/PixelButton'
import RankingHeader from '../components/ranking/RankingHeader'
import RankingMessageBox from '../components/ranking/RankingMessageBox'
import RankingBoard from '../components/ranking/RankingBoard'
import { loadLastRun } from '../utils/lastRun'
import './Ranking.css'

const STORAGE_KEY = 'rhode-mini-bag-ranking-v3'
const BOARD_SIZE = 10

function formatScore(score) {
  return String(Math.max(0, score)).padStart(5, '0')
}

function loadStoredRanking(seed) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : null
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : seed
  } catch {
    return seed
  }
}

function saveRanking(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // localStorage unavailable (private mode, etc.) — ranking just won't persist
  }
}

function Ranking({ content, mockRivals, playerName, totalScore, onPlayAgain }) {
  const navigate = useNavigate()

  // Prefer the persisted "last run" over the live props: a full page reload
  // resets playerName/totalScore back to their defaults, but the actual
  // result of the run you just finished should still be reflected here.
  const lastRun = loadLastRun()
  const playerLabel = lastRun?.name || playerName || 'Jugadora'
  const playerScore = lastRun ? lastRun.score : totalScore

  const { board, outsideRank, message, highlight } = useMemo(() => {
    const stored = loadStoredRanking(mockRivals)
    const others = stored.filter((entry) => entry.name !== playerLabel)
    const merged = [...others, { name: playerLabel, score: playerScore }]
    merged.sort((a, b) => b.score - a.score)
    saveRanking(merged)

    const ranked = merged.map((entry, index) => ({
      ...entry,
      rank: index + 1,
      isPlayer: entry.name === playerLabel,
      scoreLabel: formatScore(entry.score),
    }))

    const top = ranked.slice(0, BOARD_SIZE)
    const player = ranked.find((entry) => entry.isPlayer)
    const playerInTop = top.some((entry) => entry.isPlayer)

    let messageText = content.messageEncourage
    let messageHighlight = 'top 3'
    if (player && player.rank <= 3) {
      messageText = content.messageTopThree
      messageHighlight = null
    } else if (player && player.rank <= 5) {
      messageText = content.messageClose
      messageHighlight = null
    }

    return {
      board: top,
      outsideRank: playerInTop || !player ? null : player.rank,
      message: messageText,
      highlight: messageHighlight,
    }
  }, [playerLabel, playerScore, content, mockRivals])

  const handlePlayAgain = () => {
    onPlayAgain()
    navigate('/')
  }

  return (
    <ArcadeFrame>
      <div className="ranking">
        <RankingHeader title={content.title} subtitle={content.subtitle} />
        <RankingMessageBox text={message} highlight={highlight} />
        <RankingBoard entries={board} />
        {outsideRank && (
          <p className="ranking__outside">
            {content.outsideBoardLabel} <span className="ranking__outside-rank">{outsideRank}</span>
          </p>
        )}
        <div className="ranking__actions">
          <PixelButton className="ranking__cta" onClick={handlePlayAgain}>
            {content.playAgainLabel}
          </PixelButton>
          <PixelButton className="ranking__cta ranking__cta--secondary" onClick={() => navigate('/compartir')}>
            {content.shareLabel}
          </PixelButton>
        </div>
      </div>
    </ArcadeFrame>
  )
}

export default Ranking
