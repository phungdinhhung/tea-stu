import React from 'react'
import './Exam.css'
import { useRef, useEffect, useState } from 'react'
import { axios } from '@/instances/axios'
import { useHistory } from 'react-router'
import SplitSearch from '../../Utils/SplitSearch'
import moment from 'moment'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Exam() {
  const { location } = useHistory()
  const history = useHistory()
  const [questions, setQuestions] = useState({})
  const [quizs, setQuizs] = useState([])
  const [search, setSearch] = useState(SplitSearch(location.search))

  const [essay, setEssay] = useState('')

  let interval = useRef()

  //Countdown
  const [timeHours, setTimeHours] = useState('00')
  const [timeMinutes, setTimeMinutes] = useState('00')
  const [timeSeconds, setTimeSeconds] = useState('00')

  const [hoursStart, setHoursStart] = useState('')
  const [minutesStart, setMinutesStart] = useState('')
  const [secondsStart, setSecondsStart] = useState('')

  //Submited
  const [hoursubmitDb, setHoursubmitDb] = useState('')
  const [minutesubmitDb, setMinutesubmitDb] = useState('')
  const [secondsubmitDb, setSecondsubmitDb] = useState('')

  //Total time
  const [totalhourDb, setTotalhourDb] = useState('')
  const [totalminuteDb, setTotalminuteDb] = useState('')
  const [totalsecondDb, setTotalSecondDb] = useState('')

  //TODO: authorization
  const loadUser = async () => {
    const id = localStorage.getItem('id')
    const response = await axios.get(`/user/${id}`)
    if (response?.data?.user?.user_type === 'Teacher') history.push('/not-view')
  }

  useEffect(() => {
    loadUser()
  })

  //TODO: LocalStorage quiz
  const loadQuizs = async (quizs) => {
    console.log(localStorage.getItem('AnswerChoosen'))
    let items = JSON.parse(localStorage.getItem('AnswerChoosen'))
    console.log(items)
    if (items === null || items === undefined || items?.length === 0) {
      items = []
      setQuizs(quizs)
    } else {
      const newQuizs = quizs.map((quiz, indexQuiz) => {
        return {
          ...quiz,
          alternatives: quiz.alternatives.map(
            (alternative, indexAlternative) => {
              return {
                ...alternative,
                answer_choosen:
                  items[indexQuiz].alternatives[indexAlternative]
                    .answer_choosen || false,
              }
            }
          ),
        }
      })
      setQuizs(newQuizs)
    }
  }

  // TODO: Call API method get
  async function fetchExamRoom() {
    const response = await axios.get(`/quiz/question/${search.room}`)
    setQuestions({ ...response?.data?.question })
    startTimer({ ...response?.data.question })
    loadQuizs(response?.data?.question.quiz)
    // time start
    var timeStart = new Date()
    var nowHoursStart = timeStart.getHours()
    var nowMinutesStart = timeStart.getMinutes()
    var nowSecondsStart = timeStart.getSeconds()
    if (nowHoursStart < 10) {
      nowHoursStart = '0' + nowHoursStart
    }
    if (nowMinutesStart < 10) {
      nowMinutesStart = '0' + nowMinutesStart
    }
    if (nowSecondsStart < 10) {
      nowSecondsStart = '0' + nowSecondsStart
    }
    setHoursStart(nowHoursStart)
    setMinutesStart(nowMinutesStart)
    setSecondsStart(nowSecondsStart)
  }

  // TODO: Call function fetchExamRoom
  useEffect(() => {
    fetchExamRoom()
  }, [])

  // TODO: Time submited
  useEffect(() => {
    var timeSubmit = new Date()
    var nowHoursSubmit = timeSubmit.getHours()
    var nowMinutesSubmit = timeSubmit.getMinutes()
    var nowSecondsSubmit = timeSubmit.getSeconds()
    if (nowHoursSubmit < 10) {
      nowHoursSubmit = '0' + nowHoursSubmit
    }
    if (nowMinutesSubmit < 10) {
      nowMinutesSubmit = '0' + nowMinutesSubmit
    }
    if (nowSecondsSubmit < 10) {
      nowSecondsSubmit = '0' + nowSecondsSubmit
    }
    setHoursubmitDb(nowHoursSubmit)
    setMinutesubmitDb(nowMinutesSubmit)
    setSecondsubmitDb(nowSecondsSubmit)
  })

  // TODO: Total time exam = time start - time submited
  useEffect(() => {
    var totalHours = hoursubmitDb - hoursStart
    var totalMinutes = minutesubmitDb - minutesStart
    var totalSeconds = secondsubmitDb - secondsStart
    if (totalMinutes < 0) {
      totalMinutes = totalMinutes * -1
    }
    if (totalSeconds < 0) {
      totalSeconds = totalSeconds * -1
    }
    if (totalHours < 10) {
      totalHours = '0' + totalHours
    }
    if (totalMinutes < 10) {
      totalMinutes = '0' + totalMinutes
    }
    if (totalSeconds < 10) {
      totalSeconds = '0' + totalSeconds
    }
    setTotalhourDb(totalHours)
    setTotalminuteDb(totalMinutes)
    setTotalSecondDb(totalSeconds)
  })

  //TODO: Time remaining
  const startTimer = (questions) => {
    interval.current = setInterval(() => {
      const currentDate = Date.parse(
        `${questions.exam_date_db?.split('T')[0]}T${questions.hourDueDb}:${
          questions.minuteDueDb
        }:${questions.secondDueDb}`
      )
      const time = currentDate - Date.now()
      
      // if (currentDate <= Date.now()) {
      //   const notify = () => {
      //     toast('Het gio', {
      //       className: 'black-background',
      //       draggable: true,
      //       position: toast.POSITION.TOP_CENTER,
      //     })
      //   }
      //   // document.getElementById('autoClick')?.click()
      //   // history.push('/time-out')
      //   history.push('/home')
      //   notify()
      //   clearInterval(interval.current)
        
      //   // alert('Het gio')
      // } 
      if (time <= 0) {
        document.getElementById('autoClick')?.click()
        clearInterval(interval.current)
      } else {
        var hours = Math.floor(time / 1000 / 3600)
        var minutes = Math.floor(((time / 1000) % 3600) / 60)
        var seconds = Math.floor((((time / 1000) % 3600) % 60) % 60)
        if (hours < 10) {
          hours = '0' + hours
        }
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        if (seconds < 10) {
          seconds = '0' + seconds
        }
        setTimeHours(hours)
        setTimeMinutes(minutes)
        setTimeSeconds(seconds)
      }
    }, 1000)
    console.log('time: ', questions.exam_date_db)
    console.log('now: ', Date.now())
  }

  //TODO: Save content essay
  const changeEssayContent = (indexAlternative, indexQuiz, e) => {
    onChangeAlternative(indexAlternative, indexQuiz)
    setEssay(e.target.value)
  }

  //TODO: Save content checked
  const onChangeAlternative = (indexAlternative, indexQuiz) => {
    const newQuizs = quizs.map((quiz, indexQizMap) => {
      if (indexQizMap === indexQuiz) {
        return {
          ...quiz,
          alternatives: quiz.alternatives.map((alternative, indexAlterMap) => {
            if (indexAlterMap === indexAlternative) {
              if (quiz.question_type == 'manycorrect') {
                return {
                  ...alternative,
                  answer_choosen: !alternative.answer_choosen,
                }
              } else if (quiz.question_type == 'contentresult') {
                return {
                  ...alternative,
                  essay_answer_content: essay,
                }
              } else
                return {
                  ...alternative,
                  answer_choosen: true,
                }
            } else
              return {
                ...alternative,
                answer_choosen:
                  quiz.question_type === 'manycorrect'
                    ? alternative.answer_choosen
                      ? alternative.answer_choosen
                      : false
                    : false,
              }
          }),
        }
      } else return quiz
    })
    setQuizs(newQuizs)
    const newQuizsChoosen = newQuizs.map((quiz, indexQizMap) => {
      return {
        ...quiz,
        alternatives: quiz.alternatives.map((alternative, index) => {
          const newAlternative = Object.assign({}, alternative)
          delete newAlternative['answer_correct']
          return newAlternative
        }),
      }
    })

    localStorage.setItem('AnswerChoosen', JSON.stringify(newQuizsChoosen))
  }

  //TODO: Submit Exam
  const onSubmitQuestions = (e) => {
    e.preventDefault()
    setQuestions({ ...questions, [e.target.name]: e.target.value })
    setEssay({ ...essay, [e.target.name]: e.target.value })
    onSubmitInformationQuestion(e)
    document.getElementById('close').click()
    clearInterval(interval.current)
    // history.push('/congratulations')
  }

  //TODO: Submit Exam
  const onSubmitInformationQuestion = async () => {
    try {
      const response = await axios.post('/result/', {
        ...questions,
        quiz: quizs,
        hoursStart: hoursStart,
        minutesStart: minutesStart,
        secondsStart: secondsStart,
        hoursubmitDb: hoursubmitDb,
        minutesubmitDb: minutesubmitDb,
        secondsubmitDb: secondsubmitDb,
        totalhourDb: totalhourDb,
        totalminuteDb: totalminuteDb,
        totalsecondDb: totalsecondDb,
      })
      console.log('submit: ', response)
      if (response.data?.success === false) {
        const notify = () => {
          toast(response.data?.message, {
            className: 'notify-exam',
            draggable: true,
            position: toast.POSITION.TOP_CENTER,
          })
        }
        notify()
        history.push('/home')
        
        alert(response.data?.message)
      } else {
        history.push('/congratulations')
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="exam">
      <ToastContainer draggable={false} transition={Bounce} autoClose={7000} />
      <div className="infor-exam">
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="exam-date">
              <label htmlFor className="title-information">
                Exam date:{' '}
              </label>{' '}
              <label htmlFor>
                {moment(questions.exam_date_db).format('DD/MM/YYYY')}
              </label>
            </div>
            <div className="time-start">
              <label htmlFor className="title-information">
                Exam start:{' '}
              </label>{' '}
              <label htmlFor>
                {questions.hourOpenDb}
                {'h:'}
                {questions.minuteOpenDb}
                {'m:'}
                {questions.secondOpenDb}
                {'s'}
              </label>
            </div>
            <div className="time-end">
              <label htmlFor className="title-information">
                Exam end:{' '}
              </label>{' '}
              <label htmlFor>
                {questions.hourDueDb}
                {'h:'}
                {questions.minuteDueDb}
                {'m:'}
                {questions.secondDueDb}
                {'s'}
              </label>
            </div>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="time-topic">
              <label htmlFor className="title-information">
                Exam topic:{' '}
              </label>{' '}
              <label htmlFor>{questions.exam_topic_db}</label>
            </div>
            <div className="total-score">
              <label htmlFor className="title-information">
                Total score:{' '}
              </label>{' '}
              <label htmlFor>
                {Number(parseFloat(questions.totalScoreDb)).toFixed(1)}
                {' (max)'}
              </label>
            </div>
            <div className="total-score">
              <label htmlFor className="title-information">
                Total questions:{' '}
              </label>{' '}
              <label htmlFor>
                {quizs.length}
                {' (questions)'}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll">
        <div className="countdown">
          <label style={{ marginRight: '0.5%' }}>
            Time remaining: {timeHours}
            {':'}
            {timeMinutes}
            {':'}
            {timeSeconds}
          </label>
        </div>
      </div>
      <div className="content-exam">
        <div className="content-question">
          {quizs.map((quiz, indexQuiz) => {
            return (
              <div key={indexQuiz}>
                <div classname="ques">
                  <label name="infor_question" classname="label_infor">
                    <label className="number-ques">
                      <label
                        name="name_question"
                        style={{
                          textDecoration: 'underline',
                          marginRight: '25px',
                        }}
                      >
                        <strong>
                          Question {quiz.name_question}
                          {': '}
                        </strong>
                      </label>{' '}
                      <label name="name_question">
                        <strong>
                          {quiz.point_question} {'(points)'}
                        </strong>
                      </label>
                    </label>
                    <br />
                    <label name="question_content">
                      {quiz.question_content}
                    </label>
                  </label>
                </div>
                <div className="ans" style={{ marginLeft: '5%' }}>
                  {quiz.alternatives.map((alternative, indexAlternative) => (
                    <div key={indexAlternative}>
                      <label name="total_answer_content" key={indexAlternative}>
                        {quiz.question_type == 'yesorno' ? (
                          <input
                            type="radio"
                            name={`yesorno${indexQuiz}`}
                            value={alternative.answer_content}
                            onChange={() =>
                              onChangeAlternative(indexAlternative, indexQuiz)
                            }
                            checked={
                              alternative.answer_choosen ? 'checked' : ''
                            }
                          />
                        ) : quiz.question_type == 'onecorrect' ? (
                          <input
                            type="radio"
                            name={`onecorrect${indexQuiz}`}
                            value={alternative.answer_content}
                            checked={
                              alternative.answer_choosen ? 'checked' : ''
                            }
                            onChange={() =>
                              onChangeAlternative(indexAlternative, indexQuiz)
                            }
                          />
                        ) : quiz.question_type == 'manycorrect' ? (
                          <input
                            type="checkbox"
                            name={`manycorrect${indexQuiz}`}
                            value={alternative.answer_content}
                            checked={
                              alternative.answer_choosen ? 'checked' : ''
                            }
                            onChange={() =>
                              onChangeAlternative(indexAlternative, indexQuiz)
                            }
                          />
                        ) : (
                          <input
                            type="text"
                            name="essay_answer_content"
                            className="enter-result"
                            onChange={(e) =>
                              changeEssayContent(indexAlternative, indexQuiz, e)
                            }
                            defaultValue={
                              alternative.essay_answer_content
                                ? alternative.essay_answer_content
                                : ''
                            }
                          />
                        )}
                      </label>{' '}
                      {quiz.question_type !== 'contentresult' ? (
                        <>
                          <label>
                            {indexAlternative == 0
                              ? 'A.'
                              : indexAlternative == 1
                              ? 'B.'
                              : indexAlternative == 2
                              ? 'C.'
                              : 'D.'}
                          </label>{' '}
                          <label>{alternative.answer_content}</label>
                        </>
                      ) : null}
                      <br />
                      {quiz.question_type === 'contentresult' ? (
                        <>
                          {alternative.answer_content !== null ? (
                            <>
                              <label>Note:</label>{' '}
                              <label>{alternative.answer_content}</label>
                            </>
                          ) : null}
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
      <div className="popup-submit">
        <button
          type="button"
          className="btn btn-danger"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          SUBMIT
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">X</span>
                </button>
              </div>
              <div className="modal-body">
                Congratulations on completing the test !!!
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  id="close"
                >
                  Close
                </button>
                <form onSubmit={onSubmitQuestions}>
                  <button
                    type="submit"
                    className="btn btn-danger"
                    id="autoClick"
                  >
                    Submit Exam
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
