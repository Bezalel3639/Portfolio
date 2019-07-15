import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Exchange extends Component {
    constructor(props) {
        super();
    }      

    render() {
        return (
            <div align="center">
            <h3 align="center">Sandbox Exchange</h3>
            <select>
                <option>Buy</option>
                <option>Sell</option>
            </select>&nbsp;
            <input type="text" size="5" value="1" />&nbsp;
            <select>
                <option>ETH</option>
                <option>BTC</option>
                <option>LTC</option>
                <option>WAVES</option>
            </select>
            &nbsp;for&nbsp; 
            <input type="text" size="5" />&nbsp;
            <select>
                <option>ETH</option>
                <option>BTC</option>
                <option>LTC</option>
                <option>WAVES</option>
            </select>&nbsp; 
            <Button>Estimate</Button>&nbsp;    
            <Button>Execute</Button>     
            </div>     
        );
    }
} 

export default Exchange;