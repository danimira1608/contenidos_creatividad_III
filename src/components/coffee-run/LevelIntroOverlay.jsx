import PopupCard from './PopupCard'
import heartIcon from '../../assets/como-jugar/heart-icon.png'
import './LevelIntroOverlay.css'

function LevelIntroOverlay({
  level,
  levelName,
  essentialsTitle,
  essentialItems,
  introSubtitle,
  introHighlight,
  difficultyNote,
  countdownLabel,
  count,
}) {
  return (
    <div className="level-intro">
      <PopupCard className="level-intro__card">
        <p className="level-intro__level-tag">
          <img className="level-intro__level-tag-heart" src={heartIcon} alt="" />
          {level}
          <img className="level-intro__level-tag-heart" src={heartIcon} alt="" />
        </p>

        <div className="level-intro__title-pill">
          <img className="level-intro__title-heart" src={heartIcon} alt="" />
          <p className="level-intro__title">{levelName}</p>
          <img className="level-intro__title-heart" src={heartIcon} alt="" />
        </div>

        <p className="level-intro__subtitle">{introSubtitle}</p>
        <p className="level-intro__highlight">
          <img
            className="level-intro__highlight-heart decorative-pulse"
            src={heartIcon}
            alt=""
            style={{ animationDuration: '1.4s' }}
          />
          {introHighlight}
          <img
            className="level-intro__highlight-heart decorative-pulse"
            src={heartIcon}
            alt=""
            style={{ animationDuration: '1.4s', animationDelay: '0.3s' }}
          />
        </p>

        <p className="level-intro__essentials-title">{essentialsTitle}</p>
        <div className="level-intro__grid-wrap">
          <img
            className="level-intro__grid-heart level-intro__grid-heart--a decorative-pulse"
            src={heartIcon}
            alt=""
            style={{ animationDuration: '1.6s' }}
          />
          <img
            className="level-intro__grid-heart level-intro__grid-heart--b decorative-pulse"
            src={heartIcon}
            alt=""
            style={{ animationDuration: '1.8s', animationDelay: '0.4s' }}
          />
          <div className="level-intro__grid">
            {essentialItems.map((item) => (
              <div className="level-intro__slot" key={item.id}>
                <img className="level-intro__slot-icon" src={item.image} alt="" />
                <span className="level-intro__slot-label">{item.label}</span>
                <span className="level-intro__slot-points">+{item.points}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="level-intro__divider">
          <span className="level-intro__divider-line" />
          <img className="level-intro__divider-heart decorative-pulse" src={heartIcon} alt="" style={{ animationDuration: '1.5s' }} />
          <span className="level-intro__divider-line" />
        </div>

        {difficultyNote && (
          <div className="level-intro__difficulty-note">
            <span className="level-intro__difficulty-note-icon decorative-pulse" style={{ animationDuration: '1.3s' }}>
              {'\u26A0\uFE0E'}
            </span>
            <p className="level-intro__difficulty-note-text">{difficultyNote}</p>
          </div>
        )}

        <p className="level-intro__countdown-label">{countdownLabel}</p>
        <div className="level-intro__countdown-row">
          <img className="level-intro__countdown-heart decorative-pulse" src={heartIcon} alt="" style={{ animationDuration: '1s' }} />
          <p className="level-intro__countdown-number" key={count}>
            {count}
          </p>
          <img
            className="level-intro__countdown-heart decorative-pulse"
            src={heartIcon}
            alt=""
            style={{ animationDuration: '1s', animationDelay: '0.2s' }}
          />
        </div>
      </PopupCard>
    </div>
  )
}

export default LevelIntroOverlay
