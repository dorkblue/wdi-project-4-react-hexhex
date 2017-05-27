import React from 'react'
import {Link} from 'react-router-dom'

class ListItem extends React.Component {

  render() {
    console.log('ListItem', this)
    return (
      <div>
        <Link to={'/brochures/' + this.props.id}>{this.props.id}</Link>
      </div>
    )
  }

}

export default ListItem
