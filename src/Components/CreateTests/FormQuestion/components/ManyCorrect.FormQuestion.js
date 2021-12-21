import { Fragment, useState } from 'react'
import { QUESTION_TYPE } from '../../question-types.enum'

const ANSWERS = [
  { code: 'a', placeholder: 'Enter Answer A', content: '' },
  { code: 'b', placeholder: 'Enter Answer B', content: '' },
  { code: 'c', placeholder: 'Enter Answer C', content: '' },
  { code: 'd', placeholder: 'Enter Answer D', content: '' },
]

export function ManyCorrectFormQuestion({ changeQuestionBody }) {
  const [answers, setAnswers] = useState(ANSWERS)
  const [checkedAnswers, setCheckedAnswers] = useState([])

  function handleChangeQuestionBody(checkedAnswersList) {
    const question = {
      question_type: QUESTION_TYPE.MANY_CORRECT,
      alternatives: answers.map((answer) => ({
        answer_content: answer.content,
        answer_correct: checkedAnswersList.some((a) => a.code === answer.code),
      })),
    }

    return changeQuestionBody(question)
  }

  function checkAnswer(ans) {
    return checkedAnswers.concat(ans)
  }
  function uncheckAnswer(ans) {
    return checkedAnswers.filter((a) => a.code !== ans.code)
  }

  function toggleCheckedAnswer(ans) {
    let newCheckedAnswersList

    const isChecked = checkedAnswers.some((a) => a.code === ans.code)
    if (isChecked) {
      newCheckedAnswersList = uncheckAnswer(ans)
    } else {
      newCheckedAnswersList = checkAnswer(ans)
    }

    // create question on parent component
    const isCreated = handleChangeQuestionBody(newCheckedAnswersList)

    //create failure
    if (isCreated) {
      setCheckedAnswers(newCheckedAnswersList)
    }
  }

  function changeAnswerContent(ans, ev) {
    const content = ev.target.value
    setAnswers(
      answers.map((a) => (a.code === ans.code ? { ...ans, content } : a))
    )
  }

  return (
    <div className="type-2">
      {answers.map((ans, i) => (
        <Fragment key={i}>
          <input
            type="checkbox"
            value={ans.code}
            checked={checkedAnswers.some((a) => a.code === ans.code)}
            onChange={() => toggleCheckedAnswer(ans)}
            name="question_type"
            id="type2_checkbox1"
          />{' '}
          <input
            type="text"
            className="input-2"
            name="type2_answer"
            value={ans.answer_content}
            onChange={(ev) => changeAnswerContent(ans, ev)}
            placeholder={ans.placeholder}
          />
          <br />
          <br />
        </Fragment>
      ))}
      <p style={{ fontStyle: 'italic', color: 'rgb(151, 151, 151)', fontSize: '80%' }}>
        Note: Maximum 4 answers
      </p>
    </div>
  )
}
