import React, { Component } from 'react';

class Portfolio extends Component {
    constructor(props) {
        super();
        this.state = {
            symbol: 'BTC',
            newsymbol: '',
            rows: [
                {
                    symbol: 'ETH',
                    amount: 3.44
                },
                {
                    symbol: 'BTC',
                    amount: 0.35
                }
            ]
        }      
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
                        <tr><th>#</th><th>&nbsp;Symbol&nbsp;</th><th>Amount</th><th>&nbsp;</th></tr>
                    </thead>
                    <tbody>
                    {
                        this.state.rows.map((item, index) => (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{this.state.rows[index].symbol}</td>
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
