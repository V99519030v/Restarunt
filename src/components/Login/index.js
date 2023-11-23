import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import {loginUrl} from '../../utils/constants'
import './index.css'

const Login = props => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [displayError, setDisplayError] = useState(false)

  const onChangeUsername = event => {
    setUserName(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitSuccess = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })

    history.replace('/')
  }

  const onSubmitFailure = errMsg => {
    setDisplayError(true)
    setErrorMsg(errMsg)
  }

  const submitForm = async event => {
    event.preventDefault()

    const userDetails = {username: userName, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const pwdIcon = showPassword ? (
    <AiFillEyeInvisible size={20} color="blue" />
  ) : (
    <AiFillEye size={20} color="blue" />
  )

  const passwordType = showPassword ? 'text' : 'password'

  const renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
        PASSWORD
      </label>
      <div className="pwd-inp-con">
        <input
          type={passwordType}
          id="password"
          className="pwd-input-field"
          value={password}
          onChange={onChangePassword}
          placeholder="Enter Password"
        />
        <button
          type="button"
          className="eye-btn"
          onClick={() => {
            setShowPassword(prev => !prev)
          }}
        >
          {pwdIcon}
        </button>
      </div>
    </>
  )

  const renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>

      <input
        type="text"
        id="username"
        className="input-field"
        value={userName}
        onChange={onChangeUsername}
        placeholder="Enter Username"
      />
    </>
  )

  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-form-container">
      <form className="form-container" onSubmit={submitForm}>
        <h1 className="mhead">UNI Resto Cafe</h1>
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
        {displayError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login
