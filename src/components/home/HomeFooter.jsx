import sparkle from '../../assets/home/sparkle.png'
import heartDivider from '../../assets/home/heart-divider.png'
import PixelButton from '../common/PixelButton'
import './HomeFooter.css'

function HomeFooter({
  tagline = 'armá tu mini bag y conseguí el mayor puntaje',
  buttonLabel = 'JUGAR',
  onPlay,
  isPressed = false,
}) {
  return (
    <footer className="home-footer">
      <img
        className="home-footer__sparkle home-footer__sparkle--left decorative-sparkle"
        src={sparkle}
        alt=""
        style={{ animationDuration: '3.4s', animationDelay: '0.3s' }}
      />
      <img
        className="home-footer__sparkle home-footer__sparkle--right decorative-sparkle"
        src={sparkle}
        alt=""
        style={{ animationDuration: '2.8s', animationDelay: '1s' }}
      />

      <div className="home-footer__heart home-footer__heart--left">
        <div className="home-footer__heart-base" style={{ backgroundImage: `url(${heartDivider})` }} />
        <div
          className="home-footer__heart-shine decorative-heart-shine"
          style={{
            WebkitMaskImage: `url(${heartDivider})`,
            maskImage: `url(${heartDivider})`,
            animationDuration: '4.4s',
            animationDelay: '0.5s',
          }}
        />
      </div>
      <img
        className="home-footer__sparkle home-footer__sparkle--bottom decorative-sparkle"
        src={sparkle}
        alt=""
        style={{ animationDuration: '3.1s', animationDelay: '0.6s' }}
      />

      <p className="home-footer__tagline">{tagline}</p>

      <PixelButton className="home-footer__cta" onClick={onPlay} pressed={isPressed}>
        {buttonLabel}
      </PixelButton>
    </footer>
  )
}

export default HomeFooter
