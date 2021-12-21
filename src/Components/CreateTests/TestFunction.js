import React from 'react'
import './CreateTests.css'
import FormQuestion from './FormQuestion/FormQuestion'
import { axios } from '@/instances/axios'
import { useEffect, useState } from 'react'

export default function TestFunction() {
//   const [status, setStatus] = useState({})
//   const content = (event) => {
//     event.preventDefault()
//     setStatus({ ...status, [event.target.name]: event.target.value })
//   }
  const submitQuestion = async (data) => {
    const {
      id_exam,
      exam_date_db,
      exam_topic_db,
      hourOpenDb,
      minuteOpenDb,
      secondOpenDb,
      hourDueDb,
      minuteDueDb,
      secondDueDb,
      totalScoreDb,
      quiz,
    } = data
    const submitInfor = await axios.post(`/quiz/question/`, {
      id_exam,
      exam_date_db,
      exam_topic_db,
      hourOpenDb,
      minuteOpenDb,
      secondOpenDb,
      hourDueDb,
      minuteDueDb,
      secondDueDb,
      totalScoreDb,
      quiz,
    })
    console.log(submitInfor)
    if (submitInfor.data?.jwt) {
      localStorage.setItem('idExam', submitInfor.data.question.id_exam)
    }
    if (submitInfor.data?.success === false) {
      alert('submitInfor.data?.message')
    }
  }
  return (
    <div>
      <FormQuestion onSubmitForm={submitQuestion}></FormQuestion>
    </div>
  )
}
