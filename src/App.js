import React, { Component } from 'react'
import {BrowserRouter, Link, Route} from 'react-router-dom'
import $ from 'jquery'
import {auth, storageKey} from './script/firebase'

import NavMain from './components/nav/NavMain'
import Brochures from './components/brochures/main'
import Brochure from './components/brochure/main'

const backendURL = 'http://localhost:7777/'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentUser: null
    }
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
        this.props.history.push('/brochures')
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  signout (e) {
    e.preventDefault()
    auth.signOut().then(function () {
      console.log('signed out success')
    })

    window.location = '/'
  }

  getUser (e) {
    e.preventDefault()

    const user = auth.currentUser
    console.log('getuser', user)
  }

  register (e) {
    e.preventDefault()

    const $email = $('#email').val()
    const $password = $('#password').val()

    console.log($email, $password)

    auth.createUserWithEmailAndPassword($email, $password)
      .then((user) => {
        this.props.history.push('/brochures')
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

  render () {
    console.log('rendering at APP')
    // console.log('currentUser state', this.state.currentUser)
    // console.log('localStorage', localStorage)
    return (
      <BrowserRouter>
        <div>
          <NavMain
            signin={(e) => this.signin(e)}
            signout={(e) => this.signout(e)}
            getUser={(e) => this.getUser(e)}
            register={(e) => this.register(e)}
          />
          <main>
            <Route exact path='/' />
            <Route exact path='/brochures' render={(props) => <Brochures backendURL={backendURL} currentUser={this.state.currentUser} {...props} />} />
            <Route path='/brochures/:id' render={(props) => <Brochure backendURL={backendURL} currentUser={this.state.currentUser} {...props} />} />
          </main>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
