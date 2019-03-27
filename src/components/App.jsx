import React from 'react'

import Form from './Form'

export default class App extends React.Component {    
  componentDidMount() {
    const api_url=`https://api.openweathermap.org/data/2.5/weather?q=Jaffna,LK&appid=${process.env.apiKey}&units=metric`
      
    fetch(api_url)
    .then(response => response.json())
    .then(data => console.log(data))
  }
  render() {
    return (
    <div>
      <h1 style={{ textAlign: 'center' }}>OpenWeather App</h1>
      <Form />
    </div>
   )
  }
}
