import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requires-login';
import FontAwesome from 'react-fontawesome';
import * as actions from '../../actions/collections';

import '../../styles/collections-modal.css'

export class CollectionsRenameModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionNameValue: '',
      errorMessage: null
      
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      collectionNameValue: event.target.value,
      errorMessage: null
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const input = this.state.collectionNameValue.trim();
    if (input !== '') {
      this.props.dispatch(actions.renameCollection(this.props.collectionId, this.state.collectionNameValue));
      this.props.onCloseModal();
    } else {
      this.setState({errorMessage: 'Collection name cannot be empty! Please include a new name for your collection.'})
    }
  }

  render() {
    return (
    <div>
      <div className="modal-div">
        <h3>Rename Collection</h3>
        <a className="modal-close-clickable" onClick={this.props.onCloseModal}>
          <FontAwesome name='times' size='2x'/>
        </a>
        <div className="modal-top-line"></div>
        <form onSubmit={this.handleSubmit}>
          <label className="collection-name-label" htmlFor="collectionNameInput">Name</label>
          <input type="text" value={this.state.collectionNameValue} onChange={this.handleChange} className="collection-name-input" id="collectionNameInput"/>
          <div className="error-message-div">{this.state.errorMessage}</div>
          <input type="submit" className="create-collection-submit" value="Rename"/>
        </form>
      </div>
      <div className="backdrop-div">
      </div>
    </div>
    )
  }
}

export default requiresLogin()(connect()(CollectionsRenameModal));