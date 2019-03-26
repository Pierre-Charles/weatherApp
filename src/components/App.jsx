import React from 'react'

export default class App extends React.Component {
  componentDidMount() {
    const apiCall = `api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${process.env.apiKey}`
  }

  render() {
    console.log('API KEY ===>', process.env.apiKey)
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>OpenWeather App</h1>
      </div>
    )
  }
}