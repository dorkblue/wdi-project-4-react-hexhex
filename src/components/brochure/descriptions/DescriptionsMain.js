import React from 'react'
import {Image, Divider, Button} from 'semantic-ui-react'

const editState = (props) => {
  console.log('editstate props', props)
  return <div style={{width: '45%'}}>
    <h4>
      Description Edit Mode
    </h4>
    <form id='description-form'>
      <label>Description:
        <textarea id='description' name='content' placeholder='Description here' defaultValue={props.data.content}></textarea>
      </label>
      <button onClick={(e) => props.save(e)}>Save</button>
    </form>

    {toggleEditButton(true, props.toggleEdit)}
  </div>
}

const viewState = (props) => {
  return <div>
    <h2>
      Blurb
    </h2>
    <p>
      {props.data.content}
    </p>
    {toggleEditButton(false, props.toggleEdit)}
  </div>
}

const toggleEditButton = (ToF, toggleEdit) => {
  const button = ToF ? 'Back' : 'Edit'
  const buttonIcon = ToF ? 'chevron left' : 'wizard'

  return (
    <div className='config-options'>
      <Button circular icon={buttonIcon} onClick={() => toggleEdit()} />
    </div>
  )
}

const DescriptionsMain = (props) => {
  if (props.edit) {
    return editState(props)
  } else {
    return viewState(props)
  }
}

export default DescriptionsMain
