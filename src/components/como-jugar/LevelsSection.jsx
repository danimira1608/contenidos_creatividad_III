import SectionPanel from './SectionPanel'
import levelsBanner from '../../assets/como-jugar/levels-banner.png'
import './LevelsSection.css'

function LevelsSection({ title, bannerAlt }) {
  return (
    <SectionPanel title={title} className="levels-section">
      <img
        className="levels-section__banner decorative-float"
        src={levelsBanner}
        alt={bannerAlt}
        style={{ animationDuration: '6s', '--float-distance': '-2.5%' }}
      />
    </SectionPanel>
  )
}

export default LevelsSection
