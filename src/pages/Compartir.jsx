import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ArcadeFrame from '../components/layout/ArcadeFrame'
import PixelButton from '../components/common/PixelButton'
import PopupCard from '../components/coffee-run/PopupCard'
import heartIcon from '../assets/como-jugar/heart-icon.png'
import sparkle from '../assets/home/sparkle.png'
import haileyImage from '../assets/compartir/hailey-bag.png'
import haileyHands from '../assets/compartir/hailey-bag-manos.png'
import cameraIcon from '../assets/coffee-run/falling-camera.png'
import { loadLastRun } from '../utils/lastRun'
import './Compartir.css'

// Scattered around the whole screen; positions are percentages of the arcade frame.
const PAGE_DECORATIONS = [
  { type: 'sparkle', top: '4%', left: '10%', size: 3.4, duration: 2.4 },
  { type: 'heart', top: '6%', left: '84%', size: 2.6, duration: 1.6 },
  { type: 'sparkle', top: '12%', left: '90%', size: 2.2, duration: 3 },
  { type: 'heart', top: '14%', left: '5%', size: 2, duration: 1.9 },
  { type: 'sparkle', top: '24%', left: '3%', size: 2.6, duration: 2.7 },
  { type: 'sparkle', top: '30%', left: '93%', size: 3, duration: 2.2 },
  { type: 'heart', top: '44%', left: '2.5%', size: 2.4, duration: 1.7 },
  { type: 'sparkle', top: '52%', left: '94%', size: 2.4, duration: 2.9 },
  { type: 'heart', top: '64%', left: '93%', size: 2, duration: 1.5 },
  { type: 'sparkle', top: '70%', left: '3%', size: 3, duration: 2.5 },
  { type: 'heart', top: '82%', left: '6%', size: 2.2, duration: 1.8 },
  { type: 'sparkle', top: '86%', left: '90%', size: 2.8, duration: 2.3 },
]

// Inside the result card; percentages of the card.
const CARD_DECORATIONS = [
  { type: 'sparkle', top: '2%', left: '4%', size: 3, duration: 2.6 },
  { type: 'heart', top: '3%', left: '89%', size: 2.4, duration: 1.6 },
  { type: 'sparkle', top: '20%', left: '91%', size: 2, duration: 2.1 },
  { type: 'heart', top: '24%', left: '3%', size: 1.8, duration: 1.9 },
  { type: 'sparkle', top: '46%', left: '2.5%', size: 2.4, duration: 3 },
  { type: 'sparkle', top: '52%', left: '92%', size: 2.6, duration: 2.4 },
  { type: 'heart', top: '86%', left: '5%', size: 2.2, duration: 1.7 },
  { type: 'sparkle', top: '88%', left: '89%', size: 2.8, duration: 2.8 },
  // Extra hearts around Hailey and the bag.
  { type: 'heart', top: '10%', left: '15%', size: 2.6, duration: 1.8 },
  { type: 'heart', top: '32%', left: '13%', size: 2.2, duration: 2 },
  { type: 'heart', top: '40%', left: '84%', size: 2.2, duration: 1.7 },
]

function formatScore(score) {
  return String(Math.max(0, score)).padStart(5, '0')
}

function renderDecorations(decorations, className) {
  return decorations.map((deco, index) => (
    <img
      key={index}
      className={`${className} ${deco.type === 'heart' ? 'decorative-pulse' : 'decorative-sparkle'}`}
      src={deco.type === 'heart' ? heartIcon : sparkle}
      alt=""
      style={{
        top: deco.top,
        left: deco.left,
        width: `${deco.size}cqw`,
        animationDuration: `${deco.duration}s`,
        animationDelay: `${(index % 4) * 0.3}s`,
      }}
    />
  ))
}

function Compartir({ content, bagOptions, selectedBag, playerName, totalScore }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  // ?aviso=no skips the screenshot notice (used by the screen navigator).
  const [isNoticeDismissed, setIsNoticeDismissed] = useState(false)
  const showNotice = !isNoticeDismissed && searchParams.get('aviso') !== 'no'

  // Same as Ranking: prefer the persisted last run so a reload keeps the real result.
  const lastRun = loadLastRun()
  const name = lastRun?.name || playerName || 'Jugadora'
  const score = lastRun ? lastRun.score : totalScore
  const bag = bagOptions.find((option) => option.id === lastRun?.bagId) || selectedBag

  // Picked once per visit so the phrase doesn't change on re-render.
  const [phrase] = useState(() => content.phrases[Math.floor(Math.random() * content.phrases.length)])

  return (
    <ArcadeFrame>
      <div className="compartir">
        {renderDecorations(PAGE_DECORATIONS, 'compartir__deco')}

        <header className="compartir__header">
          <h1 className="compartir__title">{name}</h1>
          <p className="compartir__subtitle">{content.subtitle}</p>
        </header>

        <div className="compartir__card">
          {renderDecorations(CARD_DECORATIONS, 'compartir__deco')}

          <div className="compartir__showcase">
            {/* Bag sits between Hailey and a cut-out of her raised hand, so her fingers pinch the handle. */}
            <div className="compartir__figure">
              <img className="compartir__hailey" src={haileyImage} alt={content.haileyAlt} />
              <img
                className="compartir__bag"
                src={bag.image}
                alt={`Mini bag ${bag.label}`}
                style={{ filter: `${bag.filter ?? ''} var(--compartir-bag-outline)` }}
              />
              <img className="compartir__hands" src={haileyHands} alt="" />
            </div>
            <p className="compartir__bag-label">
              {content.bagLabel}: <span className="compartir__bag-color">{bag.label}</span>
            </p>
          </div>

          <div className="compartir__score">
            <span className="compartir__score-label">
              <img className="compartir__score-heart" src={heartIcon} alt="" />
              {content.scoreLabel}
              <img className="compartir__score-heart" src={heartIcon} alt="" />
            </span>
            <span className="compartir__score-value">{formatScore(score)}</span>
          </div>

          <p className="compartir__phrase">{phrase}</p>
        </div>

        <PixelButton className="compartir__cta" onClick={() => navigate('/ranking')}>
          {content.backLabel}
        </PixelButton>

        {showNotice && (
          <div className="compartir-notice" onClick={() => setIsNoticeDismissed(true)}>
            <PopupCard className="compartir-notice__card">
              <div className="compartir-notice__title-row">
                <img className="compartir-notice__sparkle decorative-sparkle" src={sparkle} alt="" style={{ animationDuration: '2.2s' }} />
                <p className="compartir-notice__title">{content.noticeTitle}</p>
                <img
                  className="compartir-notice__sparkle decorative-sparkle"
                  src={sparkle}
                  alt=""
                  style={{ animationDuration: '2.6s', animationDelay: '0.4s' }}
                />
              </div>
              <img className="compartir-notice__camera" src={cameraIcon} alt="" />
              <p className="compartir-notice__text">
                {content.noticeText} <span className="compartir-notice__handle">{content.noticeHandle}</span>
              </p>
              <p className="compartir-notice__hint">{content.noticeHint}</p>
            </PopupCard>
          </div>
        )}
      </div>
    </ArcadeFrame>
  )
}

export default Compartir
