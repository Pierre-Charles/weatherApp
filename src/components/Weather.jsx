import React from 'react'

const Weather = props => (
  <div>
    { props.city && props.country && <p>Location: {props.city}</p> }
    { props.temp && <p>Temperature: {props.temp}</p> }
    { props.desc && <p>Conditions: {props.desc}</p> }
    { props.error && <p>{props.error}</p> }
  </div>
)

export default Weather