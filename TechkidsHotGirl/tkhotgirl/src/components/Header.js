import React, { Component } from 'react';

import SearchBar from './SearchBar'
import UserPanel from './UserPanel'

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <SearchBar />
            </div>
            <div className="col-sm-6 logo">
              <img src="http://techkids.vn/images/TechkidBrandColor.png" alt="TechKids" width="180" />
              Hot Girl
            </div>
            <div className="col-sm-3">
              <UserPanel />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
