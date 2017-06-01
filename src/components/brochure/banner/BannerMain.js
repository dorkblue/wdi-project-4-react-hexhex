import React from 'react'
import {Image, Divider, Button, Input} from 'semantic-ui-react'

const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/project-hex-hex.appspot.com/o/Alfons.png?alt=media&token=c897dfd1-882b-4792-9d7a-beb6227c1554'

const returnImage = (props) => {
  console.log('return image', props.data)
  let bannerImage
  if (props.data.url !== '') {
    bannerImage = props.data.url
  } else {
    bannerImage = defaultImage
  }
  console.log('BannerMain', bannerImage)
  return bannerImage
}

const editState = (props) => {
  return <div>
    <div id='banner_image'>
      <Image src={returnImage(props)} fluid />
    </div>

    <div className='config-options'>
      <Input action={toggleEditButton(true, props.toggleEdit)} type='file' id='banner_upload' onChange={(e) => props.saveBanner(e)} />
    </div>
  </div>
}

const viewState = (props) => {
  return <div>
    <div id='banner_image'>
      <Image src={returnImage(props)} fluid />
      {/* <img src={returnImage(props)} /> */}
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

const BannerMain = (props) => {
  if (props.edit) {
    return editState(props)
  } else {
    return viewState(props)
  }
}

export default BannerMain
