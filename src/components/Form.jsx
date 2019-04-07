import React from 'react'

import '../stylesheets/Form.scss'

const Form = props => (
    <form onSubmit={props.getWeather}>
      <input type="text" name='city' placeholder='City...'/>
      <input type="text" name='country' placeholder='Country...'/>
      <button>Search</button>
    </form>
)

export default Form