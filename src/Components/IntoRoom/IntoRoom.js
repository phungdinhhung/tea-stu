import React, { useState, useEffect } from 'react'
import './IntoRoom.css'
import { useHistory } from 'react-router'
import { axios } from '@/instances/axios'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function IntoRoom() {
  const history = useHistory()
  const [user, setUser] = useState({})
  const [room, setRoom] = useState()
  
  async function fetchUser() {
    const response = await axios.get(`/quiz/question/${room}`)
    const invalidID = () => {
      toast('Invalid Exam ID', {
        className: 'invalid-id',
        draggable: true,
        position: toast.POSITION.TOP_CENTER
      })
    }
    console.log('user: ', user)
    if (response?.data.question != null) {
      history.push(`/waiting-room?room=${room}`, {
        room,
        user,
      })
    } else {
      invalidID()
    }

    if (response?.data?.success == false) {
      alert(response?.data?.message)
    }
    console.log('response: ', response)
  }
  useEffect(() => {}, [])

  async function fetchUserRoom() {
    const id = localStorage.getItem('id')
    const responseUser = await axios.get(`/user/${id}`)
    setUser(responseUser?.data?.user)
    console.log('test user: ', responseUser?.data)
  }
  useEffect(() => {
    fetchUserRoom()
  }, [])

  return (
    <div className="into-room">
      <ToastContainer draggable={false} transition={Bounce} autoClose={7000} />
      <div className="row">
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 row-1">
          <div className="exam-id">
            <h3>Exam ID</h3>
          </div>
          <div className="input-id">
            <input
              type="text"
              name="id_exam"
              value={room}
              placeholder="Enter a join code"
              onChange={(e) => {
                setRoom(e.target.value)
              }}
            />
            <button
              type="submit"
              className="btn btn-info"
              onClick={(e) => {
                fetchUser()
                return !room ? e.preventDefault() : null
              }}
              style={{ color: 'black' }}
            >
              JOIN
            </button>
          </div>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 row-2">
          <img src="./img/room.gif" alt="" />
        </div>
      </div>
    </div>
  )
}
