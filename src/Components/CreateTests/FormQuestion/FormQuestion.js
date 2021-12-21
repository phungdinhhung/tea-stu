import React, { Component } from 'react'
import './FormQuestion.css'

import QuestionDetail from '../QuestionDetail'

// simulate data, this will be replaced with
// real data fetch from backend
import { TOPICS } from '../topics.mock'
import {
  QUESTION_TYPE_DESCRIPTION,
  QUESTION_TYPE,
} from '../question-types.enum'

import { YesNoFormQuestion } from './components/YesNo.FormQuestion'
import { OneCorrectFormQuestion } from './components/OneCorrect.FormQuestion'
import { EnterResultFormQuestion } from './components/EnterResult.FormQuestion'
import { ManyCorrectFormQuestion } from './components/ManyCorrect.FormQuestion'
import { HOUROPEN } from '../hourOpen.mock'
import { MINUTEOPEN } from '../minuteOpen.mock'
import { SECONDOPEN } from '../secondOpen.mock'
import { HOURDUE } from '../hourDue.mock'
import { MINUTEDUE } from '../minuteDue.mock'
import { SECONDDUE } from '../secondDue.mock'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default class FormQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: TOPICS,
      topicChoosen: 'Mathematics',

      hourOpen: HOUROPEN,
      hourOpenChoosen: 0,

      minuteOpen: MINUTEOPEN,
      minuteOpenChoosen: 0,

      secondOpen: SECONDOPEN,
      secondOpenChoosen: 0,

      hourDue: HOURDUE,
      hourDueChoosen: 0,

      minuteDue: MINUTEDUE,
      minuteDueChoosen: 0,

      secondDue: SECONDDUE,
      secondDueChoosen: 0,

      questionTypeDescriptions: Object.entries(QUESTION_TYPE_DESCRIPTION),

      questions: [],

      id_exam: '',
      exam_date_db: '',
      exam_topic_db: '',
      hourOpenDb: '',
      minuteOpenDb: '',
      secondOpenDb: '',
      hourDueDb: '',
      minuteDueDb: '',
      secondDueDb: '',
      totalScoreDb: '',
      totalQuestionDb: '',
      quizs: [],
      question_content: '',
      point_question: '',
      alternatives: [],
      question_type: QUESTION_TYPE.YES_NO,
    }
    this.changeQuestion = this.changeQuestion.bind(this)
  }
  onPointChange(ev) {
    this.setState({
      ...this.state,
      point_question: ev.target.value,
    })
  }

  changeQuestionForm(ev) {
    const formCode = QUESTION_TYPE[ev.target.value]
    this.setState({
      question_type: formCode,
    })
  }

  changeQuestionContent(ev) {
    this.setState({
      ...this.state,
      question_content: ev.target.value,
    })
  }
  changeQuestion(updatedQuiz, indexChange) {
    const newQuiz = this.state.quizs.map((quiz, index) =>
      index == indexChange ? updatedQuiz : quiz
    )
    var sum = 0
    newQuiz.forEach((quiz) => {
      sum = sum + parseFloat(quiz.point_question)
    })
    this.setState({
      ...this.state,
      quizs: newQuiz,
      totalScoreDb: Number(sum).toFixed(1),
    })
    localStorage.setItem('PointTotal', JSON.stringify(sum))
  }

  /**
    Return true if create question success, otherwise return false
  */

  changeQuestionBody(question) {
    const { question_content, point_question, question_type } = this.state
    const valid = this.validateQuestionBody()
    if (!valid) return false
    this.setState({
      ...this.state,
      alternatives: question.alternatives,
    })
    return true
  }
  totalCreateQuestion() {
    this.createQuestion()
    this.sumPoint()
  }

  UNSAFE_componentWillMount() {
    //TODO: QUESTION
    let items = JSON.parse(localStorage.getItem('Question'))
    if (items === null || items === '') {
      items = []
    }
    this.setState({
      quizs: items,
    })

    //TODO: POINTTOTAL
    let point = JSON.parse(localStorage.getItem('PointTotal'))
    this.setState({
      totalScoreDb: Number(point).toFixed(1),
    })
  }

  createQuestion() {
    const notifyAnswerCorrect = () => {
      toast('Please choose at least one correct answer or note answer',{
        className: 'notify-question'
      })
    }
    console.log('bug: ', this.state.alternatives)
    const { question_content, point_question, alternatives, question_type } =
      this.state
    const valid = this.validateQuestionBody()
    if (valid === false) return

    if (alternatives.length == 0 && question_type !== 'contentresult')
      return notifyAnswerCorrect()

    this.state.quizs.push({
      question_content,
      point_question,
      question_type,
      name_question: this.state.quizs.length + 1,
      alternatives: this.state.alternatives,
    })
    this.setState({
      ...this.state,
      question_content: '',
      point_question: 0,
      question_type: QUESTION_TYPE.YES_NO,
      alternatives: []
    })
    localStorage.setItem('Question', JSON.stringify(this.state.quizs))
  }
  clearLocalStorage() {
    localStorage.removeItem('Question')
    localStorage.removeItem('PointTotal')
    localStorage.removeItem('PointTotalUpdate')
  }
  validateQuestionBody() {
    const notifyQuestionContent = () => {
      toast('Please enter the content of the question first', {
        className: 'notify-question'
      })
    }
    const notifyPointQuestion = () => {
      toast('Please enter the point of the question first', {
        className:'notify-question'
      })
    }
    const { question_content, point_question } = this.state

    if (!question_content) {
      notifyQuestionContent()
      return false
    }
    if (!point_question) {
      notifyPointQuestion()
      return false
    }
    return true
  }
  randomExamId() {
    const chuoi_random = '0123456789'
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    }
    function GetchuoiRandom(length, base) {
      let result = ''
      const baseLength = base.length
      for (let i = 0; i < length; i++) {
        const randomIndex = getRandomInt(0, baseLength)
        result += base[randomIndex]
      }
      return result
    }
    var macode = GetchuoiRandom(6, chuoi_random)
    this.setState({
      id_exam: macode,
    })
  }
  handleExamDateChange(event) {
    this.setState({
      exam_date_db: event.target.value,
    })
    localStorage.setItem('Date', JSON.stringify(this.state.exam_date_db))
  }
  handleExamIdChange(event) {
    this.setState({
      id_exam: event.target.value,
    })
  }
  handleExamTopicChange(event) {
    this.setState({
      exam_topic_db: event.target.value,
    })
  }
  handleExamContentChange(event) {
    this.setState({
      question_content: event.target.value,
    })
  }
  handleExamHourOpenChange(event) {
    this.setState({
      hourOpenDb: event.target.value,
    })
  }
  handleExamMinuteOpenChange(event) {
    this.setState({
      minuteOpenDb: event.target.value,
    })
  }
  handleExamSecondOpenChange(event) {
    this.setState({
      secondOpenDb: event.target.value,
    })
  }
  handleExamHourDueChange(event) {
    this.setState({
      hourDueDb: event.target.value,
    })
  }
  handleExamMinuteDueChange(event) {
    this.setState({
      minuteDueDb: event.target.value,
    })
  }
  handleExamSecondDueChange(event) {
    this.setState({
      secondDueDb: event.target.value,
    })
  }

  handleExamTotalQuestionChange(event) {
    this.setState({
      totalQuestionDb: event.target.value,
    })
  }
  sumPoint() {
    var obj = this.state.quizs
    var sum = 0
    obj.map((value) => {
      sum = sum + parseFloat(value.point_question)
      return sum
    })
    this.setState({
      totalScoreDb: Number(sum).toFixed(1),
    })
    localStorage.setItem('PointTotal', JSON.stringify(Number(sum).toFixed(1)))
  }

  handleSubmit(event) {
    event.preventDefault()

    const data = {
      id_exam: this.state.id_exam,
      exam_date_db: this.state.exam_date_db,
      exam_topic_db: this.state.exam_topic_db,
      hourOpenDb: this.state.hourOpenDb,
      minuteOpenDb: this.state.minuteOpenDb,
      secondOpenDb: this.state.secondOpenDb,
      hourDueDb: this.state.hourDueDb,
      minuteDueDb: this.state.minuteDueDb,
      secondDueDb: this.state.secondDueDb,
      totalScoreDb: this.state.totalScoreDb,
      quiz: this.state.quizs,
    }
    this.props.onSubmitForm(data)
    document.getElementById('close').click()
  }

  deleteQuestionDetails(indexQuiz) {
    const newQuiz = this.state.quizs
      .filter((item) => item !== indexQuiz)
      .map((itemDeleteQuiz, indexDeleteQuiz) => {
        return { ...itemDeleteQuiz, name_question: indexDeleteQuiz + 1 }
      })
    this.setState({
      quizs: newQuiz,
    })
    var sumUpdate = 0
    newQuiz.forEach((quiz) => {
      sumUpdate = sumUpdate + parseFloat(quiz.point_question)
    })
    this.setState({
      ...this.state,
      quizs: newQuiz,
      totalScoreDb: Number(sumUpdate).toFixed(1),
    })
    localStorage.setItem('Question', JSON.stringify(newQuiz))
    localStorage.setItem('PointTotal', JSON.stringify(sumUpdate))
  }

  render() {
    return (
      <div className="create-quiz">
        <ToastContainer
          draggable={false}
          transition={Bounce}
          autoClose={7000}
        />
        <div className="create-test">
          <div className="infor-questions">
            <h4>Question Information</h4>
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="time-open">
                  <label className="lable-1">Exam date: </label>
                  <input
                    onChange={(event) => {
                      this.handleExamDateChange(event)
                    }}
                    type="date"
                    name="exam_date_db"
                    className="cel2"
                  />
                </div>
                <div className="topics">
                  <label className="lable-1">Exam topics: </label>
                  <select
                    value={this.state.name}
                    name="topic"
                    className="cel2"
                    onChange={(event) => {
                      this.handleExamTopicChange(event)
                    }}
                  >
                    {this.state.topics?.map((topicChoosen, i) => (
                      <option key={i} value={topicChoosen.name} name="topic">
                        {topicChoosen.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="id-test">
                  <h5>
                    <label name="field_id" style={{ fontSize: '80%' }}>
                      Exam ID:{' '}
                    </label>
                    <ion-icon
                      className="icon"
                      name="push-outline"
                      onClick={() => this.randomExamId()}
                      style={{ marginRight: '4.5%' }}
                    ></ion-icon>
                    <input
                      onChange={(event) => {
                        this.handleExamIdChange(event)
                      }}
                      type="button"
                      className="cel2"
                      name="id_exam"
                      value={this.state.id_exam}
                      style={{
                        backgroundColor: 'rgba(214, 207, 207, 0)',
                        textAlign: 'left',
                      }}
                    />
                  </h5>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div>
                  <div className="exam-time">
                    <label className="lable-1">Exam start: </label>
                    <label>
                      <label>
                        Hour{' '}
                        <select
                          name="hourOpenDb"
                          value={this.state.name}
                          onChange={(event) =>
                            this.handleExamHourOpenChange(event)
                          }
                          style={{ width: '45px' }}
                        >
                          {this.state.hourOpen?.map((hourOpenChoosen, i) => (
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
                          value={this.state.name}
                          onChange={(event) => {
                            this.handleExamMinuteOpenChange(event)
                          }}
                        >
                          {this.state.minuteOpen?.map(
                            (minuteOpenChoosen, i) => (
                              <option
                                key={i}
                                value={minuteOpenChoosen.name}
                                name="minuteOpenDb"
                              >
                                {minuteOpenChoosen.name}
                              </option>
                            )
                          )}
                        </select>
                      </label>{' '}
                      <label>
                        Second{' '}
                        <select
                          name="secondOpenDb"
                          value={this.state.name}
                          onChange={(event) =>
                            this.handleExamSecondOpenChange(event)
                          }
                        >
                          {this.state.secondOpen?.map(
                            (secondOpenChoosen, i) => (
                              <option
                                key={i}
                                value={secondOpenChoosen.name}
                                name="secondOpenDb"
                              >
                                {secondOpenChoosen.name}
                              </option>
                            )
                          )}
                        </select>
                      </label>
                    </label>
                  </div>
                  <div className="exam-time">
                    <label className="lable-1">Exam end: </label>
                    <label>
                      Hour{' '}
                      <select
                        name="hourDueDb"
                        value={this.state.name}
                        onChange={(event) => {
                          this.handleExamHourDueChange(event)
                        }}
                        style={{ width: '45px' }}
                      >
                        {this.state.hourDue?.map((hourDueChoosen, i) => (
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
                        value={this.state.name}
                        onChange={(event) => {
                          this.handleExamMinuteDueChange(event)
                        }}
                      >
                        {this.state.minuteDue?.map((minuteDueChoosen, i) => (
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
                        value={this.state.name}
                        onChange={(event) => {
                          this.handleExamSecondDueChange(event)
                        }}
                      >
                        {this.state.secondDue?.map((secondDueChoosen, i) => (
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-questions">
          <h5>Content Questions</h5>
          <div className="row" id="rowclone">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 row-1">
              <div className="question-number">
                <label className="label-2">Question number: </label>
                <input
                  value={this.state.quizs.length + 1}
                  type="number"
                  required
                  name="question_number"
                  min={1}
                  step="any"
                  className="cel-2-2"
                />
              </div>
              <div className="type-question">
                <label className="label-2">Type of questions: </label>
                <select
                  name="type_question"
                  id="option1"
                  className="cel-2-2"
                  onChange={(event) => this.changeQuestionForm(event)}
                >
                  {this.state.questionTypeDescriptions?.map(
                    ([name, description], i) => (
                      <option key={i} value={name}>
                        {description}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="points">
                <label className="label-2">Score factor:</label>
                <input
                  type="number"
                  name="point"
                  min={0}
                  step=".1"
                  className="cel-2-2"
                  onChange={(ev) => {
                    this.onPointChange(ev)
                  }}
                  value={this.state?.point_question}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 row-2">
              <div>
                <input
                  type="text"
                  value={this.state?.question_content}
                  onChange={(event) => this.changeQuestionContent(event)}
                  name="ques"
                  placeholder="Content Question: "
                  className="content-inf"
                  maxlength="1000"
                />
                <p
                  style={{
                    fontStyle: 'italic',
                    color: 'rgb(151, 151, 151)',
                    fontSize: '80%',
                  }}
                >
                  Note: The content of the question must not exceed 1000
                  characters
                </p>
              </div>

              <FormQuestionSwitch
                choosenForm={this.state.question_type}
                changeQuestionBody={(ques) => this.changeQuestionBody(ques)}
              />
            </div>
          </div>
          <div className="action-questions">
            <div className="add-question">
              <button
                className="btn-icon"
                onClick={() => this.totalCreateQuestion()}
              >
                <ion-icon name="add-circle-outline" id="iconadd" />
              </button>
            </div>
          </div>
          <div className="sumary">
            <label>Total questions: </label>
            <input
              type="number"
              name="totalQuestionDb"
              value={this.state.quizs.length}
            />
            <br />
            <label>Total score: </label>
            <input
              type="button"
              min={0}
              step=".1"
              defaultValue={0}
              max={10}
              name="totalScoreDb"
              value={this.state.totalScoreDb}
              onChange={(event) => {
                this.handleExamTotalScoreChange(event)
              }}
              style={{ backgroundColor: 'white', textAlign: 'left' }}
            />
          </div>

          <div className="created-questions">
            {this.state.quizs?.map((quiz, index) => (
              <div key={index}>
                <QuestionDetail
                  key={index}
                  quiz={quiz}
                  indexChange={index}
                  changeQuestion={this.changeQuestion}
                ></QuestionDetail>
                <button onClick={() => this.deleteQuestionDetails(quiz)}>
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="popup-submit" style={{ marginBottom: '2%' }}>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              this.clearLocalStorage()
            }}
            style={{ width: '90px' }}
          >
            CLEAR
          </button>{' '}
          <button
            type="button"
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#exampleModal"
            style={{ width: '90px' }}
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
                <div className="modal-body">Do you want to save the test?</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    id="close"
                  >
                    Close
                  </button>
                  <form
                    onSubmit={(event) => {
                      this.handleSubmit(event)
                    }}
                    // action="/home"
                  >
                    <button type="submit" className="btn btn-danger">
                      Save Exam
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
}

function FormQuestionSwitch({ choosenForm, ...rest }) {
  switch (choosenForm) {
    case QUESTION_TYPE.YES_NO:
      return <YesNoFormQuestion {...rest} />
    case QUESTION_TYPE.MANY_CORRECT:
      return <ManyCorrectFormQuestion {...rest} />
    case QUESTION_TYPE.ONE_CORRECT:
      return <OneCorrectFormQuestion {...rest} />
    default:
      return <EnterResultFormQuestion {...rest} />
  }
}
