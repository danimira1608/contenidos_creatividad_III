import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ArcadeFrame from '../components/layout/ArcadeFrame'
import BagPickerHeader from '../components/elegi-bag/BagPickerHeader'
import BagCarousel from '../components/elegi-bag/BagCarousel'
import ChooseBagFooter from '../components/elegi-bag/ChooseBagFooter'

const SLIDE_OUT_MS = 180

function ElegiTuBag({ content, bagOptions, onSelectBag, onSetName, onResetTotalScore }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [name, setName] = useState('')
  const [isNameConfirmed, setIsNameConfirmed] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [isContinuePressed, setIsContinuePressed] = useState(false)
  const [transitionPhase, setTransitionPhase] = useState('idle')
  const [transitionDirection, setTransitionDirection] = useState('next')
  const navigate = useNavigate()

  const changeBag = (direction) => {
    if (transitionPhase !== 'idle') return

    setTransitionDirection(direction)
    setTransitionPhase('out')

    setTimeout(() => {
      setSelectedIndex((current) => {
        const length = bagOptions.length
        return direction === 'next' ? (current + 1) % length : (current - 1 + length) % length
      })
      setTransitionPhase('in')

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionPhase('idle')
        })
      })
    }, SLIDE_OUT_MS)
  }

  const goToPrev = () => changeBag('prev')
  const goToNext = () => changeBag('next')

  const confirmName = () => {
    if (name.trim()) {
      setIsNameConfirmed(true)
      setNameError(false)
    }
  }

  const handleNameChange = (value) => {
    setName(value.toUpperCase())
    if (nameError) setNameError(false)
  }

  const handleContinue = () => {
    if (!name.trim()) {
      setNameError(true)
      return
    }

    setIsContinuePressed(true)

    setTimeout(() => {
      setIsContinuePressed(false)
      onSelectBag(bagOptions[selectedIndex])
      onSetName(name.trim())
      onResetTotalScore()
      navigate('/coffee-run')
    }, 150)
  }

  return (
    <>
      <nav className="page-nav">
        <Link className="page-nav__link" to="/como-jugar">
          ← Cómo Jugar
        </Link>
      </nav>

      <ArcadeFrame>
        <BagPickerHeader
          title={content.title}
          subtitle={content.subtitle}
          nameLabel={content.nameLabel}
          namePlaceholder={content.namePlaceholder}
          name={name}
          onNameChange={handleNameChange}
          isNameConfirmed={isNameConfirmed}
          onConfirmName={confirmName}
          nameError={nameError}
        />
        <BagCarousel
          options={bagOptions}
          selectedIndex={selectedIndex}
          onPrev={goToPrev}
          onNext={goToNext}
          transitionPhase={transitionPhase}
          transitionDirection={transitionDirection}
        />
        <ChooseBagFooter
          buttonLabel={content.continueButtonLabel}
          onContinue={handleContinue}
          isPressed={isContinuePressed}
        />
      </ArcadeFrame>
    </>
  )
}

export default ElegiTuBag
