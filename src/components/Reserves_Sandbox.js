import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import $ from 'jquery';
import {endpoints_base} from './Data';

class ReservesSandbox extends Component {
    constructor(props) {
        super();
        this.state = {
            symbol: 'BTC',
            newsymbol: '',
            rows: [
                {
                    symbol: 'ETH',
                    address: '0x0d6f2055eedae95ccd888661aa5e3c05c1aeb64d',
                    explorer: 'https://ropsten.etherscan.io/address/',
                    balance: 'N/A'
                },
                {
                    symbol: 'BTC',
                    address: 'mzYNYmN5n344UQpY9y3rTGMjRjCmet69Hg',
                    explorer: 'https://live.blockcypher.com/btc-testnet/address/',
                    balance: 0.0
                },
                {
                    symbol: 'LTC',
                    address: 'N/A',
                    explorer: 'N/A',
                    balance: 'N/A'
                },  
                {
                    symbol: 'WAVES',
                    address: '3MyCTgnHJ5vHdto2gEt1NGatXz17nds11cd',
                    explorer: 'https://wavesexplorer.com/testnet/address/',
                    balance: 0.0
                },
                {
                    symbol: 'USD',
                    address: 'PayPal',
                    explorer: 'N/A',
                    balance: 'N/A'
                },
                {
                    symbol: 'HKD',
                    address: 'PayPal',
                    explorer: 'N/A',
                    balance: 'N/A'
                } 
           ]
        }      
    }

    componentWillMount(){
        // ETC balance 
        this.getURLData(0, endpoints_base + "/v1/Ethereum/Testnet/Balance/0x0d6f2055eedae95ccd888661aa5e3c05c1aeb64d");

        // BTC balance 
        this.getURLData(1, endpoints_base + "/v1/Bitcoin/Testnet/Balance/mzYNYmN5n344UQpY9y3rTGMjRjCmet69Hg");

        // WAVES balance 
        this.getURLData(3, endpoints_base + "/v1/Waves/Testnet/Balance/3MyCTgnHJ5vHdto2gEt1NGatXz17nds11cd");
    }
    
     getURLData(index, URL){
        $.ajax({
            url: URL, 
            dataType: 'json',
            contentType: 'json',
            cache: false,
            success: function(data){       
                const rows = [...this.state.rows];
                const current_symbol = rows[index].symbol;
                const current_address = rows[index].address;
                const current_explorer = rows[index].explorer;
                const current_balance = rows[index].balance;
                rows[index] = {symbol: current_symbol, address: current_address, explorer: current_explorer, balance: data};
                this.setState({ rows });
           }.bind(this),
                error: function(xhr, status, err){           
                console.log(err);
           }
       });
    }

    render() {
        return (
            <div align="center">
                <h3 align="center">Reserves Sandbox</h3>
                <table border="1"> 
                 <thead>
                    <tr><th>#</th><th>&nbsp;Symbol&nbsp;</th><th>&nbsp;Address&nbsp;</th><th>Balance</th><th>&nbsp;</th></tr>
                    </thead>
                    <tbody>                    
                    {                                           
                        this.state.rows.map((item, index) => (
                            <tr key={index}>
                                <td>{index}</td>                                  
                                <td>{this.state.rows[index].symbol}</td>
                                {
                                    this.state.rows[index].symbol == 'ETH'  &&                                    
                                    <td><a href={this.state.rows[index].explorer + this.state.rows[index].address}>{this.state.rows[index].address}</a></td>                                    
                                }
                                {
                                    this.state.rows[index].symbol == 'BTC' &&
                                    <td><a href={this.state.rows[index].explorer + this.state.rows[index].address}>{this.state.rows[index].address}</a></td>
                                }
                                {
                                    this.state.rows[index].symbol == 'LTC'  &&
                                    <td>{this.state.rows[index].address}</td>
                                } 
                                {
                                    this.state.rows[index].symbol == 'WAVES' &&
                                    <td><a href={this.state.rows[index].explorer + this.state.rows[index].address}>{this.state.rows[index].address}</a></td>
                                }
                                {
                                    this.state.rows[index].symbol == 'USD'  &&
                                    <td>{this.state.rows[index].address}</td>    
                                }   
                                {
                                    this.state.rows[index].symbol == 'HKD'  &&
                                    <td>{this.state.rows[index].address}</td>
                                } 
                                {
                                    this.state.rows[index].symbol == 'ETH' &&
                                    /* 1 ETH = 1 000 000 000 000 000 000 WEI (18 zeros) */                              
                                    <td>{this.state.rows[index].balance / 1000000000000000000} ({this.state.rows[index].balance} <b>wei</b>)</td>
                                } 
                                {
                                    this.state.rows[index].symbol == 'BTC' &&
                                    <td>{this.state.rows[index].balance / 100000000} ({this.state.rows[index].balance} <b>satoshi</b>)</td>
                                } 
                                {
                                    this.state.rows[index].symbol == 'LTC' &&
                                    <td>{this.state.rows[index].balance}</td>
                                }
                                {
                                    this.state.rows[index].symbol == 'WAVES' &&
                                    <td>{this.state.rows[index].balance / 100000000} ({this.state.rows[index].balance} <b>units</b>)</td>
                                }
                                {
                                    this.state.rows[index].symbol == 'USD' &&
                                    <td>{this.state.rows[index].balance}</td>
                                } 
                                {
                                    this.state.rows[index].symbol == 'HKD' &&
                                    <td>{this.state.rows[index].balance}</td>
                                }  
                                <td><Button>Delete</Button></td>
                            </tr>
                        ))
                    }
                    </tbody>                    
                  </table>
            </div>      
        );
    }
}  

export default ReservesSandbox;
