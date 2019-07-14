import React from 'react'
import BottomNavigation from '../BottomNavigation/BottomNavigation'

class Layout extends React.Component {
  state = {
    width: 0,
  }

  windowMaxWidth = 600;

  componentDidMount = () => {
    // initial screen width
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount= () => {
      window.removeEventListener("resize", this.updateDimensions);
  }

  render () {
    const { width } = this.state

    return (
      <div style={{ maxWidth: `${this.windowMaxWidth}px`, margin: 'auto', height: '100vh' }}>
        <div style={{ overflowY: 'scroll', height: '100vh', marginBottom: '60px' }}>
          {this.props.children}
        </div>
        <BottomNavigation width={width} />
      </div>
    )
  }

  /** updates the dimentions of the screen width to state */
  updateDimensions = () => {
    if (window.innerWidth <= this.windowMaxWidth) {
      this.setState({ width: window.innerWidth })
    } else {
      this.setState({ width: 600 })
    }
  }
}

export default Layout