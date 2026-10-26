import heartIcon from '../../assets/como-jugar/heart-icon.png'
import sparkle from '../../assets/home/sparkle.png'
import './RankingHeader.css'

function RankingHeader({ title, subtitle }) {
  return (
    <header className="ranking-header">
      <div className="ranking-header__heart-row">
        <img
          className="ranking-header__sparkle ranking-header__sparkle--left decorative-sparkle"
          src={sparkle}
          alt=""
          style={{ animationDuration: '2.6s' }}
        />
        <img className="ranking-header__heart decorative-pulse" src={heartIcon} alt="" style={{ animationDuration: '1.6s' }} />
        <img
          className="ranking-header__sparkle ranking-header__sparkle--right decorative-sparkle"
          src={sparkle}
          alt=""
          style={{ animationDuration: '3s', animationDelay: '0.5s' }}
        />
      </div>
      <h1 className="ranking-header__title">{title}</h1>
      <p className="ranking-header__subtitle">{subtitle}</p>
    </header>
  )
}

export default RankingHeader
