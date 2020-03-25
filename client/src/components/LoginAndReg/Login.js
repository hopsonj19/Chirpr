import React, { useState } from 'react'
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { withCookies, useCookies } from 'react-cookie'
import { compose } from 'recompose'
import { connect } from 'react-redux'

// import action creator
import { login } from '../../actions';
import LoaderButton from '../Buttons/LoaderButton'
import AlertMessage from '../AlertMessage/AlertMessage'

const Login = (props) => {
  const [cookies, setCookie] = useCookies();
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = React.useState(false);
  const [msg, setMsg] = React.useState('');

  function validateForm (props) {
    return email.length > 0 && password.length > 5
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    props.login(email, password);

    // setIsLoading(true)
    // try {
    //   // call api
    //   const res = await axios({
    //     method: 'post',
    //     url: 'http://localhost:8000/api/signin',
    //     data: {
    //       email,
    //       password
    //     }
    //   });
      
    //   if (res.status === 200) {
    //     const expireDate = new Date()
    //     expireDate.setMinutes(expireDate.getMinutes() + 119)
    //     setCookie('x-auth-token', res.data.token, { path: '/', expires:  expireDate })
  
    //     if (res.data.hasProfile) {
    //       // parse info here and create dummy profile info
    //       props.history.push('/feed')
    //     } else {
    //       props.history.push('/create-profile')
    //     }
    //   }
    //   else {
    //     setEmail('')
    //     setPassword('')
    //     setMsg(`Status: ${res.status}. Could not sign in! Try refreshing page.`)
    //     setError(true)
    //   }
    // } catch (err) {
    //   if (err.response.status === 400) {
    //     setMsg(`${err.response.data.error}.`)
    //     setError(true)
    //     setIsLoading(false)
    //   }
    //   else {
    //     setMsg(`${err.message}. Could not sign in! Try refreshing page.`)
    //     setError(true)
    //     setIsLoading(false)
    //   }
    // }
  }
  
  return (
    <div className='AuthPage'>
      <form onSubmit={handleSubmit}>
        <AlertMessage
          success={success}
          error={error}
          msg={msg}
          setSuccess={setSuccess}
          setError={setError}
          setMsg={setMsg}
        />
        <FormGroup controlId='email' bsSize='large'>
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId='password' bsSize='large'>
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
          />
        </FormGroup>
        <LoaderButton block type='submit' bsSize='large' isLoading={isLoading} disabled={!validateForm()}>
            Login
        </LoaderButton>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state);
  return { auth: state.auth };
}

export default withRouter(connect(mapStateToProps, { login })(Login))
