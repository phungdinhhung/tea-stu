import React, { useRef } from 'react'
import './ExamBankDetail.css'
import { useEffect, useState } from 'react'
import { axios } from '@/instances/axios'
import moment from 'moment'
import { useHistory } from 'react-router'
import { TOPICS } from '../CreateTests/topics.mock'
import { HOUROPEN } from '../CreateTests/hourOpen.mock'
import { MINUTEOPEN } from '../CreateTests/minuteOpen.mock'
import { SECONDOPEN } from '../CreateTests/secondOpen.mock'
import { HOURDUE } from '../CreateTests/hourDue.mock'
import { MINUTEDUE } from '../CreateTests/minuteDue.mock'
import { SECONDDUE } from '../CreateTests/secondDue.mock'
import ReactToPrint from 'react-to-print'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ExamBankDetail() {
  const { location } = useHistory()
  const [status, setStatus] = useState(true)
  const [topics, setTopics] = useState([TOPICS])
  const [hourOpen, setHourOpen] = useState([HOUROPEN])
  const [minuteOpen, setMinuteOpen] = useState([MINUTEOPEN])
  const [secondOpen, setSecondOpen] = useState([SECONDOPEN])
  const [hourDue, setHourDue] = useState([HOURDUE])
  const [minuteDue, setMinuteDue] = useState([MINUTEDUE])
  const [secondDue, setSecondDue] = useState([SECONDDUE])
  const [question, setQuestion] = useState({})
  const [quizs, setQuizs] = useState([])
  const [visibleAnswer, setVisibleAnswer] = useState(false)
  const componentRef = useRef()

  async function fetchUser() {
    const response = await axios.get(`/quiz/question/${location.state}`)
    setQuizs(response?.data.question.quiz)
    setQuestion(response?.data?.question)
    console.log(response)
  }
  useEffect(() => {
    fetchUser()
  }, [])

  const submitEdit = async () => {
    const response = await axios.patch(`/quiz/question/${location.state}`, {
      quiz: quizs,
      exam_date_db: question.exam_date_db,
      exam_topic_db: question.exam_topic_db,
      hourOpenDb: question.hourOpenDb,
      minuteOpenDb: question.minuteOpenDb,
      secondOpenDb: question.secondOpenDb,
      hourDueDb: question.hourDueDb,
      minuteDueDb: question.minuteDueDb,
      secondDueDb: question.secondDueDb,
      totalScoreDb: question.totalScoreDb,
    })
    setQuizs(response?.data?.updateQuestion.quiz)
    const notifyUpdateExamSuccess = () => {
      toast('Update Sucess 🎉🎉🎉', {
        className: 'notify-success',
        draggable: true,
        position: toast.POSITION.TOP_CENTER,
      })
    }
    notifyUpdateExamSuccess()
    console.log('update', response)
  }
  const checkInformation = () => {
    if (status == true) {
      return showInformation()
    } else {
      return editInformation()
    }
  }

  const editClick = () => {
    setStatus(false)
  }

  const updateClick = () => {
    setStatus(true)
  }

  const submitUpdate = () => {
    {
      submitEdit()
    }
    {
      updateClick()
    }
  }

  const onChangeQuestionInformation = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value })
  }

  const onChangeQuestion = (e, index) => {
    const newQuiz = quizs.map((quiz, indexQuiz) =>
      indexQuiz == index
        ? { ...quiz, [e.target.name]: e.target.value }
        : { ...quiz }
    )
    if (e.target.name == 'point_question') {
      var newTotal = 0
      newQuiz.forEach((value) => {
        newTotal += parseFloat(value.point_question)
      })

      setQuestion({
        ...question,
        totalScoreDb: Number(parseFloat(newTotal).toFixed(1)),
      })
    }
    setQuizs(newQuiz)
  }
  const onChangeAnswer = (e, indexQuiz, indexAlternative) => {
    quizs[indexQuiz].alternatives[indexAlternative].answer_content =
      e.target.value
    console.log(quizs)
  }

  const pageStyle = `
  @page {
    size: 80mm 50mm;
  }

  @media all {
    .pagebreak {
      display: none;
    }
  }

  @media print {
    .pagebreak {
      color: black;
      page-break-before: always;
    }
  }
`

  const showInformation = () => {
    return (
      <div className="exam-details normal">
        <div className="header-details">
          <div className="title-exam">
            <button onClick={editClick} type="submit">
              Edit
            </button>
          </div>
          <div onClick={() => setVisibleAnswer(!visibleAnswer)}>
            <button style={{ width: '220px' }}>
              {' '}
              Show/Hide Answer Correct{' '}
            </button>
          </div>
          <div className="export-data">
            <ReactToPrint
              pageStyle={pageStyle}
              copyStyles={true}
              trigger={() => <button>Export Data</button>}
              content={() => componentRef.current}
            />
          </div>
        </div>
        <hr />
        <div className="content-exam-details" ref={componentRef}>
          <div className="infor-exam-details">
            <div className="infor-time">
              <div className="id-exam">
                <label className="title-infor" name="id_exam">
                  Exam ID:
                </label>{' '}
                <label className="content-db" name="exam_date_db">
                  {question.id_exam}
                </label>
              </div>
              <div className="open-date">
                <label className="title-infor" name="field_exam_date">
                  Exam Date:
                </label>{' '}
                <label className="content-db" name="exam_date_db">
                  {moment(question.exam_date_db).format('DD/MM/YYYY')}
                </label>
              </div>
              <div className="topic">
                <label className="title-infor" name="field_exam_topic">
                  Exam Topics:
                </label>{' '}
                <label className="content-db" name="exam_topic_db">
                  {question.exam_topic_db}
                </label>
              </div>
              <div className="exam-time">
                <label className="title-infor" name="field_open">
                  Exam Start:
                </label>{' '}
                <label className="content-db" name="exam_open_db">
                  {question.hourOpenDb}
                  {'h:'}
                  {question.minuteOpenDb}
                  {'m:'}
                  {question.secondOpenDb}
                  {'s'}
                </label>
              </div>
              <div className="exam-time">
                <label className="title-infor" name="field_due">
                  Exam End:
                </label>{' '}
                <label className="content-db" name="exam_due_db">
                  {question.hourDueDb}
                  {'h:'}
                  {question.minuteDueDb}
                  {'m:'}
                  {question.secondDueDb}
                  {'s'}
                </label>
              </div>
              <div className="max-score">
                <label className="title-infor" name="totalScoreDb">
                  Exam Score:
                </label>{' '}
                <label className="content-db" name="totalScoreDb">
                  {question.totalScoreDb} {'(max)'}
                </label>
              </div>
            </div>
          </div>
          <br />
          <div className="question-exam-details">
            {quizs.map((quiz, index) => {
              return (
                <div key={index}>
                  <div classname="ques">
                    <label name="infor_question" classname="label_infor">
                      <label
                        name="name_question"
                        style={{ textDecoration: 'underline' }}
                      >
                        <strong>Question {quiz.name_question}</strong>
                      </label>
                      {': '}
                      <label
                        name="question_content"
                        style={{ marginLeft: '20px' }}
                      >
                        {quiz.point_question}
                      </label>{' '}
                      {'(points)'}
                      <br />
                      <label name="point_question">
                        {quiz.question_content}
                      </label>
                    </label>
                  </div>
                  <div className="ans">
                    {quiz.alternatives.map((alternative, index) => (
                      <div
                        key={index}
                        style={{
                          color: alternative.answer_correct
                            ? visibleAnswer
                              ? 'LimeGreen'
                              : 'black'
                            : 'black',
                        }}
                      >
                        {quiz.question_type !== 'contentresult' ? (
                          <>
                            <label>
                              {index == 0
                                ? 'A.'
                                : index == 1
                                ? 'B.'
                                : index == 2
                                ? 'C.'
                                : 'D.'}
                            </label>{' '}
                            <label>{alternative.answer_content}</label>
                          </>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
  const editInformation = () => {
    return (
      <div className="exam-details edit">
        <div className="header-details">
          <div className="title-exam">
            <button onClick={submitUpdate} type="submit">
              Update
            </button>
          </div>
        </div>
        <hr />
        <div className="content-exam-details">
          <div className="infor-exam-details">
            <div className="infor-time">
              <div className="exam-time open-date">
                <label className="title-infor" name="field_exam_date">
                  Exam Date:
                </label>{' '}
                <label className="edit-time" name="exam_date_db">
                  <input
                    type="date"
                    name="exam_date_db"
                    className="cel2"
                    defaultValue={question.exam_date_db}
                    onChange={(e) => {
                      onChangeQuestionInformation(e)
                    }}
                  />
                </label>
              </div>
              <div className="exam-time topic">
                <label className="title-infor" name="field_exam_topic">
                  Exam Topics:
                </label>{' '}
                <label className="edit-topic" name="exam_topic_db">
                  <select
                    value={topics.name}
                    name="exam_topic_db"
                    className="cel2"
                    // onChange={handleTopicsChange}
                    onChange={(e) => {
                      onChangeQuestionInformation(e)
                    }}
                    defaultValue={question.exam_topic_db}
                  >
                    {TOPICS?.map((topicChoosen, i) => (
                      <option key={i} value={topicChoosen.name} name="topics">
                        {topicChoosen.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="exam-time">
                <label className="title-infor" name="field_open">
                  Exam Start:
                </label>{' '}
                <label className="content-db" name="exam_open_db">
                  <label>
                    Hour{' '}
                    <select
                      name="hourOpenDb"
                      value={hourOpen.name}
                      onChange={(e) => onChangeQuestionInformation(e)}
                      defaultValue={question.hourOpenDb}
                      style={{ width: '50%' }}
                    >
                      {HOUROPEN?.map((hourOpenChoosen, i) => (
                        <option
                          key={i}
                          value={hourOpenChoosen.name}
                          name="hourOpenDb"
                        >
                          {hourOpenChoosen.name}
                        </option>
                      ))}
                    </select>
                  </label>{' '}
                  <label>
                    Minute{' '}
                    <select
                      name="minuteOpenDb"
                      value={minuteOpen.name}
                      onChange={(e) => {
                        onChangeQuestionInformation(e)
                      }}
                      defaultValue={question.minuteOpenDb}
                    >
                      {MINUTEOPEN?.map((minuteOpenChoosen, i) => (
                        <option
                          key={i}
                          value={minuteOpenChoosen.name}
                          name="minuteOpenDb"
                        >
                          {minuteOpenChoosen.name}
                        </option>
                      ))}
                    </select>
                  </label>{' '}
                  <label>
                    Second{' '}
                    <select
                      name="secondOpenDb"
                      value={secondOpen.name}
                      defaultValue={question.secondOpenDb}
                      onChange={(e) => onChangeQuestionInformation(e)}
                    >
                      {SECONDOPEN?.map((secondOpenChoosen, i) => (
                        <option
                          key={i}
                          value={secondOpenChoosen.name}
                          name="secondOpenDb"
                        >
                          {secondOpenChoosen.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </label>
              </div>
              <div className="exam-time">
                <label className="title-infor" name="field_due">
                  Exam End:
                </label>{' '}
                <label className="content-db" name="exam_due_db">
                  <label>
                    Hour{' '}
                    <select
                      name="hourDueDb"
                      value={hourDue.name}
                      defaultValue={question.hourDueDb}
                      onChange={(e) => {
                        onChangeQuestionInformation(e)
                      }}
                      style={{ width: '50%' }}
                    >
                      {HOURDUE?.map((hourDueChoosen, i) => (
                        <option
                          key={i}
                          value={hourDueChoosen.name}
                          name="hourDueDb"
                        >
                          {hourDueChoosen.name}
                        </option>
                      ))}
                    </select>
                  </label>{' '}
                  <label>
                    Minute{' '}
                    <select
                      name="minuteDueDb"
                      value={minuteDue.name}
                      defaultValue={question.minuteDueDb}
                      onChange={(e) => {
                        onChangeQuestionInformation(e)
                      }}
                    >
                      {MINUTEDUE?.map((minuteDueChoosen, i) => (
                        <option
                          key={i}
                          value={minuteDueChoosen.name}
                          name="minuteDueDb"
                        >
                          {minuteDueChoosen.name}
                        </option>
                      ))}
                    </select>
                  </label>{' '}
                  <label>
                    Second{' '}
                    <select
                      name="secondDueDb"
                      value={secondDue.name}
                      defaultValue={question.secondDueDb}
                      onChange={(e) => {
                        onChangeQuestionInformation(e)
                      }}
                    >
                      {SECONDDUE?.map((secondDueChoosen, i) => (
                        <option
                          key={i}
                          value={secondDueChoosen.name}
                          name="secondDueDb"
                        >
                          {secondDueChoosen.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </label>
              </div>
              <div className="max-score">
                <label className="title-infor" name="totalScoreDb">
                  Exam Score:
                </label>{' '}
                <input
                  type="button"
                  className="content-db"
                  name="totalScoreDb"
                  value={question.totalScoreDb}
                  defaultValue={question.totalScoreDb}
                  style={{
                    backgroundColor: 'rgba(214, 207, 207, 0)',
                    outline: 'none',
                    border: '1px solid rgba(214, 207, 207, 0)',
                  }}
                />
                {'(max)'}
              </div>
            </div>
          </div>
          <br />
          <div className="question-exam-details">
            {quizs.map((quiz, indexQuiz) => {
              return (
                <div key={indexQuiz}>
                  <div classname="ques">
                    <label name="infor_question" classname="label_infor">
                      <label
                        name="name_question"
                        style={{ textDecoration: 'underline' }}
                      >
                        <strong>Question {quiz.name_question}</strong>
                      </label>
                      {': '}
                      <input
                        className="question_content"
                        name="question_content"
                        defaultValue={quiz.question_content}
                        onChange={(e) => onChangeQuestion(e, indexQuiz)}
                      />
                      <input
                        type="number"
                        min={0}
                        // max={10}
                        step=".1"
                        className="point_question"
                        name="point_question"
                        defaultValue={quiz.point_question}
                        onChange={(e) => {
                          onChangeQuestion(e, indexQuiz)
                        }}
                        // onClick={sumPoint}
                      />
                      {'(point)'}
                    </label>
                  </div>
                  <div className="ans">
                    {quiz.alternatives.map((alternative, indexAlternative) => (
                      <div
                        key={indexAlternative}
                        style={{
                          color: alternative.answer_correct
                            ? 'LimeGreen'
                            : 'black',
                        }}
                      >
                        {quiz.question_type !== 'contentresult' ? (
                          <>
                            {(indexAlternative == 0
                              ? 'A'
                              : indexAlternative == 1
                              ? 'B'
                              : indexAlternative == 2
                              ? 'C'
                              : 'D') + '. '}
                            <input
                              className="answer_content"
                              name="answer_content"
                              defaultValue={alternative.answer_content}
                              onChange={(e) => {
                                onChangeAnswer(e, indexQuiz, indexAlternative)
                              }}
                            />
                          </>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <ToastContainer draggable={false} transition={Bounce} autoClose={3000} />
      {checkInformation()}
    </div>
  )
}
