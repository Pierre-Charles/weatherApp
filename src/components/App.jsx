import React from 'react'

import Form from './Form'
import Weather from './Weather'
import Location from './Location'

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

  async componentDidMount() {
    this.getIpAddress()
  }
  
  getIpAddress = async () => {
    const apiCall = await fetch(`https://api.ipify.org/?format=json`)
    const response = await apiCall.json()
    const ipAddress = response.ip
    this.setState({ ip: ipAddress })
    console.log('Your IP address is:', ipAddress)
    this.getGeolocation()
  }
  
  getGeolocation = async () => {
    const apiCall = await fetch(`https://geo.ipify.org/api/v1?apiKey=${process.env.geoIpifyApiKey}&ipAddress=${this.state.ip}`)
    const response = await apiCall.json()
    console.log('geoIpify', response.location.city, response.location.lat, response.location.lng)
    this.setState({ lat: response.location.lat })
    this.setState({ lng: response.location.lng })
    this.getWeathers()
  }

  getWeathers = async () => {
    const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lng}&appid=${process.env.apiKey}&units=metric`)
    const response = await apiCall.json()
    console.log('WEATHER ======>', response)
  }

  getWeather = async (e) => {
    e.preventDefault()
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.apiKey}&units=metric`);
    const data = await api_call.json();
    const temperature = Math.round(data.main.temp)
    if (city && country){
    this.setState(
      { 
        city: data.name,
        country: data.sys.country,
        temp: temperature,
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
      <Location
        getIpAddress={this.getIpAddress}
        getWeathers={this.getWeathers}
        getGeolocation={this.getGeolocation}

      />
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
