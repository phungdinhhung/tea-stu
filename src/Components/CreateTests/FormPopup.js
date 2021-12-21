import React, { Component } from 'react'
import './CreateTests.css'
import QuestionDetail from './QuestionDetail'
// import FormInfor from './FormInfor';

export default class FormPopup extends Component {
  // countQuestion = 0;
  constructor(props) {
    super(props)
    this.state = {
      khoitao: '',
      fHoi: 'Enter Questions',
      trangthai: 1,
      // topic: "Mathematics",
      question_number: 1,
    }
  }
  Hienthi_cauhoi() {
    return this.props.Data_props.map((value, key) => (
      <QuestionDetail
        key={key}
        ques_point_props={value.ques_point}
        ques_number_props={value.ques_number}
        traloi4_type3_props={value.traloi4_type3}
        traloi3_type3_props={value.traloi3_type3}
        traloi2_type3_props={value.traloi2_type3}
        traloi1_type3_props={value.traloi1_type3}
        traloi4_type2_props={value.traloi4_type2}
        traloi3_type2_props={value.traloi3_type2}
        traloi2_type2_props={value.traloi2_type2}
        traloi1_props={value.traloi1}
        loai_cauhoi_props={value.loaicauhoi}
        cauhoi_props={value.cauhoi}
        check_props={value.check_status}
        status_tral1_type2_props2={this.props.status_tral1_type2_props}
        status_tral2_type2_props2={this.props.status_tral2_type2_props}
        status_tral3_type2_props2={this.props.status_tral3_type2_props}
        status_tral4_type2_props2={this.props.status_tral4_type2_props}
        // status_tral1_type3_props2={this.props.status_tral1_type3_props}
        // status_tral2_type3_props2={this.props.status_tral2_type3_props}
      />
    ))
  }
  // Ma_code() {
  //   const chuoi_random = '0123456789'
  //   function getRandomInt(min, max) {
  //     return Math.floor(Math.random() * (max - min)) + min
  //   }
  //   function GetchuoiRandom(length, base) {
  //     let result = ''
  //     const baseLength = base.length
  //     for (let i = 0; i < length; i++) {
  //       const randomIndex = getRandomInt(0, baseLength)
  //       result += base[randomIndex]
  //     }
  //     return result
  //   }
  //   var macode = GetchuoiRandom(6, chuoi_random)
  //   this.setState({
  //     khoitao: macode,
  //   })
  // }
  render() {
    return (
      <div>
        <div className="popup">
          <h3>Complete!</h3>
          <div className="content-test">
            <div className="question-popup">
              <div className="id-test">
                <h5>
                  <label name="field_id"> ID: </label>
                  <ion-icon
                    name="push-outline"
                    onClick={() => this.Ma_code()}
                  ></ion-icon>
                  <label name="id_exam">{this.state.khoitao}</label>
                </h5>
              </div>
              <div className="infor-time">
                <div className="open-date">
                  <label className="title" name="field_exam_date">
                    Exam Date:{' '}
                  </label>
                  <label className="content-db" name="exam_date_db">
                    {' '}
                    {this.props.data_exam_date}
                  </label>
                </div>
                <div className="topics">
                  <label className="title" name="field_exam_topic">
                    Exam Topics:{' '}
                  </label>
                  <label className="content-db" name="exam_topic_db">
                    {this.props.data_exam_topic}
                  </label>
                </div>
                <div className="exam-time">
                  <label className="title" name="field_open">
                    Open:{' '}
                  </label>
                  <label className="content-db" name="exam_open_db">
                    {this.props.data_exam_open}
                  </label>
                </div>
                <div className="exam-time">
                  <label className="title" name="field_due">
                    Due:{' '}
                  </label>
                  <label className="content-db" name="exam_due_db">
                    {this.props.data_exam_due}
                  </label>
                </div>
                <div className="exam-total-question">
                  <label className="title" name="total_question">
                    Total Question:{' '}
                  </label>
                  <label className="content-db" name="total_question_db">
                    {this.props.data_total_number}
                  </label>
                </div>
                <div className="exam-total-score">
                  <label className="title" name="total_score">
                    Total Score:{' '}
                  </label>
                  <label className="content-db" name="total_score_db">
                    {this.props.data_total_score}
                  </label>
                </div>
                <hr />
              </div>
              {this.Hienthi_cauhoi()}
            </div>
          </div>
        </div>
        <div className="bottom-question-popup">
          <div className="box">
            <button>
              <a className="button" href="#">
                Save
              </a>
            </button>
          </div>
          {/* <div id="popup1" class="overlay">
            <div class="popup_bottom">
              <h4>Do you want to Export Data?</h4>
              <a className="close" href="#">
                &times;
              </a>
              <div className="content">
                <button type="submit">Yes</button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    )
  }
}
