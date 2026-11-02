import PopupCard from './PopupCard'
import heartIcon from '../../assets/como-jugar/heart-icon.png'
import './LevelIntroOverlay.css'

function LevelIntroOverlay({
  level,
  levelName,
  essentialsTitle,
  essentialItems,
  distractorsTitle,
  distractorItems,
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

        <section className="level-intro__section">
          <p className="level-intro__section-title">
            {essentialsTitle} <span className="level-intro__highlight">{introHighlight}</span>
          </p>
          {/* One even row per group, however many items the level has. */}
          <div className="level-intro__grid" style={{ '--columns': essentialItems.length }}>
            {essentialItems.map((item) => (
              <div className="level-intro__slot" key={item.id}>
                <img className="level-intro__slot-icon" src={item.image} alt="" />
                <span className="level-intro__slot-label">{item.label}</span>
                <span className="level-intro__slot-points">+{item.points}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="level-intro__section">
          <p className="level-intro__section-title">{distractorsTitle}</p>
          <div className="level-intro__grid" style={{ '--columns': distractorItems.length }}>
            {distractorItems.map((item) => (
              <div className="level-intro__slot level-intro__slot--distractor" key={item.id}>
                <img className="level-intro__slot-icon" src={item.image} alt="" />
                <span className="level-intro__slot-label">{item.label}</span>
                <span className="level-intro__slot-points">
                  -1
                  <img className="level-intro__slot-heart" src={heartIcon} alt="vida" />
                </span>
              </div>
            ))}
          </div>
        </section>

        {difficultyNote && (
          <p className="level-intro__difficulty-note">
            <span className="level-intro__difficulty-note-icon" aria-hidden="true">
              {'⚠︎'}
            </span>
            {difficultyNote}
          </p>
        )}

        <div className="level-intro__countdown">
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
        </div>
      </PopupCard>
    </div>
  )
}

export default LevelIntroOverlay
