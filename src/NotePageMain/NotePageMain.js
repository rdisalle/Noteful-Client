import React, { Component } from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import NoteContext from '../NoteContext';
import { findNote } from '../notes-helpers'
import PropTypes from 'prop-types'

class NotePageMain extends Component {
  static defaultProps = {
    notes: [],
  };

  static contextType = NoteContext;
  
  render() {
    const { notes } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }

  return (
    <section className='NotePageMain'>
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
      />
      <div className='NotePageMain__content'>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}
}

NotePageMain.propTypes = {
  match: PropTypes.object
};

export default NotePageMain;
