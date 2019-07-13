import React from 'react'
import BottomNavigation from '../BottomNavigation/BottomNavigation'

const Layout = ({ width, children }) => {
  
  return (
    <div>
      {children}
      <BottomNavigation width={width} />
    </div>
  )
}

export default Layout