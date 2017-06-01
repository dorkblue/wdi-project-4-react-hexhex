import React from 'react'
import {Link} from 'react-router-dom'
import {Item, Divider} from 'semantic-ui-react'
import axios from 'axios'

const sampleImage = 'https://firebasestorage.googleapis.com/v0/b/project-hex-hex.appspot.com/o/1215201531538PMHedges-Park--Condominium-Interior-Design-01.jpg?alt=media&token=96be9951-fae9-484c-84a1-02fa3d5b4292'

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
        <Item.Image size='small' src={sampleImage} />

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
