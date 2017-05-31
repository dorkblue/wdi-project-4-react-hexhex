import React from 'react'

const defaultLogo = 'https://firebasestorage.googleapis.com/v0/b/project-hex-hex.appspot.com/o/Alfons.png?alt=media&token=c897dfd1-882b-4792-9d7a-beb6227c1554'
const defaultProfile = 'https://firebasestorage.googleapis.com/v0/b/project-hex-hex.appspot.com/o/Veronica.png?alt=media&token=1225b650-745f-4735-8317-32a387e6d5c5'

const EditState = (props) => {
  let logo = props.data.logoURL !== '' ? props.data.logoURL : defaultLogo
  let profile = props.data.profileURL !== '' ? props.data.profileURL : defaultProfile
  return <div>
    <h1>Edit State</h1>
    <form id='profile-form'>
      <div>
        <label>
          Company Logo
        <img style={{height: '200px'}} src={logo} />
        <input type='file' onChange={(e) => props.saveLogo(e)}></input>
        </label>
      </div>
      <div>
        <label>
          Profile Pic
        <img style={{height: '200px'}} src={profile} />
        <input type='file' onChange={(e) => props.saveProfilePic(e)}></input>
        </label>
      </div>
      <div>
        <label>
        Agency
        <input type='text' name='agency' defaultValue={props.data.agency} />
        </label>
      </div>
      <div>
        <label>
        Name
        <input type='text' name='name' defaultValue={props.data.name} />
        </label>
      </div>
      <div>
        <label>
        Designation
        <input type='text' name='designation' defaultValue={props.data.designation} />
        </label>
      </div>
      <div>
        <label>
        Mobile
        <input type='text' name='mobile' defaultValue={props.data.mobile} />
        </label>
      </div>
      <div>
        <label>
        Email
        <input type='text' name='workEmail' defaultValue={props.data.workEmail} />
        </label>
      </div>
      <button onClick={props.updateProfile}>Save Edit</button>
    </form>
  </div>
}

export default EditState
