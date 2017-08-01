import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class UserPanel extends Component {
  render() {
    return (
      <div className="UserPanel">
        <button className="UserPanel_button">
          <span className="glyphicon glyphicon-camera"></span>
        </button>
        <button className="UserPanel_button">
          <span className="glyphicon glyphicon-menu-hamburger"></span>
        </button>
        <div className="UserPanel_username">
          Nguyen Vinh
        </div>
      </div>
    );
  }
}

export default UserPanel;
