import React from 'react'
import './WaitingRoom.css'
import { useRef, useEffect, useState } from 'react'
import { axios } from '@/instances/axios'
import moment from 'moment'
import { useHistory } from 'react-router'
import io from 'socket.io-client'
import SplitSearch from '../../Utils/SplitSearch'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
let socket

export default function WaitingRoom() {
  const history = useHistory()
  const { location } = useHistory()
  const [questions, setQuestions] = useState({})
  const [timeHours, setTimeHours] = useState('00')
  const [timeMinutes, setTimeMinutes] = useState('00')
  const [timeSeconds, setTimeSeconds] = useState('00')
  const [room, setRoom] = useState('')
  const [user, setUser] = useState(
    location.state?.user ? location.state.user : {}
  )
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const backEndUrl = 'http://chatroom-socket-capston1.herokuapp.com/'
  const [search, setSearch] = useState(SplitSearch(location.search))

  const [hoursSendMessage, setHoursSendMessage] = useState('')
  const [minutesSendMessage, setMinutesSendMessage] = useState('')

  async function fetchRoom() {
    const response = await axios.get(`/quiz/question/${search.room}`)
    if (response?.data?.question != null) {
      setQuestions({ ...response?.data.question })
      startTimer({ ...response?.data.question })
    } else {
      history.push('/into-room')
    }
  }
  useEffect(() => {
    fetchRoom()
  }, [])
  useEffect(() => {
    const search = window.location.search
    const params = new URLSearchParams(search)
    const room = params.get('room')

    setRoom(room)

    socket = io(backEndUrl, {
      auth: {
        token: localStorage.getItem('token'),
      },
    })

    socket.emit('join', { user: user.username, room }, (error) => {
      if (error) {
        alert(error)
      }
    })

    return () => {
      //user leave room
      socket.disconnect()
      socket.off()
    }
  }, [backEndUrl, window.location.search])

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg])
      setTimeout(() => {
        var div = document.getElementById('chat_body')
        div.scrollTop = div.scrollHeight - div.clientWidth
      }, 10)
    })

    socket.on('roomMembers', (usrs) => {
      console.log('users: ', usrs)
      setUsers(usrs)
    })
    let saveMessages = JSON.parse(localStorage.getItem('Messages'))
    if (
      saveMessages === null ||
      saveMessages === undefined ||
      saveMessages?.length === 0
    ) {
      saveMessages = []
    }
    setMessages(saveMessages)
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit('sendMessage', message, () => setMessage(''))
    setTimeout(() => {
      var div = document.getElementById('chat_body')
      div.scrollTop = div.scrollHeight
    }, 100)
    localStorage.setItem('Messages', JSON.stringify(messages))

    //TODO: Save time localStorage
    var timeSendMessage = new Date()
    var hours = timeSendMessage.getHours()
    var minutes = timeSendMessage.getMinutes()
    setHoursSendMessage(hours)
    setMinutesSendMessage(minutes)
    // localStorage.setItem('Time', JSON.stringify(time))
  }
  let interval = useRef()
  const startTimer = (questions) => {
    const search = window.location.search
    const params = new URLSearchParams(search)
    const room = params.get('room')
    // console.log('push room: ', room)
    interval = setInterval(() => {
      const currentDate = Date.parse(
        `${questions.exam_date_db?.split('T')[0]}T${questions.hourOpenDb}:${
          questions.minuteOpenDb
        }:${questions.secondOpenDb}`
      )

      const dueDate = Date.parse(
        `${questions.exam_date_db?.split('T')[0]}T${questions.hourDueDb}:${
          questions.minuteDueDb
        }:${questions.secondDueDb}`
      )
      // const time1 = dueDate - Date.now()
      const notify = () => {
        toast('You have run out of time to take the test time out ☹️ ☹️ ☹️', {
          className: 'black-background',
          draggable: true,
          position: toast.POSITION.TOP_CENTER,
        })
      }
      if (dueDate <= Date.now()) {
        notify()
        history.push('/home')
        clearInterval(interval.current)
      }

      const time = currentDate - Date.now()
      if (time < 0) {
        history.push(`/exam?room=${room}`, { room, user })
        clearInterval(interval)
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
  }
  return (
    <div className="waiting-room">
      <div className="row">
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 infor-waiting-room">
          <div className="topic">
            <label htmlFor className="infor-room">
              Exam topic:{' '}
            </label>
            <label>{questions.exam_topic_db}</label>
          </div>
          <div className="date">
            <label htmlFor className="infor-room">
              Exam date:{' '}
            </label>
            <label>{moment(questions.exam_date_db).format('DD/MM/YYYY')}</label>
          </div>
          <div className="time">
            <label htmlFor className="infor-room">
              Exam start:{' '}
            </label>
            <label>
              {questions.hourOpenDb}
              {'h:'}
              {questions.minuteOpenDb}
              {'m:'}
              {questions.secondOpenDb}
              {'s'}
            </label>
          </div>
          <div className="countdown">
            <label htmlFor className="infor-room">
              Time remaining:
            </label>
            <label className="countdown">
              <span>
                {timeHours}
                {'h:'}
              </span>
              <span>
                {timeMinutes}
                {'m:'}
              </span>
              <span>
                {timeSeconds}
                {'s'}
              </span>
            </label>
            <br />
          </div>
        </div>
        <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 chat-room container mt-4">
          <div className="row chat-window" id="chat_window_1">
            <div className="col-xs-3 col-md-3 infor-user">
              <p style={{ textAlign: 'center', marginTop: '20px' }}>
                ACTIVE USERS
              </p>
              <hr />
              <ul>
                {users.map((e, i) => (
                  <p key={i}>
                    <ion-icon name="ellipse"></ion-icon>
                    {e.user}
                  </p>
                ))}
              </ul>
            </div>
            <div className="col-xs-9 col-md-9">
              <div className="panel panel-default">
                <div className="panel-heading top-bar">
                  <div className="col-md-12 col-xs-8">
                    <h3
                      className="panel-title name-room"
                      style={{ display: 'flex' }}
                    >
                      {<span className="glyphicon glyphicon-comment"></span>}
                      <img
                        src="./img/room.gif"
                        alt=""
                        style={{ width: '6%', marginRight: '3%' }}
                      />
                      {room}
                    </h3>
                  </div>
                </div>
                <div className="panel-body msg_container_base" id="chat_body">
                  {messages.map((e, i) =>
                    e.user === user.username?.toString().toLowerCase() ? (
                      <>
                        <div key={i} className="row msg_container base_sent">
                          <div className="col-xs-10 col-md-10">
                            <div className="messages msg_sent">
                              <p>{e.text}</p>
                              <time>{e.user}</time>
                              <time style={{ float: 'left' }}>
                                {hoursSendMessage}
                                {':'}
                                {minutesSendMessage}
                              </time>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div key={i} className="row msg_container base_receive">
                          <div className="col-xs-10 col-md-10">
                            <div
                              className="messages msg_receive "
                              style={{ height: '85%' }}
                            >
                              <p>{e.text}</p>
                              <time>{e.user}</time>
                              <time style={{ float: 'right', marginTop: '1%' }}>
                                {hoursSendMessage}
                                {':'}
                                {minutesSendMessage}
                              </time>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  )}
                </div>
                <div className="panel-footer">
                  <div className="input-group">
                    <input
                      id="btn-input"
                      type="text"
                      value={message}
                      onKeyPress={(event) =>
                        event.key === 'Enter' ? sendMessage(event) : null
                      }
                      onChange={(event) => setMessage(event.target.value)}
                      className="form-control input-sm chat_input"
                      placeholder="Write your message here..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}
