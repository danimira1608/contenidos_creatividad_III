import SectionPanel from './SectionPanel'
import heartsRowIcon from '../../assets/como-jugar/hearts-row-icon.png'
import clockIcon from '../../assets/como-jugar/clock-icon.png'
import sparkleIcon from '../../assets/home/sparkle.png'
import './InfoSection.css'

function InfoSection({ title, items }) {
  const [livesItem, timeItem, bonusItem] = items

  return (
    <SectionPanel title={title} className="info-section">
      <div className="info-section__column">
        <div className="info-section__icon-slot">
          <img
            className="info-section__icon info-section__icon--hearts decorative-pulse"
            src={heartsRowIcon}
            alt=""
            style={{ animationDuration: '1.8s' }}
          />
        </div>
        <p className="info-section__label">{livesItem.label}</p>
        <p className="info-section__desc">{livesItem.description}</p>
      </div>

      <div className="info-section__column">
        <div className="info-section__icon-slot">
          <img
            className="info-section__icon info-section__icon--clock decorative-wiggle"
            src={clockIcon}
            alt=""
            style={{ animationDuration: '2.4s' }}
          />
        </div>
        <p className="info-section__label">{timeItem.label}</p>
        <p className="info-section__desc">{timeItem.description}</p>
      </div>

      <div className="info-section__column">
        <div className="info-section__icon-slot">
          <img
            className="info-section__icon info-section__icon--sparkle decorative-sparkle"
            src={sparkleIcon}
            alt=""
            style={{ animationDuration: '2.2s' }}
          />
        </div>
        <p className="info-section__label">{bonusItem.label}</p>
        <p className="info-section__desc">{bonusItem.description}</p>
      </div>
    </SectionPanel>
  )
}

export default InfoSection
