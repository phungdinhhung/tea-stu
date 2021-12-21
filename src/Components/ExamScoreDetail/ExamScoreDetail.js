import { axios } from '@/instances/axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import './ExamScoreDetail.css'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ExamScoreDetail() {
  const { location } = useHistory()
  const [result, setResult] = useState({})
  const [quizs, setQuizs] = useState([]) 
  async function fetchQuestion() {
    const response = await axios.get(
      `/result/one-exam/${location.state}/${location.pathname.split('/')[2]}` // result/one-exam
    )
    setResult({
      ...response?.data?.result,
    }) 
    setQuizs(response?.data?.result?.quiz)
    console.log('get: ', response?.data)
  }
  useEffect(() => {
    fetchQuestion()
  }, [])

  const updateEssayScore = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.patch(
        `/result/one-exam/${location.state}/${location.pathname.split('/')[2]}`,
        result
      )
      setResult(response?.data) 
      console.log('patch: ', response)
    } catch (error) {
      alert(error)
    }
    const updateSuccess = () => {
      // custom toast is the title
      toast('Update Success', {
        className: 'done',
        draggable: true,
        position: toast.POSITION.TOP_CENTER,
      })
    }
    // alert('You have successfully updated')
    updateSuccess()
    
  }
  const onChangeEssayScore = (e, index) => {
    const newQuiz = result.quiz
    newQuiz[index] = {
      ...newQuiz[index],
      [e.target.name]: Number(e.target.value),
    }
    console.log(newQuiz)
    setResult({ ...result, quiz: newQuiz }) 
    console.log('essay score: ', result.essay_score)
  }
  return (
    <div className="exam-score-detail">
      <ToastContainer draggable={false} transition={Bounce} autoClose={7000} />
      {quizs?.map((question, indexQuestion) => {
        return (
          <div key={indexQuestion} className="total-question">
            <label className="question">
              Question {indexQuestion + 1}
              {'. '}
            </label>{' '}
            <label className="infor-question">
              {question.point_question}
              {' (points)'}
            </label>
            <br />
            <label>{question.question_content}</label>
            <br />
            <div className="answer-content">
              {question.alternatives.map((alternative, indexAlternative) => (
                <div
                  className="total-answer"
                  key={indexAlternative}
                  style={{
                    marginLeft: '4%',
                    fontWeight: alternative.answer_correct ? 'bold' : 'none',
                  }}
                >
                  {question.question_type !== 'contentresult' ? (
                    <>
                      <label>
                        {indexAlternative == 0
                          ? 'A'
                          : indexAlternative == 1
                          ? 'B'
                          : indexAlternative == 2
                          ? 'C'
                          : 'D'}
                      </label>
                      {'. '}
                      <label>{alternative.answer_content}</label>
                    </>
                  ) : null}
                  {question.question_type !== 'contentresult' ? (
                    <label
                      className="style-answer-choosen"
                      style={{
                        color:
                          alternative.answer_choosen ===
                          alternative.answer_correct
                            ? 'LimeGreen'
                            : 'red',
                      }}
                    >
                      {alternative.answer_choosen === true &&
                      alternative.answer_correct === true ? (
                        <>
                          <ion-icon name="checkmark-outline"></ion-icon>
                        </>
                      ) : alternative.answer_choosen === true &&
                        alternative.answer_correct === false ? (
                        <>
                          <ion-icon name="close-outline"></ion-icon>
                        </>
                      ) : null}
                    </label>
                  ) : (
                    <>
                      <input
                        value={alternative.essay_answer_content}
                        type="text"
                        className="add-score"
                      />
                      <div className="student-mark">
                        <input
                          type="number"
                          step={0.1}
                          min={0}
                          max={question.point_question}
                          className="mark"
                          onChange={(e) => {
                            onChangeEssayScore(e, indexQuestion)
                          }}
                          defaultValue={question.essay_score}
                          name="essay_score"
                        />{' '}
                        Score
                        {question.essay_score > question.point_question ? (
                          <>
                            <p style={{ color: 'red', fontStyle: 'italic' }}>
                              Update score should not exceed{' '}
                              {question.point_question} points
                            </p>
                          </>
                        ) : question.essay_score < 0 ? (
                          <>
                            <p style={{ color: 'red', fontStyle: 'italic' }}>
                              Update score should not be less than 0
                            </p>
                          </>
                        ) : null}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}
      <form
        className="update-essay-score"
        onSubmit={(event) => {
          updateEssayScore(event)
        }}
      >
        <button>Update essay score</button>
      </form>
    </div>
  )
}
