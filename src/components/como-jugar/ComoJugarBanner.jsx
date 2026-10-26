import heartIcon from '../../assets/como-jugar/heart-icon.png'
import sparkle from '../../assets/home/sparkle.png'
import './ComoJugarBanner.css'

function ComoJugarBanner({ title, introLines = [], tagline }) {
  return (
    <header className="como-jugar-banner">
      <img
        className="como-jugar-banner__sparkle como-jugar-banner__sparkle--left decorative-sparkle"
        src={sparkle}
        alt=""
        style={{ animationDuration: '3.1s', animationDelay: '0.2s' }}
      />
      <img
        className="como-jugar-banner__sparkle como-jugar-banner__sparkle--right decorative-sparkle"
        src={sparkle}
        alt=""
        style={{ animationDuration: '2.7s', animationDelay: '1.1s' }}
      />

      <div className="como-jugar-banner__tab">
        <img className="como-jugar-banner__heart" src={heartIcon} alt="" />
        <h1 className="como-jugar-banner__title">{title}</h1>
        <img className="como-jugar-banner__heart" src={heartIcon} alt="" />
      </div>

      <p className="como-jugar-banner__intro">
        {introLines.map((line, index) => (
          <span key={line}>
            {line}
            {index < introLines.length - 1 && <br />}
          </span>
        ))}
      </p>

      <p className="como-jugar-banner__tagline decorative-text-shine" style={{ animationDuration: '2.6s' }}>
        ✧ {tagline} ✧
      </p>
    </header>
  )
}

export default ComoJugarBanner
