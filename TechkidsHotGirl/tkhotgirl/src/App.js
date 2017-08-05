import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/Header';
import Body from './components/Body';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchString : ''
    }

    this.updateSearchString = this.updateSearchString.bind(this);
  }

  updateSearchString(newSearchString) {
    this.setState({
      searchString : newSearchString
    });
  }

  render() {
    return (
      <div className="App">
        <Header searchFunction={this.updateSearchString}/>
        <Body searchString={this.state.searchString}/>
      </div>
    );
  }
}

export default App;
