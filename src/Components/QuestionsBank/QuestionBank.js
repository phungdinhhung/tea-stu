import { axios } from '@/instances/axios'
import React from 'react'
import './QuestionBank.css'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

export default function QuestionBank() {
  const [questions, setQuestions] = useState([])
  const history = useHistory()
  async function fetchQuestionBank() {
    const response = await axios.get(`/quiz/examtopic`)
    setQuestions(response?.data)
    console.log('topic: ', response?.data)
  }
  const loadUser = async () => {
    const id = localStorage.getItem('id')
    const response = await axios.get(`/user/${id}`)
    if (response?.data?.user?.user_type === 'Student') history.push('/not-view')
  }
  useEffect(() => {
    fetchQuestionBank()
    loadUser()
  }, [])

  return (
    <div className="question-bank">
      {questions.map((topic, indexTopic) => {
        return (
          <div key={indexTopic}>
            <div className="col-xs col-sm col-md col-lg">
              <div id="nodeid" role="tablist" aria-multiselectable="true">
                <div className="card">
                  <div className="card-header" role="tab" id="content">
                    <h6 className="mb-0">
                      <a
                        data-toggle="collapse"
                        data-parent="#nodeid1"
                        href={'#index' + indexTopic}
                        aria-expanded="true"
                        aria-controls="section1ContentId"
                      >
                        Topic {indexTopic + 1}
                        {': '}
                        {topic._id.exam_topic_db}{' '}
                      </a>
                    </h6>
                  </div>
                  <div
                    id={'index' + indexTopic}
                    className="collapse in"
                    role="tabpanel"
                    aria-labelledby="content"
                  >
                    <div className="card-body">
                      <div className="question-content">
                        {topic.quiz.map((question, indexQuestion) => (
                          <div className="total-question" key={indexQuestion}>
                            <label style={{ textDecoration: 'underline' }}>
                              Question {indexQuestion + 1}
                              {'. '}
                            </label>{' '}
                            <label>{question.question_content} </label>
                            <br />
                            <div className="answer-content">
                              {question.alternatives.map(
                                (alternative, indexAlternative) => (
                                  <div
                                    className="total-answer"
                                    key={indexAlternative}
                                    style={{
                                      marginLeft: '4%',
                                      fontWeight: alternative.answer_correct
                                        ? 'bold'
                                        : 'none',
                                    }}
                                  >
                                    {question.question_type !==
                                    'contentresult' ? (
                                      <>
                                        <label>
                                          {indexAlternative == 0
                                            ? 'A'
                                            : indexAlternative == 1
                                            ? 'B'
                                            : indexAlternative == 2
                                            ? 'C'
                                            : 'D'}
                                        </label>
                                        {'. '}
                                        <label>
                                          {alternative.answer_content}
                                        </label>
                                      </>
                                    ) : null}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
