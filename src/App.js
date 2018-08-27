import * as _ from 'lodash';
import React, { Component } from 'react';
import logo from './logo.svg';

import Main from './Components/Main';
import Sidebar from './Components/Sidebar';
const uuidv1 = require('uuid/v1');


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
