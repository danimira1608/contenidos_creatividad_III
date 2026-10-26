import panelBg from '../../assets/como-jugar/panel-bg.png'
import './SectionPanel.css'

function SectionPanel({ title, children, className = '' }) {
  return (
    <div className={`section-panel ${className}`}>
      <img className="section-panel__bg" src={panelBg} alt="" />
      <h2 className="section-panel__title">{title}</h2>
      <div className="section-panel__content">{children}</div>
    </div>
  )
}

export default SectionPanel
