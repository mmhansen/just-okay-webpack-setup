import React from 'react'
// local imports
import s from './Container.css'
import Login from '../Login'

function Container () {
  return (
    <div className={s.root}>
      <h1>Hello World</h1>
      <Login />
    </div>
  )
}

export default Container
