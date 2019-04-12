import React, { Component } from 'react'
import moment from 'moment'

export default class Clock extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    setInterval(this.update, 1000)
  }

  update = () => {
    this.setState({
      date: new Date()
    })
  }

  render() {
    return (
      <div>
        <h3>{moment().format('dddd, Do MMMM YYYY')}</h3>
        <h4>{moment().format('HH:mm')}</h4>
      </div>
    )
  }
}