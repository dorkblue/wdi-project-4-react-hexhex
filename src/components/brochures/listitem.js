import React from 'react'
import {Link} from 'react-router-dom'
import {Item} from 'semantic-ui-react'
import axios from 'axios'

class ListItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      descriptions: '',
      descriptionKey: props.data.descriptions_key,
      brochureTitle: props.data.title,
      backendURL: props.backendURL
    }
  }

  render () {
    return (
      <Item>
        <Item.Image />

        <Item.Content>
          <Item.Header><Link to={`/brochures/${this.props.id}`}>{this.state.brochureTitle}</Link></Item.Header>
          <Item.Description>{this.state.descriptions}</Item.Description>
        </Item.Content>
      </Item>
    )
  }

  componentDidMount () {
    axios
    .get(`${this.state.backendURL}descriptions/${this.state.descriptionKey}`)
    .then((response) => {
      console.log(response.data)
      this.setState({
        descriptions: response.data.content
      })
    })
  }
}

export default ListItem
