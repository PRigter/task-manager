import React, { Component } from 'react'
import request from '../../utils/request'
import { API_URL } from '../../constants/variables'
import local from '../../utils/local_data'
import PageHeader from '../../components/PageHeader/PageHeader'
import { Link } from 'react-router-dom'
class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  render () {
    const { email, password } = this.state

    return (
      <div className='container'>
        <PageHeader color='#f64758'>
            <h1>Log in to your account</h1>
        </PageHeader>
        <form className='register-form' method='post'>
          <input
            name='email'
            type='email'
            placeholder='Email'
            onChange={this.inputChange}
            value={email}
            required />
          <input
            name='password'
            type='password'
            placeholder='Passowrd'
            onChange={this.inputChange}
            value={password} required />

          <button
            className='btn btn-main-action'
            style={{ backgroundColor:'#f64758' }}
            onClick={this.onSubmit}
          >
            Log in
          </button>
          <Link to='/'>back</Link>
        </form>
      </div>
    )
  }

  inputChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  onSubmit = (e) => {
    const { email, password } = this.state
    e.preventDefault()
    this.props.loginUser({ email: email, password: password })
  }
}

export default Login
