import React, { Component } from 'react';
import Portfolio from './components/Portfolio';
import './App.css';

class App extends Component {
  constructor(){
    super();
      this.state = {
        investor: 'Pele'
      }
  }

  render() {
    return (
      <div className="App">
      <Portfolio investor={this.state.investor} />
      </div>
    );
  }
}

export default App;
