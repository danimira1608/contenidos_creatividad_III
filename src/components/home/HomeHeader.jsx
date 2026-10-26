import rhodeLogo from '../../assets/home/rhode-logo.png'
import heartDivider from '../../assets/home/heart-divider.png'
import sparkle from '../../assets/home/sparkle.png'
import './HomeHeader.css'

function HomeHeader({ title = 'mini bag', logoAlt = 'rhode' }) {
  return (
    <header className="home-header">
      <img className="home-header__logo" src={rhodeLogo} alt={logoAlt} />

      <h1 className="home-header__title">
        <span className="home-header__title-back" aria-hidden="true">
          {title}
        </span>
        <span className="home-header__title-front">{title}</span>
      </h1>

      <img className="home-header__divider" src={heartDivider} alt="" />

      <img
        className="home-header__sparkle home-header__sparkle--right decorative-sparkle"
        src={sparkle}
        alt=""
        style={{ animationDuration: '3.2s', animationDelay: '0s' }}
      />
      <img
        className="home-header__sparkle home-header__sparkle--left decorative-sparkle"
        src={sparkle}
        alt=""
        style={{ animationDuration: '2.8s', animationDelay: '0.9s' }}
      />

      <div className="home-header__heart">
        <div className="home-header__heart-base" style={{ backgroundImage: `url(${heartDivider})` }} />
        <div
          className="home-header__heart-shine decorative-heart-shine"
          style={{
            WebkitMaskImage: `url(${heartDivider})`,
            maskImage: `url(${heartDivider})`,
            animationDuration: '4.2s',
            animationDelay: '0.7s',
          }}
        />
      </div>
    </header>
  )
}

export default HomeHeader
