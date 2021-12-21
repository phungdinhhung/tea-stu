import React from 'react'
import { useEffect, useState } from 'react'
import './Profile.css'
import * as conf from '@/configs'
import moment from 'moment'
import { axios } from '@/instances/axios'

export default function Profile() {
  const [user, setUser] = useState({
    username: '',
    fullname: '',
    phone: '',
    birthday: '',
    avatarUrl: '',
    user_type: '',
  })

  const [trangthai, setTrangthai] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      const id = localStorage.getItem('id')
      const response = await axios.get(`/user/${id}`)
      setUser(response?.data?.user)
      console.log('user fetched:', response)
    }
    fetchUser()
  }, [])

  const onFileChosen = async (e) => {
    var formData = new FormData()
    var imagefile = e.target.files[0]

    if (!imagefile) {
      window.alert('Please choose file again')
      return
    }

    formData.append('image', imagefile)
    const response = await axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if (!response.data?.url) {
      window.alert('upload not successfuly :((')
      return
    }
    const avatarUrl = response.data.url
    console.log('upload success:', avatarUrl)
    setUser({ ...user, avatarUrl: avatarUrl })
  }

  const submitUpdate = async (e) => {
    e.preventDefault()
    // const id = props.match.params.id;
    const id = localStorage.getItem('id')
    try {
      //   console.log(user);
      const newUser = await axios.patch(
        `/user/${id}`,
        {
          //   params: {
          username: user.username,
          fullname: user.fullname,
          phone: user.phone,
          birthday: user.birthday,
          avatarUrl: user.avatarUrl,
        }
        // }
      )
      setUser(newUser.data?.user)
    } catch (error) {
      console.log('Failed Update', error)
    }
  }

  const onFullnameChange = (e) => {
    setUser({ ...user, fullname: e.target.value })
  }

  const onPhoneChange = (e) => {
    setUser({ ...user, phone: e.target.value })
  }

  const onBirthdayChange = (e) => {
    setUser({ ...user, birthday: e.target.value })
  }

  const editClick = () => {
    setTrangthai(false)
  }

  const updateInfor = () => {
    setTrangthai(true)
  }

  const check = () => {
    if (trangthai === true) {
      return renderInfor()
    } else {
      return rederUpdate()
    }
  }

  const renderInfor = () => {
    return (
      <div className="profile-infor">
        <div className="content">
          <div className="row infor">
            <div
              className="col-xs-5 col-sm-5 col-md-5 col-lg-5"
              style={{ marginTop: '1%' }}
            >
              <img
                src={user.avatarUrl || conf.DEFAULT_AVATAR_URL}
                alt=""
                className="avatar"
                name="image"
                style={{ borderRadius: '20px' }}
              />
            </div>
            <div
              className="col-xs-7 col-sm-7 col-md-7 col-lg-7"
              style={{ marginTop: '1%' }}
            >
              <div className="inf">
                <label className="lable-1">Username: </label>
                <label className="label-db">{user.username}</label>
              </div>
              <div className="inf">
                <label className="lable-1">Fullname: </label>
                <label className="label-db">{user.fullname}</label>
              </div>
              <div className="inf">
                <label className="lable-1">Phone number: </label>
                <label className="label-db">{user.phone}</label>
              </div>
              <div className="inf">
                <label htmlFor className="lable-1">
                  Birth of year:{' '}
                </label>
                <label className="label-db">
                  {moment(user.birthday).format('DD/MM/YYYY')}
                </label>
              </div>
              <div className="inf">
                <label htmlFor className="lable-1">
                  Role:{' '}
                </label>
                <label className="label-db">{user.user_type}</label>
              </div>
              <div className="edit-infor">
                <button type="submit" onClick={editClick}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const rederUpdate = () => {
    return (
      <div className="update-profile">
        <div className="content">
          <div className="row infor">
            <div
              className="col-xs-5 col-sm-5 col-md-5 col-lg-5"
              style={{ marginTop: '1%' }}
            >
              <img
                src={user.avatarUrl || conf.DEFAULT_AVATAR_URL}
                alt=""
                className="avatar"
                name="image"
                style={{ borderRadius: '20px' }}
              />
              <div className="file-upload">
                <ion-icon name="camera-outline"></ion-icon>
                <input
                  type="file"
                  onChange={onFileChosen}
                  name="FileAttachment"
                  id="FileAttachment"
                  className="upload"
                ></input>
              </div>
            </div>
            <div
              className="col-xs-7 col-sm-7 col-md-7 col-lg-7"
              style={{ marginTop: '1%' }}
            >
              <div className="inf-update">
                <label htmlFor className="lable-1">
                  Username:{' '}
                </label>
                <input type="text" name="" id="" value={user.username}></input>
              </div>
              <div className="inf-update">
                <label htmlFor className="lable-1">
                  Fullname:{' '}
                </label>
                <input
                  onChange={(e) => onFullnameChange(e)}
                  type="text"
                  name=""
                  id=""
                  defaultValue={user.fullname}
                ></input>
              </div>
              <div className="inf-update">
                <label htmlFor className="lable-1">
                  Phone number:{' '}
                </label>
                <input
                  onChange={(e) => onPhoneChange(e)}
                  type="tel"
                  name=""
                  id=""
                  defaultValue={user.phone}
                ></input>
              </div>
              <div className="inf-update">
                <label htmlFor className="lable-1">
                  Birth of year:{' '}
                </label>
                <input
                  onChange={(e) => onBirthdayChange(e)}
                  type="date"
                  name=""
                  id=""
                  defaultValue={user.birthday}
                ></input>
              </div>
              <div className="inf-update">
                <label htmlFor className="lable-1">
                  Role:{' '}
                </label>
                <input type="text" name="" id="" value={user.user_type}></input>
              </div>
              <div className="edit-infor">
                <form action="" onClick={updateInfor}>
                  <button
                    type="submit"
                    onClick={(e) => submitUpdate(e)}
                    style={{ marginLeft: '-73px', marginTop: '5px' }}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile">
      <div className="title">
        <h4>Personal Information</h4>
      </div>
      <hr />
      {check()}
    </div>
  )
}
