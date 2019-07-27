import React from 'react'

import './Button.css'

const Button = ({ children, }) => {
  return (
    <button className='primary-button'>
      {children}
    </button>
  )
}

export default Button