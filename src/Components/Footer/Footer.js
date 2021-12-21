import React, { Component } from 'react'
import './Footer.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <footer>
                    <p>© Copyright © 2021 C1SE.41. All Rights Reserved</p>
                    <p><strong>Website developed by </strong><a href="/contact">@C1SE.41</a></p>
                    <p><a href="/contact">Contact Us</a></p>
                </footer>
            </div>
        )
    }
}
