import { Fragment } from 'react'
import heartIcon from '../../assets/como-jugar/heart-icon.png'
import sparkleIcon from '../../assets/home/sparkle.png'
import './RankingMessageBox.css'

// Leading single-word exclamation (e.g. "¡Felicitaciones!") is shown as a big title.
const TITLE_PATTERN = /^(¡[^\s!]+!)\s*(.*)$/s

// Whitespace right after a sentence-ending mark.
const SENTENCE_BREAK = /(?<=[.!?])\s+/

// Positions are relative to each side column, so they never overlap the text.
const LEFT_DECORATIONS = [
  { type: 'sparkle', top: '4%', left: '8%', size: 2.6 },
  { type: 'heart', top: '10%', left: '62%', size: 1.6 },
  { type: 'heart', top: '52%', left: '14%', size: 2.4 },
  { type: 'sparkle', top: '66%', left: '66%', size: 1.6 },
]

const RIGHT_DECORATIONS = [
  { type: 'sparkle', top: '8%', left: '12%', size: 1.8 },
  { type: 'heart', top: '6%', left: '56%', size: 2.4 },
  { type: 'heart', top: '64%', left: '10%', size: 1.6 },
  { type: 'sparkle', top: '50%', left: '54%', size: 2.6 },
]

function RankingMessageBox({ text, highlight }) {
  const titleMatch = text.match(TITLE_PATTERN)
  const title = titleMatch ? titleMatch[1] : null
  const body = titleMatch ? titleMatch[2] : text
  // Each sentence goes on its own line.
  const sentences = body.split(SENTENCE_BREAK)

  const renderSentence = (sentence) => {
    if (!highlight || !sentence.includes(highlight)) return sentence
    const [before, after] = sentence.split(highlight)
    return (
      <>
        {before}
        <span className="ranking-message__highlight">{highlight}</span>
        {after}
      </>
    )
  }

  const renderSide = (decorations, side) => (
    <div className={`ranking-message__side ranking-message__side--${side}`} aria-hidden="true">
      {decorations.map((deco, index) => (
        <img
          key={index}
          className="ranking-message__deco"
          src={deco.type === 'heart' ? heartIcon : sparkleIcon}
          alt=""
          style={{ top: deco.top, left: deco.left, width: `${deco.size}cqw` }}
        />
      ))}
    </div>
  )

  return (
    <div className="ranking-message">
      <div className="ranking-message__inner">
        {renderSide(LEFT_DECORATIONS, 'left')}
        <div className="ranking-message__content">
          {title && <p className="ranking-message__title">{title}</p>}
          <p className="ranking-message__text">
            {sentences.map((sentence, index) => (
              <Fragment key={index}>
                {index > 0 && <br />}
                {renderSentence(sentence)}
              </Fragment>
            ))}
          </p>
        </div>
        {renderSide(RIGHT_DECORATIONS, 'right')}
      </div>
    </div>
  )
}

export default RankingMessageBox
