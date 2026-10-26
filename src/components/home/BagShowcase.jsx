import heroBag from '../../assets/home/hero-bag.png'
import shadowEllipse from '../../assets/home/shadow-ellipse.svg'
import heartDivider from '../../assets/home/heart-divider.png'
import sparkle from '../../assets/home/sparkle.png'
import './BagShowcase.css'

function BagShowcase({ heroAlt = 'Mini bag de rhode' }) {
  return (
    <div className="bag-showcase">
      <img
        className="bag-showcase__sparkle bag-showcase__sparkle--left decorative-sparkle"
        src={sparkle}
        alt=""
        style={{ animationDuration: '3.6s', animationDelay: '0.6s' }}
      />
      <img
        className="bag-showcase__sparkle bag-showcase__sparkle--right decorative-sparkle"
        src={sparkle}
        alt=""
        style={{ animationDuration: '3s', animationDelay: '1.4s' }}
      />
      <img
        className="bag-showcase__sparkle bag-showcase__sparkle--top-left decorative-sparkle"
        src={sparkle}
        alt=""
        style={{ animationDuration: '2.6s', animationDelay: '1s' }}
      />
      <img
        className="bag-showcase__sparkle bag-showcase__sparkle--top-right decorative-sparkle"
        src={sparkle}
        alt=""
        style={{ animationDuration: '3.3s', animationDelay: '0.3s' }}
      />

      <div className="bag-showcase__heart bag-showcase__heart--left">
        <div className="bag-showcase__heart-base" style={{ backgroundImage: `url(${heartDivider})` }} />
        <div
          className="bag-showcase__heart-shine decorative-heart-shine"
          style={{
            WebkitMaskImage: `url(${heartDivider})`,
            maskImage: `url(${heartDivider})`,
            animationDuration: '4.5s',
            animationDelay: '0.4s',
          }}
        />
      </div>
      <div className="bag-showcase__heart bag-showcase__heart--right">
        <div className="bag-showcase__heart-base" style={{ backgroundImage: `url(${heartDivider})` }} />
        <div
          className="bag-showcase__heart-shine decorative-heart-shine"
          style={{
            WebkitMaskImage: `url(${heartDivider})`,
            maskImage: `url(${heartDivider})`,
            animationDuration: '5.2s',
            animationDelay: '1.6s',
          }}
        />
      </div>

      <div className="bag-showcase__hero-wrap decorative-float" style={{ animationDuration: '4.2s' }}>
        <img className="bag-showcase__hero" src={heroBag} alt={heroAlt} />
        <div
          className="bag-showcase__hero-shine decorative-heart-shine"
          style={{
            WebkitMaskImage: `url(${heroBag})`,
            maskImage: `url(${heroBag})`,
            animationDuration: '5.5s',
            animationDelay: '0.2s',
          }}
        />
      </div>

      <div className="bag-showcase__heart bag-showcase__heart--bottom">
        <div className="bag-showcase__heart-base" style={{ backgroundImage: `url(${heartDivider})` }} />
        <div
          className="bag-showcase__heart-shine decorative-heart-shine"
          style={{
            WebkitMaskImage: `url(${heartDivider})`,
            maskImage: `url(${heartDivider})`,
            animationDuration: '4.8s',
            animationDelay: '1s',
          }}
        />
      </div>

      <div className="bag-showcase__shadow">
        <img src={shadowEllipse} alt="" />
      </div>
    </div>
  )
}

export default BagShowcase
