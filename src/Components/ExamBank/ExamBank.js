import React from 'react'
import './ExamBank.css'
import { useEffect, useState } from 'react'
import { axios } from '@/instances/axios'
import moment from 'moment'
import { useHistory } from 'react-router'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ExamBank() {
  const [questions, setQuestions] = useState([])
  const [lengthQuizs, setLengthQuizs] = useState()
  const history = useHistory()

  const loadUser = async () => {
    const id = localStorage.getItem('id')
    const response = await axios.get(`/user/${id}`)
    if (response?.data?.user?.user_type === 'Student') history.push('/not-view')
  }

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(`/quiz/question/`)
      setQuestions(response?.data)
      console.log('Infor Exam Bank: ', response?.data)
      setLengthQuizs(response?.data?.length)
      const notify = () => {
        toast('You have not created any exams yet', {className: 'notify'})
      }
      if(response?.data?.length == 0){
        notify()
      }
    }
    fetchUser()
    loadUser()
  }, [])
  const render = (id_exam) => {
    history.push('/exam-bank-detail', id_exam)
  }
  const renderScore = (id_exam) => {
    history.push('/exam-score', id_exam)
  }

  const handleDeleteExam = async (id_exam, e) => {
    e.preventDefault()
    const notifyDelete = () => {
      toast('Delete Success', { className: 'notify', draggable: true })
    }
    notifyDelete()
    const response = await axios.delete(`/quiz/question/${id_exam}`, {
      id_exam,
    })
    const newQuestions = questions.filter((question) =>
      question._id === response.data._id ? false : true
    )
    setQuestions(newQuestions)
    console.log('delete: ', response)
  }

  return (
    <div className="exam-bank">
      <ToastContainer
        draggable={false}
        transition={Bounce}
        autoClose={2500}
      ></ToastContainer>
      <div className="col">
        <table className="table table-striped table-inverse table-hover">
          <thead className="thead-inverse">
            <tr>
              <th>TOPICS</th>
              <th>ID</th>
              <th>DATE</th>
              <th>CONTENT</th>
              <th>SCORE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {questions
              .map((value, index) => {
                return (
                  <tr key={index}>
                    <td name="list_topic">{value.exam_topic_db}</td>
                    <td name="list_id">{value.id_exam}</td>
                    <td name="list_date">
                      {moment(value.exam_date_db).format('DD/MM/YYYY')}
                    </td>
                    <td>
                      <input
                        type="button"
                        value="Details"
                        onClick={() => render(value.id_exam)}
                        className="btn-details"
                      />
                    </td>
                    <td>
                      <input
                        type="button"
                        value="View"
                        className="btn-details"
                        onClick={() => renderScore(value.id_exam)}
                      ></input>
                    </td>
                    <td>
                      <div className="btn-group">
                        <div
                          className="btn btn-danger"
                          onClick={(e) => handleDeleteExam(value.id_exam, e)}
                        >
                          <box-icon name="x-circle" />
                          Delete
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })
              .reverse()}
          </tbody>
        </table>
      </div>
    </div>
  )
}
