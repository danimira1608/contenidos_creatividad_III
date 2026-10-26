import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArcadeFrame from '../components/layout/ArcadeFrame'
import HomeHeader from '../components/home/HomeHeader'
import BagShowcase from '../components/home/BagShowcase'
import HomeFooter from '../components/home/HomeFooter'

function Home({ content }) {
  const [isPlayPressed, setIsPlayPressed] = useState(false)
  const navigate = useNavigate()

  const handlePlay = () => {
    setIsPlayPressed(true)
    console.log('JUGAR presionado')

    setTimeout(() => {
      setIsPlayPressed(false)
      navigate('/como-jugar')
    }, 150)
  }

  return (
    <ArcadeFrame>
      <HomeHeader title={content.headerTitle} logoAlt={content.headerLogoAlt} />
      <BagShowcase heroAlt={content.bagAlt} />
      <HomeFooter
        tagline={content.footerTagline}
        buttonLabel={content.playButtonLabel}
        onPlay={handlePlay}
        isPressed={isPlayPressed}
      />
    </ArcadeFrame>
  )
}

export default Home
