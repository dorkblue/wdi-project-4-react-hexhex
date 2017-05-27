import React from 'react'

class Brochure extends React.Component {

  render() {
    console.log(this)
    return (
      <div>
        <h1>{this.props.match.params.id}</h1>
      </div>
    )
  }

}

export default Brochure
