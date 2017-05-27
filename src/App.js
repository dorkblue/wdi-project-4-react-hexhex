import React, { Component } from 'react'
import {BrowserRouter, Link, Route} from 'react-router-dom'
import Brochures from './components/brochures/main'
import Brochure from './components/brochure/main'

const backendURL = 'http://localhost:7777/'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <nav>
            <Link to='/brochures'>
              All Brochures
            </Link>
          </nav>
          <main>
            <Route exact path='/' />
            <Route exact path='/brochures' render={(props) => <Brochures backendURL={backendURL} {...props} />} />
            <Route path='/brochures/:id' render={(props) => <Brochure backendURL={backendURL} {...props} />} />
          </main>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
