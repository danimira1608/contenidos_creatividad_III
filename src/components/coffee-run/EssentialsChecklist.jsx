import bonusIcon from '../../assets/coffee-run/bonus-phone-case.png'
import heartIcon from '../../assets/como-jugar/heart-icon.png'
import './EssentialsChecklist.css'

function EssentialsChecklist({ title, items, bonusLabel, bonusPoints, bonusCount }) {
  return (
    <div className="essentials-checklist">
      <div className="essentials-checklist__group">
        <p className="essentials-checklist__title">{title}</p>
        <div className="essentials-checklist__items">
          {items.map((item) => (
            <div key={item.id} className="essentials-checklist__slot">
              <img
                className="essentials-checklist__icon"
                src={item.image}
                alt={item.label}
                style={{ opacity: item.collected ? 1 : 0.28 }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="essentials-checklist__group">
        <p className="essentials-checklist__title">{bonusLabel}</p>
        <div className="essentials-checklist__bonus">
          <img className="essentials-checklist__bonus-icon" src={bonusIcon} alt="" />
          <span className="essentials-checklist__bonus-points">{bonusPoints}</span>
          <img className="essentials-checklist__bonus-heart" src={heartIcon} alt="" />
          <span className="essentials-checklist__bonus-count">{bonusCount}</span>
        </div>
      </div>
    </div>
  )
}

export default EssentialsChecklist
