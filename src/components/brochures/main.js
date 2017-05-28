import React from 'react'
import axios from 'axios'
import $ from 'jquery'

import ListItem from './ListItem'

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
      console.log('response here', response.data)
      this.props.history.push({
        pathname: `/brochures/${response.data.key}`,
        state: response.data.body
      })
    })
  }

  render () {
    console.log(this.state.allBrochures)
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
    axios({
      method: 'GET',
      url: this.props.backendURL + 'brochures'
    })
    .then((response) => {
      console.log('response here from GET /brochures')
      console.log(response.data)

      this.setState({
        allBrochures: response.data
      })
    })
  }
}

export default Brochures
