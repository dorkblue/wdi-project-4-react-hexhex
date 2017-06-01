import React from 'react'

const editState = (props) => {
  console.log('editstate props', props)
  return <div>
    <h4>
      Details Edit Mode
    </h4>
    <form id='details-form'>
      <label>Price:
        <input class='details' name='price' placeholder='$$$$' defaultValue={props.data.price}></input>
      </label><br />
      <label>Address:
        <input class='details' name='address' placeholder='Address' defaultValue={props.data.address}></input>
      </label><br />
      <label>Bedrooms:
        <input class='details' name='bedrooms' placeholder='Bedrooms' defaultValue={props.data.bedrooms}></input>
      </label><br />
      <label>Bathrooms:
        <input class='details' name='bathrooms' placeholder='Bathrooms' defaultValue={props.data.bathrooms}></input>
      </label><br />
      <label>Floor Size:
        <input class='details' name='floorSize' placeholder='Sqft' defaultValue={props.data.floorSize}></input>
      </label><br />
      <label>Tenure:
        <input class='details' name='tenure' placeholder='Freehold' defaultValue={props.data.tenure}></input>
      </label><br />
      <label>Developer:
        <input class='details' name='developer' placeholder='Name of Developer' defaultValue={props.data.developer}></input>
      </label><br />
      <label>TOP:
        <input class='details' name='top' placeholder='TOP Year' defaultValue={props.data.top}></input>
      </label><br />
      <label>Facilities:
        <input class='details' name='facilities' placeholder='Tennis Court, Swimming Pool' defaultValue={props.data.facilities}></input>
      </label><br />
      <button onClick={(e) => props.save(e)}>Save</button>
    </form>

    {toggleEditButton(true, props.toggleEdit)}
  </div>
}

const viewState = (props) => {
  return <div>
    <h4>
      Details View Mode
    </h4>

    <p>
      Price: {props.data.price} <br />
      Address: {props.data.address} <br />
      Bedrooms: {props.data.bedrooms} <br />
      Bathrooms: {props.data.bathrooms} <br />
      Floor Size: {props.data.floorSize} <br />
      Tenure: {props.data.tenure} <br />
      Developer: {props.data.developer} <br />
      TOP: {props.data.top} <br />
      Facilities: {props.data.facilities} <br />
    </p>
    {toggleEditButton(false, props.toggleEdit)}
  </div>
}

const toggleEditButton = (ToF, toggleEdit) => {
  const button = ToF ? 'Back' : 'Edit'

  return <button onClick={() => toggleEdit()}>{button}</button>
}

const DetailsMain = (props) => {
  console.log('details props', props)
  if (props.edit) {
    return editState(props)
  } else {
    return viewState(props)
  }
}

export default DetailsMain
