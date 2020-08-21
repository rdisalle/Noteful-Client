import React from 'react'

const NoteContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {},
    addFolder: () => {},
    addNote: () => {},
    updateNote: () => {},
})

export default NoteContext; 