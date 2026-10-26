import heartIcon from '../../assets/como-jugar/heart-icon.png'
import './LevelBanner.css'

function LevelBanner({ title }) {
  return (
    <div className="level-banner">
      <img className="level-banner__heart" src={heartIcon} alt="" />
      <p className="level-banner__title">{title}</p>
      <img className="level-banner__heart" src={heartIcon} alt="" />
    </div>
  )
}

export default LevelBanner
