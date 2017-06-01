import React from 'react'
import {Image, Divider, Button, Header, Container, Form, TextArea} from 'semantic-ui-react'

const editState = (props) => {
  console.log('editstate props', props)
  return <Container>
    <Header as='h2' icon='heart' content='Blurb' />
    <Form id='description-form'>
      <TextArea autoHeight id='description' name='content' placeholder='Description here' defaultValue={props.data.content} />
    </Form>

    <div className='config-options'>
      <Button.Group>
        <Button positive icon='save' onClick={(e) => props.save(e)} />
        <Button.Or />
        {toggleEditButton(true, props.toggleEdit)}
      </Button.Group>
    </div>
  </Container>
}

const viewState = (props) => {
  return (
    <Container>
      <Header as='h2' icon='heart' content='Blurb' />
      <p>
        {props.data.content}
      </p>

      <div className='config-options'>
        {toggleEditButton(false, props.toggleEdit)}
      </div>
    </Container>
  )
}

const toggleEditButton = (ToF, toggleEdit) => {
  const button = ToF ? 'Back' : 'Edit'
  const buttonIcon = ToF ? 'remove' : 'wizard'

  return (
    <Button icon={buttonIcon} onClick={() => toggleEdit()} />
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
