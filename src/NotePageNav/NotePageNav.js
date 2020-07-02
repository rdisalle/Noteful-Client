import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'
import NoteContext from '../NoteContext';
import { findNote, findFolder } from '../notes-helpers'

class NotePageNav extends Component {

  static contextType = NoteContext;

    render() {
      const { notes, folders } = this.context
      const { noteId } = this.props.match.params
      const note = findNote(notes, noteId) || { content: '' }
      const folder = findFolder(folders, note.folderId)
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
          {folder.name}
        </h3>
      )}
    </div>
  )
}
}

export default NotePageNav;