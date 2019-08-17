import React from 'react';
import './Home.css'
import Task from '../../components/Task/Task'
class Home extends React.Component {
  render () {
    return (
      <div className='home-page'>
        <div className='home-feedback'>
          <span className='feedback__day'>Today</span>
          <span className='feedback__unfinished-tasks'>3 unfinished tasks</span>
          <span className='feedback__percentage'>68 <span>%</span></span>
        </div>
        <div className='home-todo'>
          <div className='todo-header'>
            <span>Tasks</span>
            <span style={{ color: '#999' }}>02</span>
          </div>
          <Task slug='Daily code study' done={false} />
          <Task slug='Workout' done={false} />
        </div>
        <div className='home-completed'>
          <div className='completed-header'>
            <span>Completed</span>
            <span style={{ color: '#999' }}>01</span>
          </div>
          <ul>
            <Task slug='Buy some cooffee to code' done={true} />
          </ul>
        </div>
        <button onClick={this.props.logout}>Logout</button>
      </div>
    )
  }
}

export default Home;
