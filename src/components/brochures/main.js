import React from 'react'
import {Route} from 'react-router-dom'
import axios from 'axios'

import ListItem from './listitem'

class Brochures extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      allBrochures: {}
    }
  }

  createNew() {
    return <Route path={'/brochures/123'} />
  }

  render() {
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
          <button onClick={() => this.createNew()}>Here</button>
        </div>
        <div>
          <h1>All Brochures List</h1>
          {ListItems}
        </div>
      </div>
    )
  }

  componentDidMount() {
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
