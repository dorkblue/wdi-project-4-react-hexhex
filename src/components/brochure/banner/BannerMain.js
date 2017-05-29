import React from 'react'

const editState = (props) => {
  return <div>
    <h4>
      Banner Edit Mode
    </h4>
    <div id='banner_image'>
      <img src={props.data.url} />
    </div>
    <label>
      <input type='file' id='banner_upload' onChange={(e) => props.saveBanner(e)} />
    </label>

    {toggleEditButton(true, props.toggleEdit)}
  </div>
}

const viewState = (props) => {
  return <div>
    <h4>
      Banner View Mode
    </h4>
    <div id='banner_image'>
      <img src={props.data.url} />
    </div>
    {toggleEditButton(false, props.toggleEdit)}
  </div>
}

const toggleEditButton = (ToF, toggleEdit) => {
  const button = ToF ? 'Back' : 'Edit'

  return <button onClick={() => toggleEdit()}>{button}</button>
}

const BannerMain = (props) => {
  if (props.edit) {
    return editState(props)
  } else {
    return viewState(props)
  }
}

export default BannerMain
