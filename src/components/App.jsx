import React, { Fragment, Component } from 'react'
import Form from './Form'
import Weather from './Weather'
import Location from './Location'
import Clock from './Clock'

import index from '../stylesheets/Index.scss'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      city: undefined,
      country: undefined,
      name: undefined,
      temp: undefined,
      desc: undefined,
      error: undefined,
      isLoading: false,
      latitude: null,
      longitude: null,
      location: undefined
    }
  }

  getLocation = () => {
    this.setState({ isLoading: true })
    const showPosition = position => {
      this.setState({ latitude: position.coords.latitude })
      this.setState({ longitude: position.coords.longitude })
      if (this.state.latitude && this.state.longitude !== undefined) {
        this.setState({ isLoading: false })
      }
      this.getWeatherFromLocation()
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      console.log(`Could not get your location as Geolocation is not supported by this browser`)
    }
  }

  getWeatherFromLocation = async () => {
    const apiKey = '7acd2a1086122b261a2001aea0222806'
    const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${apiKey}&units=metric`)
    const response = await apiCall.json()
    this.setState({
      loc: response.name,
      ctry: response.sys.country,
      temperature: Math.floor(response.main.temp),
      description: response.weather[0].description
    })
  }

  getWeather = async (e) => {
    const apiKey = '7acd2a1086122b261a2001aea0222806'
    e.preventDefault()
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`);
    const data = await api_call.json();
    const temperature = Math.round(data.main.temp)
    if (city && country) {
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
      <Fragment>
        <div className='main'>
          <Clock />
          <i onClick={this.getLocation} className="py-5 markerClick fas fa-map-marker-alt fa-2x"></i>
        </div>
        <Location
          isLoading={this.state.isLoading}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          loc={this.state.loc}
          ctry={this.state.ctry}
          temperature={this.state.temperature}
          description={this.state.description}
        />
        <h5 style={{ paddingTop: '100px', textAlign: 'center'}} className='mt-5'>Or check the weather in another country:</h5>
        <Form getWeather={this.getWeather} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          name={this.state.name}
          temp={this.state.temp}
          desc={this.state.desc}
          error={this.state.error}
        />
      </Fragment>
    )
  }
}
