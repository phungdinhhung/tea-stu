import { axios } from '@/instances/axios'
import React from 'react'
import { useHistory } from 'react-router'
import { useState, useEffect } from 'react'
import './ExamScore.css'
import moment from 'moment'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ExamScore() {
  const { location } = useHistory()
  const history = useHistory()
  const [questions, setQuestions] = useState([])

  async function fetchScoreExam() {
    const response = await axios.get(`/quiz/result/${location.state}`)
    setQuestions(response?.data.results)
    const notify = () => {
      toast('No students have taken this quiz yet', {
        className: 'notify',
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
      })
    }
    if (response?.data?.results?.length==0){
      notify()
    }
     console.log('ID: ', location.state)
    console.log('response: ', response?.data?.results?.length)
  }
  useEffect(() => {
    fetchScoreExam()
  }, [])
  const renderScore = (id_exam, id_user) => {
    history.push(`/exam-score-detail/${id_user}`, id_exam)
  }
  return (
    <div className="exam-score">
      <ToastContainer draggable={false} transition={Bounce} autoClose={7000} />
      <div className="col">
        <h6>Total students: {questions?.length}</h6>
        <table className="table table-striped table-inverse table-hover">
          <thead className="thead-inverse">
            <tr>
              <th>USERNAME</th>
              <th>FULLNAME</th>
              <th>BIRTHDAY</th>
              <th>SCORE</th>
              <th>TIME</th>
              <th>SUBMITTED</th>
              <th>CONTENT</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((value, indexUser) => {
              return (
                <tr key={indexUser}>
                  <td name="list_username">{value.username}</td>
                  <td name="list_name">{value.fullname}</td>
                  <td name="list_birthday">
                    {moment(value.birthday).format('DD/MM/YYYY')}
                  </td>
                  <td name="list_score">
                    {Number(parseFloat(value.total_score).toFixed(1))}
                  </td>
                  <td name="list_time_total">
                    {value.totalhourDb}
                    {' hou '} {value.totalminuteDb}
                    {' min '}
                    {value.totalsecondDb}
                    {' sec '}
                  </td>
                  <td name="list_time_end">
                    {value.hoursubmitDb}
                    {':'}
                    {value.minutesubmitDb}
                    {':'}
                    {value.secondsubmitDb}
                  </td>
                  <td>
                    <input
                      type="button"
                      value="Details"
                      className="btn-details"
                      onClick={() => renderScore(value.id_exam, value.id_user)}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
