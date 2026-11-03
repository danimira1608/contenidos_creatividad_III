import cornerHeartTop from '../../assets/home/corner-heart-top.png'
import cornerHeartBottom from '../../assets/home/corner-heart-bottom.png'
import arcadeMockup from '../../assets/layout/arcade-mockup.jpg'
import arcadeJoystickBall from '../../assets/layout/arcade-joystick-ball.png'
import './ArcadeFrame.css'

function ArcadeFrame({ children, decorated = true }) {
  return (
    <div className="arcade-viewport">
      {/* On wide screens the game sits inside the arcade machine's screen of this photo. */}
      <div className="arcade-mockup" style={{ backgroundImage: `url(${arcadeMockup})` }}>
        <div className="arcade-mockup__screen">
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
        {/* The joystick knob overlaps the screen's edge in the photo; redraw it on top of the game. */}
        <img className="arcade-mockup__joystick" src={arcadeJoystickBall} alt="" />
      </div>
    </div>
  )
}

export default ArcadeFrame
