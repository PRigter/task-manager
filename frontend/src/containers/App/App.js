import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from '../Home/Home'
import Addtask from '../AddTask/AddTask'
import Layout from '../../components/Layout/Layout'
import Auth from '../Auth/Auth'
import Register from '../Auth/Register';

class App extends React.Component {
  state = {
    nav: true,
    isAuth: false,
    token: '',
  }

  // CONTENT API https://reactjs.org/docs/context.html

  disableNav = () => {
    this.setState({ nav: false })
  }

  setToken = (token) => {
    token && this.setState({ token: token, isAuth: true })
  }

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
                  <Route path='/' render={() => <Auth disabledNav={() => this.disableNav()} />} exact/>
                  </>
                }
                {
                  isAuth &&
                  <>
                  <Route path='/tasks' component={Home} exact/>
                  <Route path='/add' component={Addtask} exact/>
                  <Route path='/settings' component={Home} exact/>
                  <Route path='/account' component={Home} exact/>
                  <Route path='/' component={Home} exact/>
                  <Route component={Home} />
                  </>
                }
              </Switch>
            </Layout>
          </BrowserRouter>
        </div>
    )
  }
}

export default App;
