import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../Home/Home'
import Layout from '../../components/Layout/Layout'

class App extends React.Component {
  componentDidMount () {
    this.sendData()
  }


  sendData = () => {
    // fetch("http://localhost:3001/tasks", {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   method: "POST",
    //   body: JSON.stringify({ "description": "test data from frontend" }),
    // })
  }

  render () {
    return (
      
        <div className='container'>
          <BrowserRouter>
            <Layout>
              <Switch>
                <Route path='/tasks' component={Home} exact/>
                <Route path='/add' component={Home} exact/>
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
