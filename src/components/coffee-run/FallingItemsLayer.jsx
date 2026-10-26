import './FallingItemsLayer.css'

function FallingItemsLayer({ items }) {
  return (
    <div className="falling-items">
      {items.map((item) => (
        <div
          key={item.id}
          className="falling-items__item"
          data-kind={item.kind}
          style={{ left: `${item.xPercent}%`, top: `${item.yPercent}%` }}
        >
          <div className="falling-items__trail" />
          <img className="falling-items__sprite" src={item.image} alt="" style={{ filter: item.filter }} />
        </div>
      ))}
    </div>
  )
}

export default FallingItemsLayer
