import React, { Component } from 'react';
import $ from 'jquery';

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
                    amount: 3.44
                },
                {
                    symbol: 'BTC',
                    rate: 'N/A',
                    amount: 0.35
                },
                {
                    symbol: 'LTC',
                    rate: 'N/A',
                    amount: 0.11
                },
                {
                    symbol: 'WAVES',
                    rate: 'N/A',
                    amount: 0.11
                }
            ]
        }      
    }

    componentWillMount(){
        // ETH rate 
        this.getURLData(0, "http://localhost:8080/trading_api_62119/v1/Ethereum/ETHRate/"); 
        // BTC rate 
        this.getURLData(1, "http://localhost:8080/trading_api_62119/v1/Bitcoin/BTCRate/");
        // LTC rate 
        this.getURLData(2, "http://localhost:8080/trading_api_62119/v1/Litecoin/LTCRate/"); 
        // Waves rate 
        this.getURLData(3, "http://localhost:8080/trading_api_62119/v1/Waves/WavesRate/");   
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
                const current_amount = rows[index].amount;
                rows[index] = {symbol: current_symbol, rate: data, amount: current_amount};
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
                    <button onClick={this.addRow.bind(this)}>Add</button>
                </div>
                &nbsp;
                <table border="1">
                    <thead>
                        <tr><th>#</th><th>&nbsp;Symbol&nbsp;</th><th>&nbsp;Rate (USD)&nbsp;</th><th>Amount</th><th>&nbsp;</th></tr>
                    </thead>
                    <tbody>
                    {
                        this.state.rows.map((item, index) => (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{this.state.rows[index].symbol}</td>
                                <td>{this.state.rows[index].rate}</td>
                                <td><input
                                    type="text"
                                    value={this.state.rows[index].amount}
                                    onChange={this.updateRow.bind(this, index)}
                                /></td>
                                <td><button onClick={this.deleteRow.bind(this, index)}>Delete</button></td>
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
