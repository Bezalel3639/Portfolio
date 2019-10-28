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
import { Alert } from 'react-bootstrap';

export default class App extends Component {
    constructor(){
        super();
        this.state = {
            investor: 'Pele',
            message: "",
            investor_data: [],
            investor_data_sandbox: []
        } 
        
        this.callbackFunction = this.callbackFunction.bind(this);
        this.callbackFunction_userBalanceSandbox = this.callbackFunction_userBalanceSandbox.bind(this);
    } 

    callbackFunction (rows) {
        this.setState({ investor_data: rows });
    }

    callbackFunction_userBalanceSandbox (rows) {
        this.setState({ investor_data_sandbox: rows });   
    }

    render() {
        var address = "f27366b7"; // set ngrok address here
        
        return (            
            <div className="App">
                <Exchange investor_data={this.state.investor_data} investor_data_sandbox={this.state.investor_data_sandbox}/>
                &nbsp;    
                <Portfolio investor={this.state.investor} dataCallback = {this.callbackFunction} ngrok_address={address} />
                &nbsp;
                <BalanceSandbox investor={this.state.investor} dataCallback_userBalanceSandbox = {this.callbackFunction_userBalanceSandbox} ngrok_address={address} />
                &nbsp;
                <ReservesSandbox ngrok_address={address} /> 
                &nbsp;
                <FeeStructureSandbox />                         
            </div>
        );
    }  
 }

ReactDOM.render(<App />, document.getElementById('portfolio'));