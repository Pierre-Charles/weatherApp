import React, { Component, Fragment } from 'react'

const Location = props => (
  <Fragment>
      { props.latitude && props.longitude &&
      <div>
      <h3>Your location is:</h3>
      <h4>{props.latitude}, {props.longitude}</h4>
      </div>
      }
  </Fragment>
)

export default Location