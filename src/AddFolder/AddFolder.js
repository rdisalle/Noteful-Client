import React from 'react';
import './AddFolder.css';
import config from '../config'
import NoteContext from '../NoteContext'
import PropTypes from 'prop-types';

class AddFolder extends React.Component {
    static contextType = NoteContext;

    addFolder = (title) => {
        fetch(`${config.API_ENDPOINT}/api/folders/`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({title})
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
    
      updateFolderTitle(e) {
        const newTitle = e.target.value;
          this.context.updateNewFolderTitle(newTitle);
      }

      validateFolderTitle() {
        if (this.context.newFolder.title.trim().length <= 3) {
          return 'Must be more than 3 characters.'
        }
      }

    render() {
        return(
            <form className="addFolder" onSubmit={e => this.handleSubmit(e)}>
              <h2>Add Folder</h2> 
              <div className="form-group">
                <label htmlFor="newFolder">Folder Title *</label>
                {this.context.newFolder.touched && (
                <p>{this.validateFolderTitle()}</p>
                )}  
                <input type="text" className="folder__control"
                  name="newFolder" id="newFolder" onChange={(e) => this.updateFolderTitle(e)}/>
              </div>
              <div className="folderTitle">* required field</div> 
              <div className="registration__button__group">
              <button type="submit" className="registration__button">
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