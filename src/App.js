import './App.css'
import './Carousel.css'
import 'semantic-ui-css/semantic.min.css'

import React, { Component } from 'react'
import {BrowserRouter, Link, Route, Redirect} from 'react-router-dom'
import Modal from 'react-modal'
import axios from 'axios'
import {Divider, Button, Input, Icon} from 'semantic-ui-react'


import $ from 'jquery'
import {auth, storageKey, isAuthenticated} from './script/firebase'

import NavMain from './components/nav/NavMain'
import Brochures from './components/brochures/main'
import Brochure from './components/brochure/main'
import ProfileMain from './components/profile/ProfileMain'
import HomeMain from './components/home/HomeMain'

const backendURL = 'https://cryptic-ridge-83503.herokuapp.com/'
// const backendURL = 'http://localhost:7777/'
const appElement = $('#root')

const customStyles = {
  content: {
    width: '600px',
    height: '200px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }} />
    )
  )} />
)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      backendURL: backendURL,
      currentUser: null,
      signinModalOpen: false,
      registerModalOpen: false
    }

    this.signout = this.signout.bind(this)

    this.signinModalOpen = this.signinModalOpen.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeSigninModal = this.closeSigninModal.bind(this)

    this.registerModalOpen = this.registerModalOpen.bind(this)
    this.closeRegisterModal = this.closeRegisterModal.bind(this)
  }

  afterOpenModal () {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00'
  }

  signinModalOpen () {
    this.setState({signinModalOpen: true})
  }

  closeSigninModal () {
    this.setState({signinModalOpen: false})
  }

  registerModalOpen () {
    this.setState({registerModalOpen: true})
  }

  closeRegisterModal () {
    this.setState({registerModalOpen: false})
  }

  signin (e) {
    e.preventDefault()

    const $email = $('#email').val()
    const $password = $('#password').val()

    console.log($email, $password)

    auth.signInWithEmailAndPassword($email, $password)
      .then((user) => {
        this.setState({
          currentUser: user.uid
        })
        window.location = '/'
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  signout (e) {
    e.preventDefault()
    auth.signOut().then(function () {
      console.log('signed out success')
      console.log(window.history)
      window.location = '/'
    })
  }

  getUser (e) {
    e.preventDefault()

    const user = auth.currentUser
    console.log('getuser', user)
    console.log('getuser localstorage', localStorage)
  }

  register (e) {
    e.preventDefault()
    const $email = $('#email').val()
    const $password = $('#password').val()

    console.log($email, $password)

    auth.createUserWithEmailAndPassword($email, $password)
      .then((user) => {
        axios({
          method: 'POST',
          url: `${this.state.backendURL}users`,
          data: {
            user: user
          }
        })
        .then((response) => {
          console.log(response)
          window.location = '/profile'
        })
        .catch((err) => {
          console.log(err)
        })
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  componentWillMount () {
    console.log('At componentWillMount')
    auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid)
        this.setState({currentUser: user.uid})
      } else {
        window.localStorage.removeItem(storageKey)
        this.setState({currentUser: null})
      }
    })
  }

  signinModal () {

    return (
      <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div>
            <h1>Sign In</h1>
          </div>
          <div>
            <Button icon='remove'onClick={this.closeSigninModal} />
          </div>
        </div>
        <div>
          <form id='sign_in_form'>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <div>
                <Input label='Email' placeholder='example@gmail.com' id='email' name='email' type='email' />
                {/* <label>
                  Email:{' '}
                  <input type='email' placeholder='Enter Email' name='email' id='email' />
                </label> */}
              </div>
              <div>
                <Input label='Password' placeholder='iloveprima' id='password' name='password' type='password' />
                {/* <label>
                  Password:{' '}
                  <input type='password' placeholder='Enter Password' name='password' id='password' />
                </label> */}
              </div>
            </div>
          </form>
        </div>
        <div>
          <Button positive onClick={(e) => this.signin(e)}>Register</Button>
        </div>
      </div>
    )
  }

  registerModal () {
    return <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <div>
          <h1>Register</h1>
        </div>
        <div>
          <Button icon='remove'onClick={this.closeRegisterModal} />
        </div>
      </div>
      <div>
        <form id='sign_in_form'>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div>
              <Input label='Email' placeholder='example@gmail.com' id='email' name='email' type='email' />
              {/* <label>
                Email:{' '}
                <input type='email' placeholder='Enter Email' name='email' id='email' />
              </label> */}
            </div>
            <div>
              <Input label='Password' placeholder='iloveprima' id='password' name='password' type='password' />
              {/* <label>
                Password:{' '}
                <input type='password' placeholder='Enter Password' name='password' id='password' />
              </label> */}
            </div>
          </div>
        </form>
      </div>
      <div>
        <Button positive onClick={(e) => this.register(e)}>Register</Button>
      </div>
    </div>
  }

  render () {
    console.log('rendering at APP')
    console.log(this.state.signinModalOpen)
    return (
      <BrowserRouter>
        <div>
          <NavMain
            signinModalOpen={this.signinModalOpen}
            registerModalOpen={this.registerModalOpen}
            signout={this.signout}
          />
          <Divider hidden clearing />
          <main>
            {/* <button onClick={(e) => this.getUser(e)}>Get User</button> */}
            {/* Sign in Modal Box */}
            <Modal
              isOpen={this.state.signinModalOpen}
              // onAfterOpen={this.afterOpenModal}
              style={customStyles}
              onRequestClose={this.closeSigninModal}
              contentLabel='signinModal'>
              {this.signinModal()}
            </Modal>
            {/* Register Modal Box */}
            <Modal
              isOpen={this.state.registerModalOpen}
              style={customStyles}
              // onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeRegisterModal}
              contentLabel='registerModal'>
              {this.registerModal()}
            </Modal>

            <Route exact path='/' render={(props) => <HomeMain registerModalOpen={this.registerModalOpen} signinModalOpen={this.signinModalOpen} {...props} />} />
            <PrivateRoute exact path='/brochures' component={Brochures} backendURL={backendURL} />
            <PrivateRoute exact path='/profile' component={ProfileMain} backendURL={backendURL} />
            <Route path='/brochures/:id' render={(props) => <Brochure backendURL={backendURL} {...props} />} />
            <Route path='/showcases/:id' render={(props) => <Brochure backendURL={backendURL} {...props} />} />
          </main>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
