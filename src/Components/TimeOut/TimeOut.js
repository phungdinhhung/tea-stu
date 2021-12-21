import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './TimeOut.css'

export default function TimeOut() {
    return (
      <div className="time-out">
        <p>You have run out of time to take the test time out ☹️ ☹️ ☹️</p>
        <img src="./img/timeout.jpg"></img>
        <Link to="/home" style={{ textDecoration: 'underline', margin: '36%' }}>
          Back to home
        </Link>
      </div>
    )
}
