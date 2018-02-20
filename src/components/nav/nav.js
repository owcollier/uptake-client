import React from 'react';
import {connect} from 'react-redux';

import NavHeader from './nav-header';

import '../../styles/nav.css';

export class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nav-bar">
        <NavHeader />
        {this.props.loggedIn &&
          <div className="nav-components">
            <NavLinks />
            <NavUser />
          </div>
        }
      </div>
    )};
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Nav);