import React from 'react'
import {storageKey, storage, auth} from '../../script/firebase'
import axios from 'axios'
import EditState from './EditState'
import ViewState from './ViewState'
import $ from 'jquery'
import {Button, Divider} from 'semantic-ui-react'

function formDataConverter (arr) {
  const newObj = {}
  arr.forEach((item, index) => {
    let key = item.name
    let val = item.value
    newObj[key] = val
  })

  return newObj
}

class ProfileMain extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userData: {},
      editState: false
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.saveLogo = this.saveLogo.bind(this)
    this.saveProfilePic = this.saveProfilePic.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
    this.deleteAcc = this.deleteAcc.bind(this)
  }

  toggleEdit () {
    this.setState({
      editState: !this.state.editState
    })
  }

  saveLogo (e) {
    console.log(this)
    console.log(e.target.files)
    console.log(this.state.userData)
    const userUID = localStorage[storageKey]

    let logoImage = e.target.files[0]

    storage.ref(`/${userUID}-logo`)
    .put(logoImage)
    .then((snapshot) => {
      console.log(snapshot.downloadURL)
      axios({
        method: 'PUT',
        url: `${this.props.backendURL}users/${userUID}/updatelogo`,
        data: {
          logoURL: snapshot.downloadURL
        }
      })
      .then((response) => {
        const userData = this.state.userData
        userData['logoURL'] = response.data.logoURL
        this.setState({
          userData: userData
        })
      })
      .catch((err) => {
        console.log(err)
      })
    })
  }

  saveProfilePic (e) {
    const userUID = localStorage.getItem(storageKey)

    let profileImage = e.target.files[0]

    storage.ref(`/${userUID}-profileImage`)
    .put(profileImage)
    .then((snapshot) => {
      console.log(snapshot.downloadURL)
      axios({
        method: 'PUT',
        url: `${this.props.backendURL}users/${userUID}/updateprofileimage`,
        data: {
          profileURL: snapshot.downloadURL
        }
      })
      .then((response) => {
        const userData = this.state.userData
        userData['profileURL'] = response.data.profileURL
        this.setState({
          userData: userData
        })
      })
      .catch((err) => {
        console.log(err)
      })
    })
  }

  updateProfile (e) {
    console.log(e.target)
    e.preventDefault()
    const userUID = localStorage.getItem(storageKey)

    const $formProfile = $('#profile-form').serializeArray()
    const convertedForm = formDataConverter($formProfile)

    console.log(convertedForm)

    axios({
      method: 'PUT',
      url: `${this.props.backendURL}users/${userUID}`,
      data: convertedForm
    })
    .then((response) => {
      console.log('updateProfile', response.data)
      this.setState({
        userData: response.data,
        editState: false
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  deleteAcc (e) {
    console.log(this)
    const userUID = localStorage.getItem(storageKey)

    axios({
      method: 'DELETE',
      url: `${this.props.backendURL}users/${userUID}`
    })
    .then((response) => {
      if (response.data.deleted) {
        const logo = storage.ref(`${userUID}-logo`)
        console.log('logo url', logo.getDownloadURL())
        storage.ref(`${userUID}-logo`).delete()
        .then(() => {
          console.log('logo deleted!')
        })
        .catch(() => {
          console.log('logo not found!')
        })

        storage.ref(`${userUID}-profileImage`).delete()
        .then(() => {
          console.log('profile image deleted!')
        })
        .catch(() => {
          console.log('profile image not found!')
        })

        auth.signOut().then(function () {
          console.log('signed out success')
        })

        const user = auth.currentUser

        user.delete().then(() => {
          console.log('user deleted!')
          window.location = '/'
        }).catch(() => {
          console.log('fail to delete user!')
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render () {
    console.log('userData', this.state.userData)
    if (this.state.editState) {
      return (
        <div>
          <h1>Profile Page</h1>
          <h4>Set up your personal details here so that they can be viewed on your brochure.</h4>
          <EditState
            data={this.state.userData}
            saveLogo={this.saveLogo}
            saveProfilePic={this.saveProfilePic}
            updateProfile={this.updateProfile} />
          <button color='blue' floated='left' onClick={this.toggleEdit}>Back</button>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Profile Page</h1>
          <h4>Set up your personal details here so that they can be viewed on your brochure.</h4>
          <ViewState data={this.state.userData} />
          <button onClick={this.toggleEdit}>Edit</button>
          <button onClick={this.deleteAcc}>Delete Account</button>
        </div>
      )
    }
  }

  componentDidMount () {
    const userUID = localStorage[storageKey]
    console.log(userUID)
    axios({
      method: 'GET',
      url: `${this.props.backendURL}users/${userUID}`
    })
    .then((response) => {
      console.log(response.data)
      console.log('Lou was here!! :)')
      this.setState({userData: response.data})
    })
  }
}

export default ProfileMain
