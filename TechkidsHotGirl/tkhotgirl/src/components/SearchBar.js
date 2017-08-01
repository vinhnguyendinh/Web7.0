import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class SearchBar extends Component {
  render() {
    return (
      <form className="SearchBar">
        <input type="text" className="form-control" placeholder="Enter your search..." />
        <span className="glyphicon glyphicon-search"></span>
      </form>
    );
  }
}

export default SearchBar;
