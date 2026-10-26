import bagProductsIcon from '../../assets/coffee-run/next-level.png'
import sparkle from '../../assets/home/sparkle.png'
import './RankingBoard.css'

function RankingBoard({ entries }) {
  const [first, ...rest] = entries

  return (
    <div className="ranking-board">
      {first && (
        <div className="ranking-board__first">
          <div className="ranking-board__first-left">
            <span className="ranking-board__first-rank">1.</span>
            <span className="ranking-board__first-label">{first.name}</span>
          </div>
          <div className="ranking-board__first-bag-wrap">
            <img
              className="ranking-board__first-sparkle ranking-board__first-sparkle--a decorative-sparkle"
              src={sparkle}
              alt=""
              style={{ animationDuration: '2.4s' }}
            />
            <img
              className="ranking-board__first-sparkle ranking-board__first-sparkle--b decorative-sparkle"
              src={sparkle}
              alt=""
              style={{ animationDuration: '2.8s', animationDelay: '0.4s' }}
            />
            <img
              className="ranking-board__first-sparkle ranking-board__first-sparkle--c decorative-sparkle"
              src={sparkle}
              alt=""
              style={{ animationDuration: '2.2s', animationDelay: '0.8s' }}
            />
            <img
              className="ranking-board__first-sparkle ranking-board__first-sparkle--d decorative-sparkle"
              src={sparkle}
              alt=""
              style={{ animationDuration: '3.1s', animationDelay: '0.2s' }}
            />
            <img
              className="ranking-board__first-sparkle ranking-board__first-sparkle--e decorative-sparkle"
              src={sparkle}
              alt=""
              style={{ animationDuration: '2.6s', animationDelay: '0.6s' }}
            />
            <img
              className="ranking-board__first-sparkle ranking-board__first-sparkle--f decorative-sparkle"
              src={sparkle}
              alt=""
              style={{ animationDuration: '3.4s', animationDelay: '1s' }}
            />
            <img className="ranking-board__first-bag" src={bagProductsIcon} alt="" />
          </div>
          <span className="ranking-board__first-score">{first.scoreLabel}</span>
        </div>
      )}

      {rest.length > 0 && (
        <ul className="ranking-board__list">
          {rest.map((entry) => (
            <li
              key={entry.name}
              className={`ranking-board__row ${entry.isPlayer ? 'ranking-board__row--player' : ''}`}
            >
              <span className="ranking-board__rank">{entry.rank}.</span>
              <span className="ranking-board__name">{entry.name}</span>
              <span className="ranking-board__score">{entry.scoreLabel}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RankingBoard
