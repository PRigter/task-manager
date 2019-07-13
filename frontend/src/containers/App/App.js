import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../Home/Home'
import Layout from '../../components/Layout/Layout'

class App extends React.Component {
  
  state = {
    width: 0,
  }

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

  componentDidMount () {
    console.log(window.innerWidth)
    this.setState({ width: window.innerWidth })
  }

  updateDimensions = () => {
    console.log(window.innerWidth)
    this.setState({ width: window.innerWidth })
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount= () => {
      window.removeEventListener("resize", this.updateDimensions);
  }

  render () {
    return (
      <Layout width={this.state.width}>
        <div className='container'>
          <BrowserRouter>
            <Switch>
            <Route path='/tasks' component={Home} />
            <Route path='/' component={Home} />
            </Switch>
          </BrowserRouter>
        </div>
      </Layout>
    )
  }
}

export default App;
