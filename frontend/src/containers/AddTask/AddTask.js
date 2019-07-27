import React from 'react'
import Button from '../../components/Button'
import request from '../../utils/request'

import Notification from '../../components/Notification'
import './addtask.css'

/**
 * Task add screen
 */
class Tasks extends React.Component {
  state = {
    form: {
      description: '',
    },
    added: false,
  }

  render () {
    return (
      <>
      <h2 className='home-feedback'>
        <span>Add a new task</span>
      </h2>
      <div className='addtask-container'>
        <form className='form' method='POST' onSubmit={this.onSubmitHandler} >
          <label className='addtask-label' htmlFor='description'>Task name</label>
          <input 
            onChange={this.onChangeHandler}
            className='addtask-input'
            type='text'
            name='description'
            placeholder='e.g: Study...'
            value={this.state.form.description}
            required
          />

          <div className='button-wrapper'>
            <Button>Save task</Button>
          </div>
        </form>
      </div>

      {this.state.added && <Notification type='success' show={this.state.added}>Task <b>{this.state.form.description}</b> has been added!</Notification>}
      </>
    )
  }

   /** handles the submit of the form when adding a new task */
   onSubmitHandler = (e) => {
    e.preventDefault()
    
    const data = {...this.state.form}

    if (data.description) {
      request('http://localhost:3001/tasks', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(data),
      })
      .then(() => this.setState({ added: true }))

      this.clearForm()
    } 
  }

  /** input onchange handler */
  onChangeHandler = (e) => {
    let { name, value } = e.target
    this.setState({ form: { [name]: value }})
  }

  clearForm = () => {
    this.setState({ form: { description: '' }, added: false, })
  }
}

export default Tasks