import React, { Component, Fragment } from 'react'

import location from '../stylesheets/Location.scss'

const Location = props => (
  <Fragment>
    {!props.latitude && !props.longitude && props.isLoading && <h3>Loading...</h3>}
    {props.latitude && props.longitude &&
      <div className='col-sm-12 location h5'>
        <h3 className='pb-5'>Weather in {props.loc}, {props.ctry}: </h3>
        <p>Temperature: {props.temperature}&deg;C</p>
        <p>Condition: {props.description}</p>
      </div>
    }
  </Fragment>
)

export default Location