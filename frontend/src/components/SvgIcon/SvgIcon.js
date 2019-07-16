import React from 'react'

/*
 * add here the import for new icons
 *  and add in the switch statement
*/
import calendar from '../../assets/icons/calendar.svg'
import plus from '../../assets/icons/plus.svg'
import list from '../../assets/icons/list.svg'
import circle from '../../assets/icons/circle.svg'
import account from '../../assets/icons/account.svg'
import settings from '../../assets/icons/settings.svg'

/**
* SVG icon component, pass type to generate the desired icon 
* @param {'plus'|'calendar'|'list'|'circle'|'account'|'settings'} type 
**/
const SvgIcon = ({ type }) => {
  
  switch(type) {
    case 'calendar':
      return <img src={calendar} className='svgicon' alt={`${type} icon`} />
    case 'add':
      return <img src={plus} className='svgicon' alt={`${type} icon`} />
    case 'home':
      return <img src={list} className='svgicon' alt={`${type} icon`} />
    case 'account':
      return <img src={account} className='svgicon' alt={`${type} icon`} />
    case 'settings':
      return <img src={settings} className='svgicon' alt={`${type} icon`} />
    default:
      return <img src={circle} className='svgicon' alt={`${type} icon`} />
  } 
}

export default SvgIcon