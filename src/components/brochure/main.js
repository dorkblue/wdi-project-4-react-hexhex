import React from 'react'
import axios from 'axios'

import {isAuthenticated, storageKey, storage} from '../../script/firebase'

import DescriptionsMain from './descriptions/DescriptionsMain'
import BannerMain from './banner/BannerMain'
import Modal from 'react-modal'
import DetailsMain from './details/DetailsMain'
import Caro from './carousel/CarouselMain'
import Pictures from './pictures/Pictures'
import Picture2 from './pictures/Picture2'
import {Header, Icon, Dropdown, Segment, Divider, Button, Input} from 'semantic-ui-react'

import CopyToClipboard from 'react-copy-to-clipboard'
import Map from './map/Map'

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
      brochurePicture: {},
      brochurePicture2: {},
      brochureCarousel: [],
      uploadedImage: null,
      uploadedImage2: null,
      editDescriptions: false,
      editBanner: false,
      editDetails: false,
      deleteModalOpen: false,
      editPicture: false,
      editPicture2: false
    }

    this.deleteModalOpen = this.deleteModalOpen.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
    this.togglePictureEdit = this.togglePictureEdit.bind(this)
    this.saveCarouselPic = this.saveCarouselPic.bind(this)
  }

  saveCarouselPic (e, carouselKey, seq) {
    console.log('event', e.target.files[0])
    console.log('carouselKey', carouselKey)

    let picToUpload = e.target.files[0]

    const carouselDirectory = storage.ref(`/${this.props.match.params.id}-${carouselKey}`)
    .put(picToUpload)
    .then((snapshot) => {
      axios({
        method: 'PUT',
        url: `${this.props.backendURL}carousel/${carouselKey}`,
        data: {
          url: snapshot.downloadURL
        }
      })
      .then((response) => {
        const brochureCarousel = this.state.brochureCarousel

        console.log('brochureCarousel axios', brochureCarousel[seq])
        brochureCarousel[seq].url = response.data.url

        this.setState({
          brochureCarousel: brochureCarousel
        })
      })
    })
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

  savePicture (e) {
    console.log(this.props)
    let $picture_upload = e.target.files[0]

    const pictureDirectory = storage
      .ref(`/${this.props.match.params.id}-${this.state.brochureData.picture_key}`)
      .put($picture_upload)
      .then((snapshot) => {
        axios({
          method: 'PUT',
          url: `${this.props.backendURL}banner/${this.state.brochureData.picture_key}`,
          data: {
            url: snapshot.downloadURL
          }
        })
        .then((response) => {
          this.setState({
            brochurePicture: response.data
          })
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })
      })
  }

  savePicture2 (e) {
    console.log(this.props)
    let $picture2_upload = e.target.files[0]

    const pictureDirectory2 = storage
      .ref(`/${this.props.match.params.id}-${this.state.brochureData.picture2_key}`)
      .put($picture2_upload)
      .then((snapshot) => {
        axios({
          method: 'PUT',
          url: `${this.props.backendURL}banner/${this.state.brochureData.picture2_key}`,
          data: {
            url: snapshot.downloadURL
          }
        })
        .then((response) => {
          this.setState({
            brochurePicture2: response.data
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

  togglePictureEdit () {
    const editStatus = !this.state.editPicture
    this.setState({
      editPicture: editStatus
    })
  }



  togglePictureEdit2 () {
    const editStatus = !this.state.editPicture
    this.setState({
      editPicture2: editStatus
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
    // const brochurePicture = this.state.brochurePicture
    // const brochurePicture2 = this.state.brochurePicture2
    const brochureCarousel = this.state.brochureCarousel

    console.log(brochureCarousel)

    return (
      <Segment.Group>
        <Segment>
          <div id='brochure-header-container'>
            <div id='brochure-header-title'>
              <Header as='h2'>
                <Icon name='edit' />
                <Header.Content>
                  <Dropdown text={brochureData.title}>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={this.deleteModalOpen} text='Delete Brochure' />
                    </Dropdown.Menu>
                  </Dropdown>
                  <Header.Subheader>
                    Edit & publish your brochure
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </div>
            <div id='brochure-header-clipboard'>
              <CopyToClipboard text='LINK HERE'>
                <div>
                  <Input action={{color: 'teal', labelPosition: 'left', icon: 'linkify', content: 'Copy Link'}} actionPosition='left' defaultValue='LINK HERE' />
                </div>
              </CopyToClipboard>
            </div>
          </div>
          <Divider clearing />

          <div id='banner-container'>
            <BannerMain
              saveBanner={(e) => this.saveBanner(e)}
              data={brochureBanner}
              toggleEdit={() => this.toggleBannerEdit()}
              edit={this.state.editBanner} />
          </div>

          <div id='descriptions-details-container'>
            <div id='details-container'>
              <h1>Details Should Be Here</h1>
              <DetailsMain
                data={brochureDetails}
                edit={this.state.editDetails}
                toggleEdit={() => this.toggleDetailsEdit()}
                save={(e) => this.saveDetails(e)} />
            </div>
            <div id='descriptions-container'>
              <DescriptionsMain
                data={brochureDescriptions}
                edit={this.state.editDescriptions}
                toggleEdit={() => this.toggleDescriptionsEdit()}
                save={(e) => this.saveDescriptions(e)} />
            </div>
          </div>

            <Caro
              edit={this.state.editPicture}
              togglePictureEdit={this.togglePictureEdit}
              data={brochureCarousel}
              saveCarouselPic={(e, carouselKey, seq) => this.saveCarouselPic(e, carouselKey, seq)} />

            {/* <div id='picture-container'>
              <h1>Upload Pictures</h1>
              <Pictures
                savePicture={(e) => this.savePicture(e)}
                data={brochurePicture}
                toggleEdit={() => this.togglePictureEdit()}
                edit={this.state.editPicture} />
            </div>

            <div id='picture-container2'>
              <h1>Upload Pictures 2</h1>
              <Picture2
                savePicture2={(e) => this.savePicture2(e)}
                data={brochurePicture2}
                toggleEdit={() => this.togglePictureEdit2()}
                edit={this.state.editPicture2} />
            </div> */}

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
          <div id='map-container'>
            <h1>Map of Surroundings</h1>
            <Map />
          </div>
        </Segment>
        <Segment inverted>
          <h1> AGENT INFO HERE </h1>
        </Segment>
      </Segment.Group>
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
          axios.get(`${this.props.backendURL + 'banner/' + response.data.banner_key}`),
          axios.get(`${this.props.backendURL + 'carousel/' + response.data.carousel0_key}`),
          axios.get(`${this.props.backendURL + 'carousel/' + response.data.carousel1_key}`),
          axios.get(`${this.props.backendURL + 'carousel/' + response.data.carousel2_key}`),
          axios.get(`${this.props.backendURL + 'carousel/' + response.data.carousel3_key}`),
          axios.get(`${this.props.backendURL + 'carousel/' + response.data.carousel4_key}`),
          axios.get(`${this.props.backendURL + 'carousel/' + response.data.carousel5_key}`)


          // axios.get(`${this.props.backendURL + 'picture/' + response.data.picture_key}`),
          // axios.get(`${this.props.backendURL + 'picture2/' + response.data.picture2_key}`)
        ]
      )
      .then(axios.spread((resDescriptions, resDetails, resBanner, resCarousel0, resCarousel1, resCarousel2, resCarousel3, resCarousel4, resCarousel5) => {
        const brochureCarousel = [
          resCarousel0.data,
          resCarousel1.data,
          resCarousel2.data,
          resCarousel3.data,
          resCarousel4.data,
          resCarousel5.data
        ]
        console.log('brochureCarousel', brochureCarousel)
        this.setState({
          brochureData: response.data,
          brochureDescriptions: resDescriptions.data,
          brochureDetails: resDetails.data,
          brochureBanner: resBanner.data,
          brochureCarousel: brochureCarousel
          // brochurePicture: resPicture.data,
          // brochurePicture2: resPicture2.data
        })
      }))
    })
    .catch((err) => {
      console.log(err)
    })
  }

}

export default Brochure
