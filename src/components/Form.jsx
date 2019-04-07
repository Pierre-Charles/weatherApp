import React from 'react'

import form from '../stylesheets/Form.scss'

const Form = props => (
  <div className='pt-5'>
    <form onSubmit={props.getWeather}>
      <input type="text" name='city' autoComplete='off' placeholder='City...'/>
      <input type="text" name='country' autoComplete='off' placeholder='Country...'/>
      <button>Search</button>
    </form>
  </div>
)

export default Form