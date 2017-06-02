import React from 'react'
import {isAuthenticated} from '../../script/firebase'
import {Header, Icon, Button} from 'semantic-ui-react'

const userLoggedIn = (props) => {
  return <div>
    <div>
      <h1>Hello User!</h1>
    </div>
  </div>
}

const publicUser = (props) => {
  return <div style={{width: '500px', margin: '0 auto'}}>
    <div>
      <Header as='h2' icon>
        <Icon name='settings' />
        Join Us!
        <Header.Subheader>
          Sign In/Register to Continue
        </Header.Subheader>
      </Header>
    </div>
    <Button onClick={props.signinModalOpen}>Sign In</Button>
    <Button onClick={props.registerModalOpen}>Register</Button>
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
