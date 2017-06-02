import React from 'react'

const defaultLogo = 'https://firebasestorage.googleapis.com/v0/b/project-hex-hex.appspot.com/o/Alfons.png?alt=media&token=c897dfd1-882b-4792-9d7a-beb6227c1554'
const defaultProfile = 'https://firebasestorage.googleapis.com/v0/b/project-hex-hex.appspot.com/o/Veronica.png?alt=media&token=1225b650-745f-4735-8317-32a387e6d5c5'

const ViewState = (props) => {
  let logo = props.data.logoURL !== '' ? props.data.logoURL : defaultLogo
  let profile = props.data.profileURL !== '' ? props.data.profileURL : defaultProfile
  return <div>
    <dl>
      <dt><h2>Company Logo</h2></dt>
      <dd><img style={{height: '200px'}}src={logo} /></dd>
    </dl>
    <dl>
      <dt><h2>Profile Picture</h2></dt>
      <dd><img style={{height: '200px'}}src={profile} /></dd>
    </dl>
    <dl id="personalInfo">
      <dt>Agency</dt><br />
      <dd>{props.data.agency === '' ? 'Fill In Agency Name' : props.data.agency}</dd>
    </dl>
    <dl id="personalInfo">
      <dt>Name</dt><br />
      <dd>{props.data.name === '' ? 'Fill In Name' : props.data.name}</dd>
    </dl>
    <dl id="personalInfo">
      <dt>Designation</dt><br />
      <dd>{props.data.designation === '' ? 'Fill In Designation' : props.data.designation}</dd>
    </dl>
    <dl id="personalInfo">
      <dt>Mobile</dt><br />
      <dd>{props.data.mobile === '' ? 'Fill In Mobile Number' : props.data.mobile}</dd>
    </dl>
    <dl id="personalInfo">
      <dt>Email</dt><br />
      <dd>{props.data.workEmail === '' ? 'Fill In Email' : props.data.workEmail}</dd>
    </dl>
  </div>
}

export default ViewState
