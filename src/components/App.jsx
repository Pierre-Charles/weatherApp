import React from 'react'

import Form from './Form'
import Weather from './Weather'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  getWeather = async (e) => {
    e.preventDefault()
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.apiKey}&units=metric`);
    const data = await api_call.json();
    console.log('Async function', data)
  }

  
  render() {
    return (
    <div>
      <h1>OpenWeather App</h1>
      <Form getWeather={this.getWeather}/>
      <Weather />
    </div>
   )
  }
}
