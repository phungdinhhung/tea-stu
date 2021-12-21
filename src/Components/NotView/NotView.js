import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { axios } from '@/instances/axios'
import { useState, useEffect } from 'react'

import './NotView.css'

export default function NotView() {
  const [user, setUser] = useState({})

  const loadUser = async () => {
    const id = localStorage.getItem('id')
    const response = await axios.get(`/user/${id}`)
    setUser(response?.data?.user)
  }
  useEffect(() => {
    loadUser()
  }, [])

  return (
    <div className="not-view">
      As a role {user.user_type}, You are not authorized to perform this action.
      Thanks <br />
      <br />
      <Link to="/home" style={{textDecoration: 'underline'}}>Back to home</Link>
    </div>
  )
}
