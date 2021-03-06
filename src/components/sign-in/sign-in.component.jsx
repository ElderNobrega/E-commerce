import React, { useState } from 'react'
import { connect } from 'react-redux'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'

import './sign-in.styles.scss'

const SignIn = ({ emailSignInStart, googleSignInStart}) => {
  const [userCredentials, setCredentials] = useState({ email: '', password: ''})

  const { email, password } = userCredentials

  const handleSubmit = event => {
    event.preventDefault()

    emailSignInStart(email, password)
  }

  const handleChange = event => {
    const {value, name} = event.target
    setCredentials({...userCredentials, [name]: value })
  }

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput name='email' type='email' label='email' handleChange={handleChange} 
          value={email} required/>
        <FormInput name='password' type='password' label='password' value={password} 
          handleChange={handleChange} required/>
        <div className='buttons'>
          <CustomButton type='submit'>SIGN IN</CustomButton>
          <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>{' '}SIGN IN WITH GOOGLE{' '}</CustomButton>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapStateToProps)(SignIn)