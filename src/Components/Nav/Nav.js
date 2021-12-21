import React from 'react'
import './Nav.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

export default function Nav() {
  const logout = () => {
    window.localStorage.clear()
    window.location.href =
      'https://trung-api-capstone1.herokuapp.com/auth/login'
  }
  return (
    <div className="menu">
      <nav
        className="navbar navbar-expand-sm navbar-light"
        style={{ backgroundColor: 'rgba(171, 210, 223, 0.829)' }}
      >
        <img src="../img/logo-capstone.png" />

        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link to="/Home" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/resources" className="nav-link">
                Resources
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/statistical" className="nav-link">
                Statistical
              </Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <li
              className="navbar-nav mt-2 mt-lg-0"
              style={{ fontSize: '16.5px', color: 'black' }}
            >
              <a href="/" className="nav-link" onClick={logout}>
                Log Out <ion-icon name="log-out-outline"></ion-icon>
              </a>
            </li>
          </form>
        </div>
      </nav>
    </div>
  )
}
