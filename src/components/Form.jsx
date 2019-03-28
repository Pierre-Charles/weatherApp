import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.getWeather}>
          <input type="text" name='city' placeholder='City...'/>
          <input type="text" name='country' placeholder='Country...'/>
          <button>Search</button>
        </form>
      </div>
    )
  }
}