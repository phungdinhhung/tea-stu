import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import CreateTests2 from '../Components/CreateTests/CreateTests2'
import Exam from '../Components/Exam/Exam'
import ExamBank from '../Components/ExamBank/ExamBank'
import ExamBankDetail from '../Components/ExamBankDetail/ExamBankDetail'
import Home from '../Components/Home/Home'
import IntoRoom from '../Components/IntoRoom/IntoRoom'
import Nav from '../Components/Nav/Nav'
import Profile from '../Components/Profile/Profile'
import QuestionBank from '../Components/QuestionsBank/QuestionBank'
import SignIn from '../Components/SignIn/SignIn'
import SignUp from '../Components/SignUp/SignUp'
import WaitingRoom from '../Components/WaitingRoom/WaitingRoom'
import ExamScore from '../Components/ExamScore/ExamScore'
import ExamScoreDetail from '../Components/ExamScoreDetail/ExamScoreDetail'
import Statistical from '../Components/Statistical/Statistical'
import NotView from '../Components/NotView/NotView'
import Contact from '../Components/Contact/Contact'
import Congratulations from '../Components/Congratulations/Congratulations'
import TimeOut from '../Components/TimeOut/TimeOut'

export default function DieuHuongURL() {

  return (
    <Router>
      <div>
        <Route exact path="/">
          <SignIn></SignIn>
        </Route>
        <Route exact path="/home">
          <Nav></Nav>
          <Home></Home>
        </Route>
        <Route exact path="/sign-up">
          <SignUp></SignUp>
        </Route>
        <Route exact path="/profile">
          <Nav></Nav>
          <Profile></Profile>
        </Route>
        <Route exact path="/create-test">
          <Nav></Nav>
          <CreateTests2></CreateTests2>
        </Route>
        <Route exact path="/into-room">
          <Nav></Nav>
          <IntoRoom></IntoRoom>
        </Route>
        <Route exact path="/waiting-room">
          <Nav></Nav>
          <WaitingRoom></WaitingRoom>
        </Route>
        <Route exact path="/exam-bank">
          <Nav></Nav>
          <ExamBank></ExamBank>
        </Route>
        <Route exact path="/exam-bank-detail">
          <Nav></Nav>
          <ExamBankDetail></ExamBankDetail>
        </Route>
        <Route exact path="/exam">
          <Nav></Nav>
          <Exam></Exam>
        </Route>
        <Route exact path="/question-bank">
          <Nav></Nav>
          <QuestionBank></QuestionBank>
        </Route>
        <Route exact path="/exam-score">
          <Nav></Nav>
          <ExamScore></ExamScore>
        </Route>
        <Route exact path="/exam-score-detail/:id_user">
          <Nav></Nav>
          <ExamScoreDetail></ExamScoreDetail>
        </Route>
        <Route exact path="/statistical">
          <Nav></Nav>
          <Statistical></Statistical>
        </Route>
        <Route exact path="/not-view">
          <NotView></NotView>
        </Route>
        <Route exact path="/contact">
          <Nav></Nav>
          <Contact></Contact>
        </Route>
        <Route exact path="/congratulations">
          <Nav></Nav>
          <Congratulations></Congratulations>
        </Route>
        <Route exact path="/time-out">
          <Nav></Nav>
          <TimeOut></TimeOut>
        </Route>
      </div>
    </Router>
  )
}

