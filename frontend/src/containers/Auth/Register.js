import React, { Component } from 'react'
import request from '../../utils/request'
import { API_URL } from '../../constants/variables'
import local from '../../utils/local_data'
import PageHeader from '../../components/PageHeader/PageHeader'
import { Link } from 'react-router-dom'
class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  render () {
    const { name, email, password, confirmPassword } = this.state

    return (
      <div className='container'>
        <PageHeader>
            <h1>Every new adventure</h1>
            <h2> starts with a new account</h2>
        </PageHeader>
        <form className='register-form' method='post'>
          <input name='name' type='text' placeholder='Name' onChange={this.inputChange} value={name} required />
          <input name='email' type='email' placeholder='Email' onChange={this.inputChange} value={email} required />
          <input name='password' type='password' placeholder='Passowrd' onChange={this.inputChange} value={password} required />
          <input name='confirmPassword' type='password' placeholder='Confirm passowrd' onChange={this.inputChange} value={confirmPassword} required />

          <button className='btn btn-main-action' onClick={this.submitHandler}>Create account</button>
          <Link to='/'>back</Link>
        </form>
      </div>
    )
  }

  inputChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  checkPasswordConfirm = () => {
    return this.state.password === this.state.confirmPassword
  }

  submitHandler = async (e) => {
    e.preventDefault()
    if (this.checkPasswordConfirm()) {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }

      const response = await request(API_URL + '/users', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(user)
      })

      if (!response.errors) {
        this.props.setToken(response.data.token)
        local.set('name', response.data.user.name)
        local.set('email', response.data.user.email)
      } else {
        console.log('ERROR on @register - check the network tab to debug it.');
      }
    }
  }

}

export default Register
