import React, { Fragment, Component } from 'react'
import Form from './Form'
import Weather from './Weather'
import Location from './Location'

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
      latitude: undefined,
      longitude: undefined,
    }
  }

  componentDidMount() {
    this.getLocation()
  }

  getLocation = () => {
    const showPosition = position => {
      this.setState({ latitude: position.coords.latitude })
      this.setState({ longitude: position.coords.longitude })
    }

    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      console.log(`Could not get your location as Geolocation is not supported by this browser`)
    }
    }

  getWeathers = async () => {
    const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${process.env.apiKey}&units=metric`)
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
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <i onClick={this.getWeathers} className="markerClick fas fa-map-marker-alt fa-2x"></i>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-sm-12"></div>
            <h2>Your location is: {this.state.latitude}, {this.state.longitude}</h2>
        </div>
      </div>

      <Form getWeather={this.getWeather}/>
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
