import React from 'react'
import {Image, Divider, Button, Input} from 'semantic-ui-react'

const placeholderImage = 'https://firebasestorage.googleapis.com/v0/b/project-hex-hex.appspot.com/o/-KlRmlFCYmNeImpuVAnN--KlRmlFCYmNeImpuVAnM?alt=media&token=c2bbcc53-fed2-4dbc-98e4-de095e4d99b0'

const returnImage = (props) => {
  let pictureImage2
  if (props.data.url && props.data.url !== '') {
    pictureImage2 = props.data.url
  } else {
    pictureImage2 = placeholderImage
  }
  return pictureImage2
}

const editState = (props) => {
  return <div>
    <div id='picture_image2'>
      <Image src={returnImage(props)} fluid />
    </div>

    <div className='config-options'>
      <Input action={toggleEditButton(true, props.toggleEdit)} type='file' id='picture_upload2' onChange={(e) => props.savePicture2(e)} />
    </div>
  </div>
}

const viewState = (props) => {
  return <div>
    <div id='picture_image2'>
      <Image src={returnImage(props)} fluid />
    </div>

    <div className='config-options'>
      {toggleEditButton(false, props.toggleEdit)}
    </div>
  </div>

}

const toggleEditButton = (ToF, toggleEdit) => {
  const button = ToF ? 'Back' : 'Edit'
  const buttonIcon = ToF ? 'remove' : 'wizard'

  return (
      <Button icon={buttonIcon} onClick={() => toggleEdit()} />
  )
}

const Picture2 = (props) => {
  if (props.edit) {
    return editState(props)
  } else {
    return viewState(props)
  }
}

export default Picture2
