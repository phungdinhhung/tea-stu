import React, { Component } from 'react';
import './Home.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthentication:true,
        }
    }
    
    render() {
        return (
          <div>
            <div className="content">
              <div className="row column-1">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 list-test">
                  <div className="row">
                    <img src="./img/list-test.png" alt="" />
                    <div className="text">
                      <Link to="/exam-bank">
                        <h3>LIST OF TESTS</h3>
                      </Link>
                      <hr />
                      <p>Search for exam questions stored in the exam bank.</p>
                    </div>
                  </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div className="row">
                    <img src="./img/create-question.png" alt="" />
                    <div className="text">
                      <Link to="/create-test">
                        <h3>CREATE QUESTIONS</h3>
                      </Link>
                      <hr />
                      <p>
                        Create your quiz. Attention should be paid to the type
                        of exam questions, exam time, .. to maximize the
                        effectiveness of the exam.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row column-2">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div className="row">
                    <img src="./img/quick.png" alt="" />
                    <div className="text">
                      <Link to="/into-room">
                        <h3>INTO THE EXAMINATION ROOM</h3>
                      </Link>
                      <hr />
                      <p>
                        To get into the exam room quickly, candidates need to
                        memorize the test ID.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div className="row">
                    <img
                      src="./img/exam-bank.png"
                      alt=""
                      style={{
                        width: '27%',
                        marginRight: '6%',
                        marginLeft: '3%',
                      }}
                    />
                    <div className="text">
                      <Link to="/question-bank">
                        <h3>QUESTION BANKS</h3>
                      </Link>
                      <hr />
                      <p>
                        Summarize all questions by topic of each exam already in
                        the system.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}
