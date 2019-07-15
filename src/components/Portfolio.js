import React, { Component } from 'react';
import $ from 'jquery';
import { Button } from 'react-bootstrap';

class Portfolio extends Component {
    constructor(props) {
        super();
        this.state = {
            symbol: 'BTC',
            newsymbol: '',
            rows: [
                {
                    symbol: 'ETH',
                    rate: 'N/A',
                    address: '0xe40a4a3ebfe28dcbf5613df090fce37bceaa4ae2',
                    explorer: 'https://etherscan.io/address/',
                    amount: 3.44,
                    amount_usd: 'N/A'
                    
                },
                {
                    symbol: 'ETH',
                    rate: 'N/A',
                    address: '0xfe514985828d627a2633a32670f54a9bbb39706f',
                    explorer: 'https://etherscan.io/address/',
                    amount: 3.44,
                    amount_usd: 'N/A'
                },
                {
                    symbol: 'BTC',
                    rate: 'N/A',
                    address: '1BivL49tRZ956dU3PEs6Sqs1Yx9MLzNn7P',
                    explorer: 'https://live.blockcypher.com/btc/address/', 
                    amount: 0.35,
                    amount_usd: 'N/A'
                },
                {
                    symbol: 'LTC',
                    rate: 'N/A',
                    address: 'N/A',
                    explorer: 'https://live.blockcypher.com/ltc/address',              
                    amount: 0.11,
                    amount_usd: 'N/A'
                },
                {
                    symbol: 'WAVES',
                    rate: 'N/A',
                    explorer: 'https://wavesblockexplorer.com/address/', 
                    address: '3PCSuxn6F4pnLe4X9THYPopWhaqh86jJB6B',
                    amount: 6.06,
                    amount_usd: 'N/A'
                },
                {
                    symbol: 'USD',
                    rate: 'N/A',
                    explorer: 'N/A',
                    address: 'PayPal',
                    amount: 77.00,
                    amount_usd: 'N/A'
                }
            ]
        }      
    }

  
    componentWillMount(){
        // ETH rate 
        this.getURLData(0, "https://" + this.props.ngrok_address + ".ngrok.io/trading_api_7219/v1/Ethereum/ETHRate/");
 
        this.getURLData(1, "https://" + this.props.ngrok_address + ".ngrok.io/trading_api_7219/v1/Ethereum/ETHRate/");
     
        // BTC rate 
        this.getURLData(2, "https://" + this.props.ngrok_address + ".ngrok.io/trading_api_7219/v1/Bitcoin/BTCRate/");
     
        // LTC rate 
        this.getURLData(3, "https://" + this.props.ngrok_address + ".ngrok.io/trading_api_7219/v1/Litecoin/LTCRate/");

        // Waves rate
        this.getURLData(4, "http://18.220.221.123:8080/trading_api_7219/v1/Waves/WavesRate/");
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
                const current_amount = rows[index].amount;
                const current_amount_usd = rows[index].amount_usd;
                rows[index] = {symbol: current_symbol, rate: data, address: current_address, amount: current_amount, amount_usd: current_amount_usd};
                this.setState({ rows });
            }.bind(this),
                error: function(xhr, status, err){           
                console.log(err);
            }
        });
    }
  
    addRow () {
        const item = {symbol: this.state.newsymbol, amount: ""};
        this.setState({rows: [...this.state.rows, item]}); // "..." expands
    }

    updateAdd (e) {
        this.setState({ newsymbol: e.target.value });
    }
  
    updateRow (index, e) {
        const { name, value } = e.target;
        const rows = [...this.state.rows];
        const symbol = rows[index].symbol;
        rows[index] = {symbol: symbol, amount: value};
        this.setState({ rows });
    };

    deleteRow (index) {
        const rows = [...this.state.rows]
        rows.splice(index, 1)
        this.setState({ rows })
    }

    render() {
        return (
            <div align="center">
                <h3 align="center">Investor Portfolio: {this.props.investor}</h3>
                <div>
                    <input type="text" size="5" onChange={this.updateAdd.bind(this)}/>
                    &nbsp;&nbsp;
                    <Button onClick={this.addRow.bind(this)}>Add</Button>
                 </div>
                &nbsp;
                <table border="1">
                    <thead>
                        <tr><th>#</th><th>&nbsp;Symbol&nbsp;</th><th>&nbsp;Rate (USD)&nbsp;</th><th>Address</th><th>Amount</th><th>Amount (USD)</th><th>&nbsp;</th></tr>
                    </thead>
                    <tbody>
                    {
                        this.state.rows.map((item, index) => (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{this.state.rows[index].symbol}</td>
                                <td>{this.state.rows[index].rate}</td>
                                <td>{this.state.rows[index].address}</td>
                                <td><input
                                    type="text"
                                    value={this.state.rows[index].amount}
                                    onChange={this.updateRow.bind(this, index)}
                                /></td>
                                <td>{this.state.rows[index].amount_usd}</td>
                                <td><Button onClick={this.deleteRow.bind(this, index)}>Delete</Button></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>      
        );
    }
}  

export default Portfolio;
