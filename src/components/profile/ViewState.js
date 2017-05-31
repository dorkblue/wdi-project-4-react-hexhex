import React from 'react'

const defaultLogo = 'https://firebasestorage.googleapis.com/v0/b/project-hex-hex.appspot.com/o/Alfons.png?alt=media&token=c897dfd1-882b-4792-9d7a-beb6227c1554'
const defaultProfile = 'https://firebasestorage.googleapis.com/v0/b/project-hex-hex.appspot.com/o/Veronica.png?alt=media&token=1225b650-745f-4735-8317-32a387e6d5c5'

const ViewState = (props) => {
  console.log('view state', props)
  let logo = props.data.logoURL !== '' ? props.data.logoURL : defaultLogo
  let profile = props.data.profileURL !== '' ? props.data.profileURL : defaultProfile
  return <div>
    <h1>View State</h1>

    <dl>
      <dt>Company Logo</dt>
      <dd><img style={{height: '200px'}}src={logo} /></dd>
    </dl>
    <dl>
      <dt>Profile Pic</dt>
      <dd><img style={{height: '200px'}}src={profile} /></dd>
    </dl>
    <dl>
      <dt>Agency</dt>
      <dd>{props.data.agency === '' ? 'EMPTY' : props.data.agency}</dd>
    </dl>
    <dl>
      <dt>Name</dt>
      <dd>{props.data.name === '' ? 'EMPTY' : props.data.name}</dd>
    </dl>
    <dl>
      <dt>Designation</dt>
      <dd>{props.data.designation === '' ? 'EMPTY' : props.data.designation}</dd>
    </dl>
    <dl>
      <dt>Mobile</dt>
      <dd>{props.data.mobile === '' ? 'EMPTY' : props.data.mobile}</dd>
    </dl>
    <dl>
      <dt>Email</dt>
      <dd>{props.data.workEmail === '' ? 'EMPTY' : props.data.workEmail}</dd>
    </dl>
  </div>
}

export default ViewState
