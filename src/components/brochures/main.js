import React from 'react'
import axios from 'axios'
import $ from 'jquery'

import {isAuthenticated} from '../../script/firebase'

// import firebase from '../../script/firebase'

import ListItem from './ListItem'

// const auth = firebase.auth()

class Brochures extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      allBrochures: {}
    }
  }

  create () {
    const $newBrochureTitle = $('#newBrochureTitle').val()

    axios({
      method: 'post',
      url: this.props.backendURL + 'brochures',
      data: {
         title: $newBrochureTitle,
         draft: true
         }
    })
    .then((response) => {
      this.props.history.push({
        pathname: `/brochures/${response.data.key}`,
        state: response.data.body
      })
    })
  }

  render () {
    console.log('this.props brochures', this.props)
    console.log('localStorage brochures', localStorage)
    const ListItems = []
    const allBrochures = this.state.allBrochures
    for (var key in allBrochures) {
      ListItems.push(<ListItem key={key} id={key} />)
    }
    return (
      <div>
        <div>
          <h1>Create New</h1>
          <input type='text' placeholder='Title of Brochure' id='newBrochureTitle' />
          <button onClick={() => this.create()}>Make New</button>
        </div>
        <div>
          <h1>All Brochures List</h1>
          {ListItems}
        </div>
      </div>
    )
  }

  componentDidMount () {
    console.log('isAuthenticated brochures CDM', isAuthenticated())
    if (isAuthenticated()) {
      axios({
        method: 'GET',
        url: this.props.backendURL + 'brochures'
      })
      .then((response) => {
        this.setState({
          allBrochures: response.data
        })
      })
      console.log('user logged in')
    } else {
      console.log('user not logged in')
    }
  }
}

export default Brochures
