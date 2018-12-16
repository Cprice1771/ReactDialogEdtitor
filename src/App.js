import React, { Component } from 'react';
import Main from './Components/Main';
import Sidebar from './Components/Sidebar';


class App extends Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="app">
      <Sidebar />
       <Main />
      </div>
    );
  }
}

export default App;
