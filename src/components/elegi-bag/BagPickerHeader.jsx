import heartIcon from '../../assets/como-jugar/heart-icon.png'
import sparkle from '../../assets/home/sparkle.png'
import './BagPickerHeader.css'

function BagPickerHeader({
  title,
  subtitle,
  nameLabel,
  namePlaceholder,
  name,
  onNameChange,
  isNameConfirmed,
  onConfirmName,
  nameError,
}) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onConfirmName()
    }
  }

  return (
    <header className="bag-picker-header">
      <img
        className="bag-picker-header__sparkle bag-picker-header__sparkle--left decorative-sparkle"
        src={sparkle}
        alt=""
        style={{ animationDuration: '3s', animationDelay: '0.4s' }}
      />
      <img
        className="bag-picker-header__sparkle bag-picker-header__sparkle--right decorative-sparkle"
        src={sparkle}
        alt=""
        style={{ animationDuration: '2.6s', animationDelay: '1.2s' }}
      />

      <div className="bag-picker-header__title-row">
        <img className="bag-picker-header__heart" src={heartIcon} alt="" />
        <h1 className="bag-picker-header__title">{title}</h1>
        <img className="bag-picker-header__heart" src={heartIcon} alt="" />
      </div>

      <p className="bag-picker-header__subtitle">{subtitle}</p>

      {isNameConfirmed ? (
        <p className="bag-picker-header__name-confirmed">¡Hola, {name}! ✧</p>
      ) : (
        <>
          <label className="bag-picker-header__name-label" htmlFor="player-name">
            {nameLabel} *
          </label>
          <input
            id="player-name"
            className={`bag-picker-header__name-input ${nameError ? 'bag-picker-header__name-input--error' : ''}`}
            type="text"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={namePlaceholder}
            required
          />
          {nameError && <p className="bag-picker-header__name-error">Ingresá tu nombre para continuar</p>}
        </>
      )}
    </header>
  )
}

export default BagPickerHeader
