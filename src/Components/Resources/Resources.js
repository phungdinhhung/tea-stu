import React from 'react'
import './Resources.css'
import { useState } from 'react'
import { TOPICS } from '../CreateTests/topics.mock'
// import {useSta}

export default function Resources() {
  const [status, setStatus] = useState({})
  const [topics, setTopics] = useState([TOPICS])

  const handleGetFile = (e) => {
    const getFile = e.target.files[0]
    console.log('get file', getFile)
    return getFile
    // setAddTitle(getFile:getFile)
  }

  const handleTopicsChange = (e) =>{
    setTopics({name: e.target.value})
    console.log(topics.name)
  }
  const selectFile = () => {
    return (
      <div className="select-file">
        <div className="content-select-file">
          <p>Drop files here to start uploading</p>
          <p>or</p>
          <div className="file-upload btn btn-info">
            <span>Select File</span>
            <input
              type="file"
              name="FileAttachment"
              id="FileAttachment"
              className="upload"
            />
          </div>
          <input
            type="text"
            id="fileuploadurl"
            readOnly
            placeholder="Maximum file size is 1GB"
          />
        </div>
      </div>
    )
  }
  return (
    <div className="resources">
      <div className="topics">
        <label className="lable-1">Topics: </label>
        <select
          value={topics.name}
          name="topics"
          className="cel2"
          onChange={handleTopicsChange}
        >
          {TOPICS?.map((topicChoosen, i) => (
            <option key={i} value={topicChoosen.name} name="topics">
              {topicChoosen.name}
            </option>
          ))}
        </select>
      </div>
      {selectFile()}
      <div className="add-file">
        <button className="add">ADD</button>
      </div>
      <div className="content-file">
        <div className="topics-file">
          <label htmlFor className="title-file">
            Topic:
          </label>{' '}
          <label htmlFor>{topics.name}</label>
        </div>
        <div className="content-title">
          <label htmlFor name="content_file">
            DB: Content File
          </label>
          <label htmlFor>
            {handleGetFile}
          </label>
        </div>
      </div>
    </div>
  )
}
