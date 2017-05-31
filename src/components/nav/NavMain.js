import React from 'react'
import {Link} from 'react-router-dom'
import {isAuthenticated, storageKey} from '../../script/firebase'

const userloggedin = () => {
  console.log('in userloggedin')
  console.log(localStorage)
  if (localStorage && localStorage[storageKey] !== '') {
    return true
  } else {
    return false
  }
}

const loggedinState = (props) => {
  return <div>
    <Link to='/brochures'>
      All Brochures
    </Link>{' '}
    <Link to='/profile'>
      Profile
    </Link>
    <button onClick={props.signout}>Sign Out</button>
  </div>
}

const notLoggedinState = (props) => {
  return <div>
    <button onClick={props.signinModalOpen}>Sign In</button>
    {'/'}
    <button onClick={props.registerModalOpen}>Register</button>
  </div>
}

const NavMain = (props) => {
  let authState
  if (isAuthenticated()) {
    authState = loggedinState(props)
  } else {
    authState = notLoggedinState(props)
  }
  return <nav>
    {authState}
  </nav>
}

export default NavMain
