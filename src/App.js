import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Portfolio from './components/Portfolio'

export default class App extends Component {
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

ReactDOM.render(<App />, document.getElementById('portfolio'));