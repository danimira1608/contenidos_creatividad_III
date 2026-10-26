import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ArcadeFrame from '../components/layout/ArcadeFrame'
import ComoJugarBanner from '../components/como-jugar/ComoJugarBanner'
import HowItWorksSection from '../components/como-jugar/HowItWorksSection'
import InfoSection from '../components/como-jugar/InfoSection'
import LevelsSection from '../components/como-jugar/LevelsSection'
import ComoJugarFooter from '../components/como-jugar/ComoJugarFooter'

function ComoJugar({ content }) {
  const [isNextPressed, setIsNextPressed] = useState(false)
  const navigate = useNavigate()

  const handleNext = () => {
    setIsNextPressed(true)
    console.log('SIGUIENTE presionado')

    setTimeout(() => {
      setIsNextPressed(false)
      navigate('/elegi-tu-bag')
    }, 150)
  }

  return (
    <>
      <nav className="page-nav">
        <Link className="page-nav__link" to="/">
          ← Home
        </Link>
      </nav>

      <ArcadeFrame>
        <ComoJugarBanner title={content.title} introLines={content.introLines} tagline={content.tagline} />
        <HowItWorksSection title={content.howItWorksTitle} items={content.howItWorksItems} />
        <InfoSection title={content.infoTitle} items={content.infoItems} />
        <LevelsSection title={content.levelsTitle} bannerAlt={content.levelsBannerAlt} />
        <ComoJugarFooter buttonLabel={content.nextButtonLabel} onNext={handleNext} isPressed={isNextPressed} />
      </ArcadeFrame>
    </>
  )
}

export default ComoJugar
