import React from 'react'
import './pageheader.css'

const PageHeader = ({ children, color }) => {
  return (
    <div className='page-header' style={{
      background: color,
    }}>
      {children}
    </div>
  )
}

export default PageHeader
