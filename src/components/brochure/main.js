import React from 'react'
import axios from 'axios'

import {isAuthenticated, storageKey, storage} from '../../script/firebase'

import DescriptionsMain from './descriptions/DescriptionsMain'
import BannerMain from './banner/BannerMain'

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
      brochureBanner: {},
      editDescriptions: false,
      editBanner: false
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

  saveBanner (e) {
    console.log(this.props)
    let $banner_upload = e.target.files[0]

    const bannerDirectory = storage
                            .ref(`/${this.props.match.params.id}/${this.state.brochureData.banner_key}`)
                            .put($banner_upload)
                            .then((snapshot) => {
                              axios({
                                method: 'PUT',
                                url: `${this.props.backendURL}banner/${this.state.brochureData.banner_key}`,
                                data: {
                                  url: snapshot.downloadURL
                                }
                              })
                              .then((response) => {
                                this.setState({
                                  brochureBanner: response.data
                                })
                                console.log(response)
                              })
                              .catch((err) => {
                                console.log(err)
                              })
                            })
  }

  toggleDescriptionsEdit () {
    const editStatus = !this.state.editDescriptions
    this.setState({
      editDescriptions: editStatus
    })
  }

  toggleBannerEdit () {
    const editStatus = !this.state.editBanner
    this.setState({
      editBanner: editStatus
    })
  }

  deleteBrochure () {
    console.log(this)
    axios({
      method: 'DELETE',
      url: `${this.props.backendURL}brochures/${localStorage.KEY_FOR_LOCAL_STORAGE}/${this.props.match.params.id}`,
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
    const brochureBanner = this.state.brochureBanner
    return (
      <div>
        <h1>{brochureData.title} </h1>
        <button onClick={() => this.deleteBrochure()}>Delete Brochure</button>
        <DescriptionsMain
          data={brochureDescriptions}
          edit={this.state.editDescriptions}
          toggleEdit={() => this.toggleDescriptionsEdit()}
          save={(e) => this.saveDescriptions(e)} />
        {/* <BannerMain saveBanner={this.saveBanner} /> */}
        <BannerMain
          saveBanner={(e) => this.saveBanner(e)}
          data={brochureBanner}
          toggleEdit={() => this.toggleBannerEdit()}
          edit={this.state.editBanner} />
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
          axios.get(`${this.props.backendURL + 'details/' + response.data.details_key}`),
          axios.get(`${this.props.backendURL + 'banner/' + response.data.banner_key}`)
        ]
      )
      .then(axios.spread((resDescriptions, resDetails, resBanner) => {
        console.log('resBanner data', resBanner)
        this.setState({
          brochureData: response.data,
          brochureDescriptions: resDescriptions.data,
          brochureDetails: resDetails.data,
          brochureBanner: resBanner.data
        })
      }))
    })
    .catch((err) => {
      console.log(err)
    })
  }

}

export default Brochure
