/* eslint-disable react/style-prop-object */
import React from 'react'
import './Task.css'

const Task = ({ slug, done }) => {

  const circleColor = done ? '#7FBF7F' : '#FFA500'

  return (
    <li className='task'>
      <svg style={{ width:'14px', height:'14px' }} viewBox="0 0 24 24">
        <path fill={circleColor} d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
      </svg>
      <p className='task-slug'>{slug}</p>
    </li>
  )
}

export default Task