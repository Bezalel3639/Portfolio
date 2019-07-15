import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import Portfolio from './components/Portfolio';
import BalanceSandbox from './components/Balance_Sandbox';
import ReservesSandbox from './components/Reserves_Sandbox';
import FeeStructureSandbox from './components/FeeStructure_Sandbox';
import Exchange from './components/Exchange';
import {Router, Route, Link} from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
    constructor(){
        super();
        this.state = {
            investor: 'Pele'
        }       
    }
  
    render() {
        var address = "f27366b7"; // set ngrok address here
        
        return (            
            <div className="App">
                <Exchange />
                &nbsp;    
                <Portfolio investor={this.state.investor} ngrok_address={address} />
                &nbsp;
                <BalanceSandbox investor={this.state.investor} ngrok_address={address} />
                &nbsp;
                <ReservesSandbox ngrok_address={address} /> 
                &nbsp;
                <FeeStructureSandbox />                         
            </div>
        );
    }  
 }

ReactDOM.render(<App />, document.getElementById('portfolio'));