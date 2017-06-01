import React from 'react'
import {Link} from 'react-router-dom'
import {isAuthenticated, storageKey} from '../../script/firebase'

import {Button, Divider} from 'semantic-ui-react'

const loggedinState = (props) => {
  return <div>
    <Link to='/brochures'>
      <Button color='blue' floated='left'>Brochures</Button>
    </Link>{' '}
    <Link to='/profile'>
      <Button color='blue' floated='left'>Profile</Button>
    </Link>
    <Button inverted color='red' onClick={props.signout} floated='right'>Sign Out</Button>
  </div>
}

const notLoggedinState = (props) => {
  return <div>
    <Button onClick={props.signinModalOpen} floated='right'>Sign In</Button>
    <Button onClick={props.registerModalOpen} floated='right'>Register</Button>
  </div>
}

const NavMain = (props) => {
  let authState
  if (isAuthenticated()) {
    authState = loggedinState(props)
  } else {
    authState = notLoggedinState(props)
  }
  return <div>
    {authState}
  </div>
}

export default NavMain
