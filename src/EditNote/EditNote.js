import React, { Component } from  'react';
import PropTypes from 'prop-types';
import NoteContext from '../NoteContext';
import config from '../config'
import './EditNote.css';
import { countNotesForFolder } from '../notes-helpers'

const Required = () => (
  <span className='EditNote__required'>*</span>
)

class EditNote extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static contextType = NoteContext;

  state = {
    error: null,
    id: '',
    name: '',
    date_modified: '',
    content: '',
    folder_id: '',
  };

  componentDidMount() {
    const { noteId } = this.props.match.params
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'GET',
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))

        return res.json()
      })
      .then(responseData => {
        this.setState({
          id: responseData.id,
          name: responseData.name,
          date_modified: responseData.date_modified,
          content: responseData.content,
          folder_id: responseData.folder_id,
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  handleChangeName = e => {
    this.setState({ name: e.target.value })
  };

  handleChangeContent = e => {
    this.setState({ content: e.target.value })
  };

  handleChangeDate_modified = e => {
      this.setState({ date_modified: e.target.value})
  }

  handleChangeFolder_id = e => {
    this.setState({ folder_id: e.target.value})
}

  handleSubmit = e => {
    e.preventDefault()
    const { noteId } = this.props.match.params
    const { id, name, date_modified, content, folder_id } = this.state
    const newNote = { id, name, date_modified, content, folder_id }
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'PATCH',
      body: JSON.stringify(newNote),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
        this.resetFields(newNote)
        this.context.updateNote(newNote)
        this.props.history.push('/')
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  resetFields = (newFields) => {
    this.setState({
      id: newFields.id || '',
      name: newFields.name || '',
      content: newFields.content || ''
    })
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  render() {
    const { error, name, content } = this.state
    return (
      <section className='EditNote'>
        <h2>Edit Note</h2>
        <form
          className='EditNote__form'
          onSubmit={this.handleSubmit}
        >
          <div className='EditNote__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <input
            type='hidden'
            name='id'
          />
          <div>
            <label htmlFor='name'>
              Name
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='My new note!'
              required
              value={name}
              onChange={this.handleChangeName}
            />
          </div>
          <div>
            <label htmlFor='content'>
              Content
            </label>
            <textarea
              name='content'
              id='content'
              value={content}
              onChange={this.handleChangeContent}
            />
          </div>
          <div className='EditNote__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default EditNote;