import { useState } from 'react'
import { QUESTION_TYPE } from '../../question-types.enum'

/*
{
  question_content: '2 + 2 = 4',
  question_type: 'yesorno',
  alternatives: [
    {
      answer_content: 'Yes',
      answer_correct: true,
    },
    {
      answer_content: 'No',
      answer_correct: false,
    }
  ]
}
*/
export function YesNoFormQuestion({ changeQuestionBody }) {
  
  const [yesNo, setYesNo] = useState(null)

  function genDataAndCreateQuestion(isYes) {
    const question = {
      question_type: QUESTION_TYPE.YES_NO,

      alternatives: [
        {
          answer_content: 'Yes',
          answer_correct: isYes,
        },
        {
          answer_content: 'No',
          answer_correct: !isYes,
        },
      ],
    }

    return changeQuestionBody(question)
  }

  const changeYesNo = (isYes) => {
    const isChangeSucess = genDataAndCreateQuestion(isYes)

    if (isChangeSucess) {
      setYesNo(isYes)
    }
  }

  return (
    <div className="type-1" id="option1-type-1">
      <input
        checked={yesNo === true}
        onChange={() => changeYesNo(true)}
        type="radio"
        value="yes"
        name="question_type"
      />{' '}
      Yes
      <br />
      <br />
      <input
        checked={yesNo === false}
        onChange={() => changeYesNo(false)}
        type="radio"
        value="no"
        name="question_type"
      />{' '}
      No
      <br />
      <br />
      <p
        style={{
          fontStyle: 'italic',
          color: 'rgb(151, 151, 151)',
          fontSize: '80%',
        }}
      >
        Note: Maximum 2 answers
      </p>
    </div>
  )
}
