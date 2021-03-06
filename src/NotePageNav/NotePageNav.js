import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'
import NoteContext from '../NoteContext';
import { findNote, findFolder } from '../notes-helpers'
import PropTypes from 'prop-types' 

class NotePageNav extends Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }

  static contextType = NoteContext;

    render() {
      const { notes, folders } = this.context
      const { noteId } = this.props.match.params
      const note = findNote(notes, noteId) || { content: '' }
      const folder = findFolder(folders, note.folder_id)
  return (
    <div className='NotePageNav'>
      <CircleButton
        tag='button'
        role='link'
        onClick={() => this.props.history.goBack()}
        className='NotePageNav__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>
      {folder && (
        <h3 className='NotePageNav__folder-name'>
          {folder.title}
        </h3>
      )}
    </div>
  )
}
}

NotePageNav.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
};

export default NotePageNav;

