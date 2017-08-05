import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class SearchBar extends Component {
  onInputValueChanged(event) {
    this.props.searchFunction(event.target.value);
  }
  render() {
    return (
      <form className="SearchBar">
        <input type="text" onChange={this.onInputValueChanged.bind(this)} className="form-control" placeholder="Enter your search..." />
        <span className="glyphicon glyphicon-search"></span>
      </form>
    );
  }
}

export default SearchBar;
