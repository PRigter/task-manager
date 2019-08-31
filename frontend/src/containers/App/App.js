import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Home from '../Home/Home'
import Addtask from '../AddTask/AddTask'
import Layout from '../../components/Layout/Layout'
import Auth from '../Auth/Auth'
import Register from '../Auth/Register'
import Login from '../Auth/Login'
import local from '../../utils/local_data'
import request from '../../utils/request'
import { API_URL } from '../../constants/variables'

class App extends React.Component {
  state = {
    nav: true,
    isAuth: false,
    token: '',
    loggedUser: null,
  }

  componentDidMount () {
    // Auto login
    const token = local.get('token')
    if (token) {
      //TODO: this.loginUser(token)
    }
  }

  // TODO: CONTENT API https://reactjs.org/docs/context.html

  render () {
    const { nav, isAuth } = this.state

    return (
        <div className='container'>
          <BrowserRouter>
            <Layout disabled={isAuth && nav}>
              <Switch>
                {
                  !isAuth &&
                  <>
                  <Route path='/register' render={() => <Register setToken={this.setToken} />} exact/>
                  <Route path='/login' render={() => <Login loginUser={this.loginUser} />} exact/>
                  <Route path='/' render={() => <Auth disabledNav={() => this.disableNav()} />} exact/>
                  </>
                }
                {
                  isAuth &&
                  <>
                  <Route path='/tasks' render={ () => <Home logout={this.logoutUser} />} exact/>
                  <Route path='/add' component={Addtask} exact/>
                  <Route path='/settings' render={ () => <Home logout={this.logoutUser} />} exact/>
                  <Route path='/account' render={ () => <Home logout={this.logoutUser} />} exact/>
                  <Route path='/' render={ () => <Home logout={this.logoutUser} />} exact/>
                  </>
                }
              </Switch>
            </Layout>
          </BrowserRouter>
        </div>
    )
  }

  disableNav = () => {
    this.setState({ nav: false })
  }

  /** use this method for setting auth token for predictable results */
  setToken = (token) => {
    token && this.setState({ token: token, isAuth: true }, () => {
      // set token to local storage
      local.set('token', token)
    })
  }

  loginUser = async ({ email, password }) => {
    const response = await request(`${API_URL}/users/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email: email, password: password })
    })

    if (!response.errors) {
      this.setToken(response.data.token)
      this.setState({ loggedUser: response.data.user })
    } else {
      console.log('ERROR on @login - check the network tab to debug it.');
    }
  }

  logoutUser = () => {
    const updateduser = this.state.loggedUser
    updateduser.tokens = []
    updateduser.tokens.push(this.state.token)
    this.setState({ loggedUser: updateduser }, console.log(this.state.loggedUser))

    const response = request(`${API_URL}/users/logout`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ user: this.state.loggedUser })
    })

    if (!response.errors) {
      local.clear('token')
      this.setState({ loggedUser: null })
    } else {
      console.log('ERROR on @logout - check the network tab to debug it.');
    }
  }

  /** TODO - helper method for the auto login functionlaity */
  getUserDataFromLocal = () => {
    return {
      name: local.get('name'),
      email: local.get('email'),
    }
  }

}

export default App;
