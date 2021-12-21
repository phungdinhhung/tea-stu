import React from 'react'
import './Contact.css'

export default function Contact() {
    return (
      <div className="contact">
        <h3>Contact Us</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Number</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Chung</td>
              <td>Trần Thị</td>
              <td>0945228146</td>
              <td>tranchung10a3@gmail.com</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Trung</td>
              <td>Đỗ Đức</td>
              <td>0829501402</td>
              <td>blackpro142@gmail.com</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Hiếu</td>
              <td>Trần</td>
              <td>0814519333</td>
              <td>tranhieuhalai@gmail.com</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Hưng</td>
              <td>Phùng Đình</td>
              <td>0338977112</td>
              <td>phungdinhhung1002@gmail.com</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Tín</td>
              <td>Nguyễn Ngọc</td>
              <td>0353510181</td>
              <td>tinthpy123@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
}
