import React from 'react'
import './BottomNavigation.css'

const BottomNavigation = ({ width }) => (
  <div className='bottom-nav' style={{ maxWidth: width }}>
    <ul>
      <li>Home</li>
      <li>Add</li>
      <li>tasks</li>
    </ul>
  </div>
)

export default BottomNavigation