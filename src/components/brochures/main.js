import React from 'react'
import axios from 'axios'
import $ from 'jquery'
import {Item} from 'semantic-ui-react'

import {isAuthenticated, storageKey} from '../../script/firebase'

import ListItem from './ListItem'

class Brochures extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      allBrochures: {}
    }
  }

  create () {
    console.log('create', localStorage[storageKey])
    const $newBrochureTitle = $('#newBrochureTitle').val()

    axios({
      method: 'post',
      url: this.props.backendURL + 'brochures',
      data: {
        user: localStorage[storageKey],
        file: {
          title: $newBrochureTitle,
          draft: true
        }
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
    console.log('localStorage brochures', localStorage.KEY_FOR_LOCAL_STORAGE)
    const ListItems = []
    const allBrochures = this.state.allBrochures
    for (var key in allBrochures) {
      console.log(key)
      console.log(allBrochures[key])
      ListItems.push(<ListItem key={key} id={key} backendURL={this.props.backendURL} data={allBrochures[key]} />)
    }
    return (
      <div>
        <div>
          <h1>Create New</h1>
          <input type='text' placeholder='Title of Brochure' id='newBrochureTitle' />
          <button onClick={() => this.create()}>Make New</button>
        </div>
        <div>
          <Item.Group link>
            {ListItems}
          </Item.Group>
        </div>
      </div>
    )
  }

  componentDidMount () {
    console.log('isAuthenticated brochures CDM', isAuthenticated())
    if (isAuthenticated()) {
      axios({
        method: 'GET',
        url: `${this.props.backendURL}brochures/${localStorage.KEY_FOR_LOCAL_STORAGE}`
        // url: this.props.backendURL + 'brochures'
      })
      .then((response) => {
        console.log('componentDidMount response', response.data)
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
