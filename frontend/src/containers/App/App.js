import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from '../Home/Home'
import Addtask from '../AddTask/AddTask'
import Layout from '../../components/Layout/Layout'
import Auth from '../Auth/Auth'

class App extends React.Component {
  state = {
    nav: true,
  }

  componentDidMount () {
    // this.sendData()
  }

  disableNav = () => {
    this.setState({ nav: false })
  }

  sendData = () => {
    fetch("http://localhost:3001/tasks", {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify({ "description": "test data from frontend" }),
    })
  }

  render () {
    const { nav } = this.state

    return (
        <div className='container'>
          <BrowserRouter>
            <Layout disabled={nav}>
              <Switch>
                <Route path='/auth' render={() => <Auth disabledNav={() => this.disableNav()} />} exact/>
                <Route path='/tasks' component={Home} exact/>
                <Route path='/add' component={Addtask} exact/>
                <Route path='/settings' component={Home} exact/>
                <Route path='/account' component={Home} exact/>
                <Route path='/' component={Home} exact/>
              </Switch>
            </Layout>
          </BrowserRouter>
        </div>
    )
  }
}

export default App;
