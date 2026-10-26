import './PixelButton.css'

function PixelButton({ children, onClick, type = 'button', className = '', pressed = false }) {
  return (
    <div className={`pixel-button ${className} ${pressed ? 'pixel-button--pressed' : ''}`}>
      <span className="pixel-button__shadow" aria-hidden="true" />
      <button type={type} className="pixel-button__face" onClick={onClick}>
        <span className="pixel-button__chevron" aria-hidden="true">
          &gt;
        </span>
        <span className="pixel-button__label">{children}</span>
        <span className="pixel-button__chevron" aria-hidden="true">
          &lt;
        </span>
      </button>
    </div>
  )
}

export default PixelButton
