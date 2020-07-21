import React from 'react';
import './AddFolder.css';
import config from '../config'
import NoteContext from '../NoteContext'
import PropTypes from 'prop-types';

class AddFolder extends React.Component {
    static contextType = NoteContext;

    addFolder = (name) => {
        fetch(`${config.API_ENDPOINT}/folders/`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({name})
          }
        )
        .then(resp => resp.json())
        .then(data => this.context.addFolder(data))
        .catch(error => {
            console.error({ error })
            return "There was an error with the request. Try again later."
          })
      }

    
      handleSubmit(event) {
        event.preventDefault();
        const newFolder = event.target.newFolder.value;
        this.addFolder(newFolder);
        this.props.history.goBack();
      }
    
      updateFolderName(e) {
        const newName = e.target.value;
          this.context.updateNewFolderName(newName);
      }

      validateFolderName() {
        if (this.context.newFolder.name.trim().length <= 3) {
          return 'Must be more than 3 characters.'
        }
      }

    render() {
        return(
            <form className="addFolder" onSubmit={e => this.handleSubmit(e)}>
              <h2>Add Folder</h2> 
              <div className="form-group">
                <label htmlFor="newFolder">Folder Name *</label>
                {this.context.newFolder.touched && (
                <p>{this.validateFolderName()}</p>
                )}  
                <input type="text" className="folder__control"
                  name="newFolder" id="newFolder" onChange={(e) => this.updateFolderName(e)}/>
              </div>
              <div className="folderName">* required field</div> 
              <div className="registration__button__group">
              <button type="submit" className="registration__button" 
              disabled={
                this.validateFolderName()
              }>
                   Add Folder!
               </button>
              </div>
            </form>
        )
    }
}

AddFolder.propTypes = {
        history: PropTypes.object
  };

export default AddFolder;