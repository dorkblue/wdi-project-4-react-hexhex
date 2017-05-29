import React from 'react'
import axios from 'axios'

import {isAuthenticated, storageKey} from '../../script/firebase'

import DescriptionsMain from './descriptions/DescriptionsMain'

const $ = require('jquery')

function formDataConverter (arr) {
  const newObj = {}
  arr.forEach((item, index) => {
    let key = item.name
    let val = item.value
    newObj[key] = val
  })

  return newObj
}

class Brochure extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brochureData: {},
      brochureDescriptions: {},
      brochureDetails: {},
      editDescriptions: false
    }
  }

  saveDescriptions (e) {
    e.preventDefault()
    const descriptionsKey = this.state.brochureData.descriptions_key

    const $formDescription = $('#description-form').serializeArray()
    const convertedForm = formDataConverter($formDescription)
    console.log('converted form', convertedForm)

    axios({
      method: 'PUT',
      url: `${this.props.backendURL + 'descriptions/' + descriptionsKey}`,
      data: convertedForm
    })
    .then((response) => {
      this.setState({
        brochureDescriptions: response.data,
        editDescriptions: false
      })
    })
  }

  toggleDescriptionsEdit () {
    const editStatus = !this.state.editDescriptions
    this.setState({
      editDescriptions: editStatus
    })
  }

  deleteBrochure () {
    console.log(this)
    axios({
      method: 'DELETE',
      url: `${this.props.backendURL}brochures/${this.props.match.params.id}`,
      data: this.state.brochureData
    })
    .then((response) => {
      console.log(response.data)
      this.props.history.push('/brochures')
    })
  }

  render() {
    console.log('this.props', this.props)
    const brochureData = this.state.brochureData
    const brochureDescriptions = this.state.brochureDescriptions
    const brochureDetails = this.state.brochureDetails
    return (
      <div>
        <h1>{brochureData.title} </h1>
        <button onClick={() => this.deleteBrochure()}>Delete Brochure</button>
        <DescriptionsMain
          data={brochureDescriptions}
          edit={this.state.editDescriptions}
          toggleEdit={() => this.toggleDescriptionsEdit()}
          save={(e) => this.saveDescriptions(e)} />
      </div>
    )
  }
  componentDidMount () {
    const brochureKey = this.props.match.params.id

    axios
    .get(`${this.props.backendURL}brochures/${localStorage.KEY_FOR_LOCAL_STORAGE}/${brochureKey}`)
    .then((response) => {
      console.log('response', response)
      axios
      .all(
        [
          axios.get(`${this.props.backendURL + 'descriptions/' + response.data.descriptions_key}`),
          axios.get(`${this.props.backendURL + 'details/' + response.data.details_key}`)
        ]
      )
      .then(axios.spread((resDescriptions, resDetails) => {
        console.log('response data', response.data)
        this.setState({
          brochureData: response.data,
          brochureDescriptions: resDescriptions.data,
          brochureDetails: resDetails.data
        })
      }))
    })
    .catch((err) => {
      console.log(err)
    })
  }

}

export default Brochure
