import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './Congratulations.css'

export default function Congratulations() {
    return (
      <div className="congratulations">
        <p>Congratulations on completing the exam 🎉🎉🎉 </p>
        <img src="./img/congratulations.gif" />
        <Link to="/home" style={{ textDecoration: 'underline', margin: '36%' }}>
          Back to home
        </Link>
      </div>
    )
}
