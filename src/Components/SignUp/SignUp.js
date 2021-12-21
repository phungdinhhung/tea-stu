import React, { Component } from 'react'
import './SignUp.css'
import { axios } from '@/instances/axios'
import { Redirect } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRedirect: false,
      fullname: '',
      username: '',
      password: '',
      phone: '',
      birthday: '',
      user_type: '',
      password2: '',
    }
  }
  content(event) {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
      [name]: value,
    })
  }
  async LoginForm(event) {
    event.preventDefault()
    const notifyPassword = () => {
      toast(`Password doesn${"'"}t match`, {
        className: 'message',
      })
    }
    if (this.state.password !== this.state.password2) {
      notifyPassword()
      this.setState({
        isRedirect: false,
      })
    } else if (this.state.password === this.state.password2) {
      const { fullname, phone, birthday, username, password, user_type } =
        this.state
      const loginData = await axios.post('/auth/register', {
        fullname,
        phone,
        birthday,
        username,
        password,
        user_type,
      })
      console.log(loginData)
      const notifySignUp = () => {
        toast(loginData.data?.message, {
          className: 'message'
        })
      }
      if (loginData.data?.sucess === false) {
        notifySignUp()
        this.setState({
          isRedirect: false,
        })
      } else {
        this.setState({
          isRedirect: true,
        })
      }
    } else {
      this.setState({
        isRedirect: false,
      })
    }
  }
  render() {
    if (this.state.isRedirect) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <ToastContainer
          draggable={false}
          transition={Bounce}
          autoClose={7000}
        />
        <div>
          <div className="sign-up">
            <form onSubmit={(event) => this.LoginForm(event)}>
              <h1 style={{ textAlign: 'center' }}>SIGN UP</h1>
              <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Full name</label>
                    <input
                      type="text"
                      name="fullname"
                      onChange={(event) => this.content(event)}
                      className="form-control"
                      id=""
                      aria-describedby=""
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input
                      type="text"
                      name="username"
                      onChange={(event) => this.content(event)}
                      className="form-control"
                      id=""
                      aria-describedby="emailHelp"
                      placeholder="Enter username"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      onChange={(event) => this.content(event)}
                      name="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      onChange={(event) => this.content(event)}
                      name="password2"
                      className="form-control"
                      id="exampleInputPassword2"
                      placeholder="Enter password"
                    />
                  </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Phone number</label>
                    <input
                      type="tel"
                      name="phone"
                      onChange={(event) => this.content(event)}
                      className="form-control"
                      id
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Birth of year</label>
                    <input
                      type="date"
                      name="birthday"
                      onChange={(event) => this.content(event)}
                      className="form-control"
                      id
                      placeholder="Enter birth of year"
                    />
                  </div>
                  <div className="form-group role">
                    <label htmlFor="exampleInputPassword1">Role </label>
                    <div className="choose-role">
                      <select
                        className="form-control"
                        onChange={(event) => this.content(event)}
                        name="user_type"
                      >
                        <option>---</option>
                        <option name="user_type" value="Teacher">
                          Teacher
                        </option>
                        <option name="user_type" value="Student">
                          Student
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  backgroundColor: 'rgba(21, 133, 141, 0.829)',
                  textAlign: 'center',
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
