import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteContext from '../NoteContext'
import config from '../config'
import './Note.css'
import PropTypes from 'prop-types'

export default class Note extends React.Component {
  static defaultProps = {
    name: ''
  }
 
  static contextType = NoteContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id;

    fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return
      })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.delete()
        // allow parent to perform extra behavior
        //this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, id, date_modified } = this.props
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/notes/${id}`}> 
            {name}
          </Link>
        </h2>
        <Link to={`/edit/${id}`}>Edit Note</Link>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(date_modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

Note.propTypes = {
  id: PropTypes.number,
  onDeleteNote: PropTypes.func,
  name: PropTypes.string.isRequired,
  date_modified: PropTypes.string
};