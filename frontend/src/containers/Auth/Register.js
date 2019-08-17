import React, { Component } from 'react'
import request from '../../utils/request'

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
        <h2>Create a new account</h2>
        <form className='register-form' method='post'>
          <input name='name' type='text' placeholder='Name' onChange={this.inputChange} value={name} required />
          <input name='email' type='email' placeholder='Email' onChange={this.inputChange} value={email} required />
          <input name='password' type='password' placeholder='Passowrd' onChange={this.inputChange} value={password} required />
          <input name='confirmPassword' type='password' placeholder='Confirm passowrd' onChange={this.inputChange} value={confirmPassword} required />

          <button className='btn btn-main-action' onClick={this.submitHandler}>Create account</button>
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
      console.log('inside');
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }

      const response = await request('http://localhost:3001/users', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(user)
      })

      if (!response.errors) {
        console.log(response);
        this.props.setToken(response.data.token)
      } else {
        console.log('ERROR on @register - check the network tab to debug it.');
      }
    }
  }

}

export default Register
