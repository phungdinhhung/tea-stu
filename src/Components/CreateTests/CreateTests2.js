import React from 'react'
import './CreateTests.css'
import FormQuestion from './FormQuestion/FormQuestion'
import { axios } from '@/instances/axios'
import { useEffect } from 'react'
import { useHistory } from 'react-router'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function CreateTest2() {
  const history = useHistory()
  const loadUser = async () => {
    const id = localStorage.getItem('id')
    const response = await axios.get(`/user/${id}`)
    if (response?.data?.user?.user_type === 'Student') history.push('/not-view')
  }
  useEffect(() => {
    loadUser()
  })
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
    // const notify = () => toast('Wow so easy!')
    const notify = () => {
      toast(submitInfor?.data?.message, {
        className: 'black-background',
        draggable: true,
        position: toast.POSITION.TOP_CENTER,
      })
    }
    const submitSuccess = () => {
      toast('You have successfully created the exam', {
        className: 'done',
        draggable: true,
        position: toast.POSITION.TOP_CENTER,
      })
    }
    console.log(submitInfor)
    if (submitInfor?.data?.success === false) {
      notify()
    } else {
      submitSuccess()
    }
    // if (submitInfor.data?.jwt) {
    //   localStorage.setItem('idExam', submitInfor.data.question.id_exam)
    // }
  }
  return (
    <div>
      <ToastContainer draggable={false} transition={Bounce} autoClose={7000} />
      <FormQuestion onSubmitForm={submitQuestion}></FormQuestion>
    </div>
  )
}
