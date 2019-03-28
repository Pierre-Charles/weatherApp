import React from 'react'

import Form from './Form'
import Weather from './Weather'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      city: undefined,
      country: undefined,
      name: undefined,
      temp: undefined,
      desc: undefined,
      error: undefined
    }
  }

  getWeather = async (e) => {
    e.preventDefault()
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.apiKey}&units=metric`);
    const data = await api_call.json();
    if (city && country){
    this.setState(
      { 
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        desc: data.weather[0].description,
        error: undefined
      }
    )
    } else {
      this.setState({
        city: undefined,
        country: undefined,
        temp: undefined,
        desc: undefined,
        error: 'Please enter a city and a country.'
      })
    }
  }

  render() {
    return (
    <div>
      <h1>OpenWeather App</h1>
      <Form getWeather={this.getWeather}/>
      <Weather
        city={this.state.city}
        country={this.state.country}
        name={this.state.name}
        temp={this.state.temp}
        desc={this.state.desc}
        error={this.state.error}
      />
    </div>
   )
  }
}
