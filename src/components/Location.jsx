import React, { Component, Fragment } from 'react'

import location from '../stylesheets/Location.scss'

const Location = props => (
  <Fragment>
      { !props.latitude && !props.longitude && props.isLoading && <h3>Loading...</h3> }
      { props.latitude && props.longitude &&
      <div className='col-sm-12 location'>
      <h3>Your location is:</h3>
      <h4>{props.latitude}, {props.longitude}</h4>
      </div>
      }
  </Fragment>
)

export default Location