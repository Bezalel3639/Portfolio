import React, { Component } from 'react';
import $ from 'jquery';

class FeeStructureSandbox extends Component {
    constructor(props) {
        super();
        this.state = {
             rows: [
                {
                    symbol: 'ETH',
                    side: 'sell',
                    countersymbol: 'WAVES',
                    marketrate: 'N/A',
                    fee: '%12', // percent
                },
                {
                    symbol: 'ETH',
                    side: 'buy',
                    countersymbol: 'WAVES',
                    marketrate: 'N/A',
                    fee: '%15', // percent
               }
            ]
        }      
    }
 
    render() {
        return (
            <div align="center">
                <h3 align="center">Fee Structure Sandbox</h3>
                <table border="1">
                    <tbody>
                    {
                        this.state.rows.map((item, index) => (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{this.state.rows[index].symbol}</td>
                                <td>{this.state.rows[index].side}</td>
                                <td>{this.state.rows[index].countersymbol}</td>
                                <td>{this.state.rows[index].marketrate}</td>
                                <td><input type="text"/></td>
                                <td>{this.state.rows[index].fee}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>      
        );
    }
}  

export default FeeStructureSandbox;
