import React from 'react'
import {isAuthenticated} from '../../script/firebase'

const userLoggedIn = (props) => {
  return <div>
    <div>
      <h1>Hello User!</h1>
    </div>
  </div>
}

const publicUser = (props) => {
  return <div>
    <div>
      <h1>Join us!</h1>
      <h6>Sign In/Register to Continue</h6>
      <button onClick={props.signinModalOpen}>Sign In</button>
      <button onClick={props.registerModalOpen}>Register</button>
    </div>

  </div>
}

const HomeMain = (props) => {
  console.log('home props', props)
  if (isAuthenticated()) {
    return userLoggedIn(props)
  } else {
    return publicUser(props)
  }
}


export default HomeMain
