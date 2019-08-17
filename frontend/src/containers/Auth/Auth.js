import React from 'react'
import LOGO_IMG from '../../assets/icons/auth_logo.svg'
import { Link } from 'react-router-dom'

class Auth extends React.Component {
  componentDidMount () {
    this.props.disabledNav()
  }

  render () {
    return (
        <div className='container auth'>
          <div className='auth_draw'>
            <img src={LOGO_IMG} alt='auth logo'/>
          </div>
          <h2>Accomplish more with less.<br />
             <span style={{ color: '#f64758', fontWeight: 'bolder', fontSize: '22px' }}>Kata-do</span></h2>
          <div className='btn-list'>
            <Link to='/register'><button className='btn btn-main-action' >Sign up</button></Link>
            <Link to='/login'><button className='btn btn-secondary-action'>Login</button></Link>
          </div>
        </div>
    )
  }
}

export default Auth
