import React from 'react'
import {Link} from 'react-router-dom'

const NavMain = (props) => {
  return <nav>
    <Link to='/brochures'>
      All Brochures
    </Link>
    <div>
      <h1>Sign In</h1>
      <form id='sign_in_form'>
        <label>
          Email:{' '}
          <input type='email' placeholder='Enter Email' name='email' id='email' />
        </label>
        <label>
          Password:{' '}
          <input type='password' placeholder='Enter Password' name='password' id='password' />
        </label>
        <button onClick={(e) => props.signin(e)}>Sign In</button>
        <button onClick={(e) => props.signout(e)}>Sign Out</button>
        <button onClick={(e) => props.getUser(e)}>Get User</button>
        <button onClick={(e) => props.register(e)}>Register</button>
      </form>
    </div>
  </nav>
}

export default NavMain
