import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import NoteContext from '../NoteContext'
import config from '../config'
import './App.css'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import EditNote from '../EditNote/EditNote'

class App extends Component {
  state = {
    notes: [],
    folders: [],
    newFolder: {
      hasError: false,
      touched: false,
      title: '',
    },
    newNote: {
      name: {
        touched: false,
        value: '',
      },
      folder_id: {
        touched: false,
        value: '',
      },
      content: {
        touched: false,
        value: '',
      },
    },
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes/`), 
      fetch(`${config.API_ENDPOINT}/folders`), 
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok) return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([notesRes.json(), foldersRes.json()])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  updateNewFolderTitle = title => {
    this.setState({
      newFolder: {
        hasError: false,
        touched: true,
        title: title,
      },
    })
  }

  updateNewNoteData = (input, value) => {
    this.setState({
      newNote: {
          ...this.state.newNote,
        [input]: {
          touched: true,
          value: value,
        },
      },
    })
  }

  handleAddFolder = newFolder => {
    this.setState({
      folders: [...this.state.folders, newFolder],
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note],
    })
  }

  handleDeleteNote = noteId => {
    console.log('Firing!')
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId),
    })
  }

  updateNote = updatedNote => {
    this.setState({
      notes: this.state.notes.map(note =>
        (note.id !== updatedNote.id) ? note : updatedNote
      )
    })
  }

  renderNavRoutes() {
    return (
      <>
        <Route path="/notes/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
        {['/', '/folders/:folderId'].map(path => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        <Route path="/notes/:noteId" component={NotePageMain} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
        <Route path="/edit/:noteId" component={EditNote} />
        {['/', '/folders/:folderId'].map(path => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
      </>
    )
  }

  render() {
    console.log(this.state);
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      newFolder: this.state.newFolder,
      updateNewFolderTitle: this.updateNewFolderTitle,
      newNote: this.state.newNote,
      handleAddNote: this.handleAddNote,
      updateNewNoteData: this.updateNewNoteData,
      updateNote: this.updateNote,
    }
    return (
      <NoteContext.Provider value={value}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{' '}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </NoteContext.Provider>
    )
  }
}

export default App;