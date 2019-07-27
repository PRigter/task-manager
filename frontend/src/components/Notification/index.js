import React from 'react'

import './notification.css'

class Notification extends React.Component {
  constructor (props) {
    super(props)

    const backcolor = this.props.type === 'success' ? '#7bbb5e' : '#ff2052'

    this.state = {
      close: false,
      backcolor: backcolor,
    }
  }

  componentDidMount () {
    setTimeout( () => this.setState({ close: true }) ,3000)
  }

  componentWillUnmount () {
    //TODO: Inspect better the lifecycle to destroy it when its done
    console.log('UNMOUNTED')
  }

  render () {
    const { children } = this.props
    const { backcolor, close } = this.state

    return (
        !close && (
          <div className={!close ? 'notification' : 'close-notification'}
          style={{
            backgroundColor: backcolor,
          }}>
            {children}
          </div>
        )
      )
    }
}

export default Notification

