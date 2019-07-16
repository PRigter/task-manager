import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../Home/Home'
import Layout from '../../components/Layout/Layout'

class App extends React.Component {
  // componentDidMount () {
  //   const user = {
  //     name: 'Tiago Ferreira',
  //     email: 'thatsnotan@email.com',
  //     password: '123123123',
  //     age: 20,
  //   }
  //   fetch('http://localhost:3001/users',{
  //     method: 'POST',
  //     body: user,
  //   } )
  // }

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
