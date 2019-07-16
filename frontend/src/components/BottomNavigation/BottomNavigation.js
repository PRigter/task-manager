import React from 'react'
import './BottomNavigation.css'
import { NavLink } from 'react-router-dom'

import SvgIcon from '../SvgIcon/SvgIcon'

const BottomNavigation = ({ width }) => (
  <div className='bottom-nav' style={{ maxWidth: width }}>
    <ul>
      <NavLink to='/' activeClassName='navlink-active' exact={true}><SvgIcon type='calendar'/></NavLink>
      <NavLink to='/tasks' activeClassName='navlink-active'><SvgIcon type='home'/></NavLink>
      <NavLink to='/add' activeClassName='navlink-active'><SvgIcon type='add'/></NavLink>
      <NavLink to='/account' activeClassName='navlink-active'><SvgIcon type='account'/></NavLink>
      <NavLink to='/settings' activeClassName='navlink-active'><SvgIcon type='settings'/></NavLink>
    </ul>
  </div>
)

export default BottomNavigation