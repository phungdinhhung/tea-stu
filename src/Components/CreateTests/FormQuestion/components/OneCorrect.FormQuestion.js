import { Fragment, useState } from 'react'
import { QUESTION_TYPE } from '../../question-types.enum'

const ANSWERS = [
  { code: 'a', placeholder: 'Enter Answer A', content: '' },
  { code: 'b', placeholder: 'Enter Answer B', content: '' },
  { code: 'c', placeholder: 'Enter Answer C', content: '' },
  { code: 'd', placeholder: 'Enter Answer D', content: '' },
]

export function OneCorrectFormQuestion({ changeQuestionBody }) {
  const [answers, setAnswers] = useState(ANSWERS)
  const [choosenAns, setChoosenAns] = useState(null)

  function handleChangeQuestionBody(choosenAns) {
    const question = {
      question_type: QUESTION_TYPE.ONE_CORRECT,
      alternatives: answers.map((answer) => ({
        answer_content: answer.content,
        answer_correct: choosenAns.code === answer.code, // true or false
      })),
    }

    return changeQuestionBody(question)
  }

  function changeAnswer(newChoosenAns) {
    // create question on parent component
    const isCreated = handleChangeQuestionBody(newChoosenAns)

    if (!isCreated) {
      return
    }

    setChoosenAns(newChoosenAns)
  }

  function changeAnswerContent(ans, ev) {
    const content = ev.target.value
    setAnswers(
      answers.map((a) => (a.code === ans.code ? { ...ans, content } : a))
    )
  }

  return (
    <div className="type-3" id="option1-type-3">
      {answers.map((ans, i) => (
        <Fragment key={i}>
          <input
            type="radio"
            value={ans.code}
            checked={choosenAns?.code === ans.code}
            onChange={() => changeAnswer(ans)}
            name="question_type"
          />{' '}
          <input
            type="text"
            className="input-2"
            placeholder={ans.placeholder}
            onChange={(ev) => changeAnswerContent(ans, ev)}
            name="question_type"
          />
          <br />
          <br />
        </Fragment>
      ))}
      <p
        style={{
          fontStyle: 'italic',
          color: 'rgb(151, 151, 151)',
          fontSize: '80%',
        }}
      >
        Note: Maximum 4 answers
      </p>
    </div>
  )
}
