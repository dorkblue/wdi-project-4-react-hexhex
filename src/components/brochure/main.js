import React from 'react'
import axios from 'axios'

import {isAuthenticated, storageKey, storage} from '../../script/firebase'

import DescriptionsMain from './descriptions/DescriptionsMain'
import BannerMain from './banner/BannerMain'
import Modal from 'react-modal'
import DetailsMain from './details/DetailsMain'
import Carousell from './carousel/CarouselMain'

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

const deleteModalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

class Brochure extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      brochureData: {},
      brochureDescriptions: {},
      brochureDetails: {},
      brochureBanner: {},
      editDescriptions: false,
      editBanner: false,
      editDetails: false,
      deleteModalOpen: false
    }

    this.deleteModalOpen = this.deleteModalOpen.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
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
      .ref(`/${this.props.match.params.id}-${this.state.brochureData.banner_key}`)
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

  saveDetails (e) {
    e.preventDefault()
    const detailsKey = this.state.brochureData.details_key

    const $formDetails = $('#details-form').serializeArray()
    const convertedForm = formDataConverter($formDetails)
    console.log('converted form', convertedForm)

    axios({
      method: 'PUT',
      url: `${this.props.backendURL + 'details/' + detailsKey}`,
      data: convertedForm
    })
    .then((response) => {
      this.setState({
        brochureDetails: response.data,
        editDetails: false
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

  toggleDetailsEdit () {
    const editStatus = !this.state.editDetails
    this.setState({
      editDetails: editStatus
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
      // delete image from storage here
      if (this.state.brochureBanner.url !== '') {
        const bannerStorage = storage
        .ref(`/${this.props.match.params.id}-${this.state.brochureData.banner_key}`)

        bannerStorage.delete().catch((err) => {
          console.log(err)
        })
      }
      this.props.history.push('/brochures')
    })
  }

  deleteModalOpen () {
    this.setState({deleteModalOpen: true})
  }

  closeDeleteModal () {
    this.setState({deleteModalOpen: false})
  }

  render () {
    console.log('this.props', this.props)
    const brochureData = this.state.brochureData
    const brochureDescriptions = this.state.brochureDescriptions
    const brochureDetails = this.state.brochureDetails
    const brochureBanner = this.state.brochureBanner
    return (
      <div>
        <h1>{brochureData.title} </h1>
        {/* <button onClick={() => this.deleteBrochure()}>Delete Brochure</button> */}
        <button onClick={this.deleteModalOpen}>Delete Brochure</button>
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
        <div style={{height: '200px'}}>
        </div>
        <Carousell />
        <Modal
          isOpen={this.state.deleteModalOpen}
          // onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeDeleteModal}
          style={deleteModalStyle}
          contentLabel='deleteBrochureModal'>
          <div>
            <h1>Are you sure?</h1>
            <button onClick={() => this.deleteBrochure()}>Yes</button><button onClick={this.closeDeleteModal}>No</button>
          </div>
        </Modal>
        <DetailsMain
          data={brochureDetails}
          edit={this.state.editDetails}
          toggleEdit={() => this.toggleDetailsEdit()}
          save={(e) => this.saveDetails(e)} />
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
