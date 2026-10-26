import cornerHeartTop from '../../assets/home/corner-heart-top.png'
import cornerHeartBottom from '../../assets/home/corner-heart-bottom.png'
import './ArcadeFrame.css'

function ArcadeFrame({ children, decorated = true }) {
  return (
    <div className="arcade-viewport">
      <div className={`arcade-cabinet ${decorated ? '' : 'arcade-cabinet--plain'}`}>
        {decorated && (
          <>
            <img
              className="arcade-cabinet__corner arcade-cabinet__corner--top-left"
              src={cornerHeartTop}
              alt=""
            />
            <img
              className="arcade-cabinet__corner arcade-cabinet__corner--top-right"
              src={cornerHeartTop}
              alt=""
            />
            <img
              className="arcade-cabinet__corner arcade-cabinet__corner--bottom-left"
              src={cornerHeartBottom}
              alt=""
            />
            <img
              className="arcade-cabinet__corner arcade-cabinet__corner--bottom-right"
              src={cornerHeartBottom}
              alt=""
            />
          </>
        )}
        {children}
      </div>
    </div>
  )
}

export default ArcadeFrame
