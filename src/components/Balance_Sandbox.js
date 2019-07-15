import React, { Component } from 'react';
import ModalDialogDeposit from './ModalDialog_Deposit';
import ModalDialogWithdraw from './ModalDialog_Withdraw';
import { Button } from 'react-bootstrap';
import $ from 'jquery';

class BalanceSandbox extends Component {
    constructor(props) {
        super();
        this.state = {
            modalShow: false,
            modalWithdrawShow: false,
            symbol: 'BTC',
            newsymbol: '',
            rows: [
                {
                    symbol: 'ETH',
                    address: 'N/A',
                    explorer: 'N/A',                    
                    balance: 'N/A'
                },
                {
                    symbol: 'BTC',
                    address: '2N6V12gcR2XaFGFMGK7qeNTjqcxo3wAzWdp',
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
                }
           ]
        }      
    }

    componentWillMount(){     
        // BTC 
        this.getURLData(1, "https://" + this.props.ngrok_address + ".ngrok.io/trading_api_7219/v1/Bitcoin/Testnet/Balance/2N6V12gcR2XaFGFMGK7qeNTjqcxo3wAzWdp");

        // Waves rate
        this.getURLData(3, "https://" + this.props.ngrok_address + ".ngrok.io/trading_api_63019/v1/Waves/Testnet/Balance/3N12JNDNAYNE2dRSGbxK3UQXfVJnXaMwiYT");
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
        let modalClose = () => this.setState({ modalShow: false });  
        let modalWithdrawClose = () => this.setState({ modalWithdrawShow: false });       
        return (            
            <div align="center">                
                <h3 align="center">Investor Sandbox Balance: {this.props.investor}</h3>
                <table border="1">
                <thead>
                        <tr><th>#</th><th>&nbsp;Symbol&nbsp;</th><th>&nbsp;Address&nbsp;</th><th>Balance</th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th></tr>
                    </thead>
                    <tbody>
                    {
                        this.state.rows.map((item, index) => (
                            <tr key={index}>
                                <td>{index}</td> 
                                <td>{this.state.rows[index].symbol}</td>                               
                                {
                                    this.state.rows[index].symbol == 'ETH'  &&
                                    <td>{this.state.rows[index].address}</td>
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
                                <td>{this.state.rows[index].balance}</td>
                                <td><Button onClick={()=>this.setState({ modalShow: true })}>Deposit</Button></td>
                                <td><Button onClick={()=>this.setState({ modalWithdrawShow: true })}>Withdraw</Button></td>
                                <td><Button>Delete</Button></td>
                            </tr>
                        ))
                    }
                    </tbody>                    
                </table>
                <ModalDialogDeposit show={this.state.modalShow} onHide={modalClose}/>
                <ModalDialogWithdraw show={this.state.modalWithdrawShow} onHide={modalWithdrawClose}/> 
            </div>      
        );
    }
}  

export default BalanceSandbox;
