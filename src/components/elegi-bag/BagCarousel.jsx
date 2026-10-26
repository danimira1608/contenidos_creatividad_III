import joystickIcon from '../../assets/elegi-bag/joystick.png'
import './BagCarousel.css'

function BagCarousel({ options, selectedIndex, onPrev, onNext, transitionPhase, transitionDirection }) {
  const total = options.length
  const prevOption = options[(selectedIndex - 1 + total) % total]
  const nextOption = options[(selectedIndex + 1) % total]
  const current = options[selectedIndex]

  let selectedClass = 'bag-carousel__selected'
  if (transitionPhase === 'out') {
    selectedClass += transitionDirection === 'next' ? ' bag-carousel__selected--out-next' : ' bag-carousel__selected--out-prev'
  } else if (transitionPhase === 'in') {
    selectedClass += transitionDirection === 'next' ? ' bag-carousel__selected--in-next' : ' bag-carousel__selected--in-prev'
  }

  return (
    <div className="bag-carousel">
      <div className="bag-carousel__peek-clip">
        <div className="bag-carousel__glow bag-carousel__glow--left" />
        <div className="bag-carousel__glow bag-carousel__glow--right" />
        <img
          className="bag-carousel__peek bag-carousel__peek--left"
          src={prevOption.image}
          alt=""
          style={{ filter: prevOption.filter }}
        />
        <img
          className="bag-carousel__peek bag-carousel__peek--right"
          src={nextOption.image}
          alt=""
          style={{ filter: nextOption.filter }}
        />
      </div>

      <div className="bag-carousel__shadow" />
      <img className={selectedClass} src={current.image} alt={current.label} style={{ filter: current.filter }} />

      <p className="bag-carousel__label">{current.label}</p>

      <div className="bag-carousel__dots">
        {options.map((option, index) => (
          <span
            key={option.id}
            className={`bag-carousel__dot ${index === selectedIndex ? 'bag-carousel__dot--active' : ''}`}
          />
        ))}
      </div>

      <div className="bag-carousel__controls">
        <button
          type="button"
          className="bag-carousel__arrow"
          onClick={onPrev}
          aria-label="Ver mini bag anterior"
        >
          ‹----
        </button>
        <img className="bag-carousel__joystick" src={joystickIcon} alt="" />
        <button
          type="button"
          className="bag-carousel__arrow"
          onClick={onNext}
          aria-label="Ver mini bag siguiente"
        >
          ----›
        </button>
      </div>
    </div>
  )
}

export default BagCarousel
