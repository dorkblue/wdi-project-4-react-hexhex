import React from 'react'
import axios from 'axios'
import $ from 'jquery'
import {Item, Divider, Button, Input, Header, Icon, Segment} from 'semantic-ui-react'

import {isAuthenticated, storageKey} from '../../script/firebase'

import ListItem from './listitem'

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
        <Header as='h2'>
          <Icon name='folder' />
          <Header.Content>
            Brochures
            <Header.Subheader>
              View all & create your brochure here
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Segment>
          <Input fluid type='text' id='newBrochureTitle' placeholder='Claymore Hill.. 3 Bedroom Unit..' action>
            <input />
            <Button color='teal' onClick={() => this.create()}>New Brochure</Button>
          </Input>
        <Divider />
          <Item.Group divided>
            {ListItems}
          </Item.Group>
        </Segment>
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
