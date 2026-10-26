import SectionPanel from './SectionPanel'
import joystickIcon from '../../assets/como-jugar/joystick-icon.png'
import bagIcon from '../../assets/como-jugar/bag-icon.png'
import productTubeIcon from '../../assets/como-jugar/product-tube-icon.png'
import keysIcon from '../../assets/como-jugar/keys-icon.png'
import cupIcon from '../../assets/como-jugar/cup-icon.png'
import './HowItWorksSection.css'

function HowItWorksSection({ title, items }) {
  const [moveItem, catchItem, avoidItem] = items

  return (
    <SectionPanel title={title} className="how-it-works">
      <div className="how-it-works__column">
        <div className="how-it-works__icon-row">
          <span className="how-it-works__chevron" aria-hidden="true">
            &lt;
          </span>
          <img
            className="how-it-works__joystick decorative-wiggle"
            src={joystickIcon}
            alt=""
            style={{ animationDuration: '2.2s' }}
          />
          <span className="how-it-works__chevron" aria-hidden="true">
            &gt;
          </span>
        </div>
        <p className="how-it-works__label">{moveItem.label}</p>
        <p className="how-it-works__desc">{moveItem.description}</p>
      </div>

      <div className="how-it-works__column">
        <div className="how-it-works__icon-row how-it-works__icon-row--catch decorative-float" style={{ animationDuration: '3.4s' }}>
          <img className="how-it-works__bag" src={bagIcon} alt="" />
          <img className="how-it-works__product" src={productTubeIcon} alt="" />
        </div>
        <p className="how-it-works__label">{catchItem.label}</p>
        <p className="how-it-works__desc">{catchItem.description}</p>
      </div>

      <div className="how-it-works__column">
        <div
          className="how-it-works__icon-row how-it-works__icon-row--avoid decorative-wiggle"
          style={{ animationDuration: '2.6s' }}
        >
          <img className="how-it-works__keys" src={keysIcon} alt="" />
          <span className="how-it-works__cross" aria-hidden="true">
            ✕
          </span>
          <img className="how-it-works__cup" src={cupIcon} alt="" />
          <span className="how-it-works__cross" aria-hidden="true">
            ✕
          </span>
        </div>
        <p className="how-it-works__label">{avoidItem.label}</p>
        <p className="how-it-works__desc">{avoidItem.description}</p>
      </div>
    </SectionPanel>
  )
}

export default HowItWorksSection
