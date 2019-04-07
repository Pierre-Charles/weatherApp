import React from 'react'

import weather from '../stylesheets/Weather.scss'

const Weather = props => (
  <div className='pt-5 weather-container'>
    { props.city && props.country && <p>Location: {props.city}</p> }
    { props.temp && <p>Temperature: {props.temp}&deg;C</p> }
    { props.desc && <p>Conditions: {props.desc}</p> }
    { props.error && <p>{props.error}</p> }
  </div>
)

export default Weather