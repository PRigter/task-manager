import React from 'react'

class Auth extends React.Component {
  componentDidMount () {
    this.props.disabledNav()
  }

  getMotivationalQuotes = () => {
    const quotes = [
    'Boost your motivation with our app',
    'Whats keeping you from achieving your dreams ?',
    'Get your taks done with our application',
    'Did you know that the most succesfull people track their tasks.',
    'Stop forgetting about your chores and join us',
    ]
    const rand = Math.floor(Math.random() * (quotes.length -1))

    return quotes[rand]
  }

  render () {
    return (
        <div className='container auth'>
          <h2>{this.getMotivationalQuotes()}</h2>
          <div className='btn-list'>
            <button className='btn btn-main-action'>Sign in</button>
            <button className='btn btn-secondary-action'>Login</button>
          </div>
        </div>
    )
  }
}

export default Auth
