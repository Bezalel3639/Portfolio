import React, { Component } from 'react';
import $ from 'jquery';
import { Button } from 'react-bootstrap';
import {endpoints_base} from './Data';

class Portfolio extends Component {
    constructor(props) {
        super();
        this.state = {
            newsymbol: '',
            rows: []
        }      
    }
  
    componentWillMount(){
         this.getMongoDBData(endpoints_base + "/v1/BackOffice/GetAssets/" + this.props.investor);
    }

    updateRate(index, asset) {
        if (asset == 'BTC') {
            this.getURLRateData(index, endpoints_base + "/v1/Bitcoin/BTCRate/");
         } else if (asset == 'LTC') {
            this.getURLRateData(index, endpoints_base + "/v1/Litecoin/LTCRate/");
        } else if (asset == 'ETH') {
            this.getURLRateData(index, endpoints_base + "/v1/Ethereum/ETHRate/");
        } else if (asset == 'WAVES') {
             this.getURLRateData(index, endpoints_base + "/v1/Waves/WavesRate/");  
        } else {
            console.log ("Currency is fiat");
        }
    }

    updateAmount(index, asset, address) {
        if (asset == 'BTC') {
            URL = endpoints_base + "/v1/Bitcoin/Balance/" + address; 
            this.getURLBalanceData(index, URL);
        } else if (asset == 'LTC') {
            URL = endpoints_base + "/v1/Litecoin/Balance/" + address;
            //this.getURLBalanceData(index, URL); 
        } else if (asset == 'ETH') {
            URL = endpoints_base + "/v1/Ethereum/Balance/" + address;
            this.getURLBalanceData(index, URL);
        } else if (asset == 'WAVES') {
            URL = endpoints_base + "/v1/Waves/Balance/" + address;
            this.getURLBalanceData(index, URL); 
        } else if (asset == 'USD' && address == 'ePay') {
            URL = endpoints_base + "/v1/FiatSolutions/GetBalance/malevany%40gmail.com/USD";
            this.getURLBalanceData(index, URL); 
        } else if (asset == 'HKD' && address == 'ePay') {
            URL = endpoints_base + "/v1/FiatSolutions/GetBalance/malevany%40gmail.com/USD";
            this.getURLBalanceData(index, URL); 
        } else {
            console.log ("Currency is fiat");
        }
    }

    getURLRateData(index, URL){
        $.ajax({
            url: URL, 
            dataType: 'json',
            contentType: 'json',
            cache: false,
            success: function(data){               
                const rows = [...this.state.rows];  
                const current_symbol = rows[index].name;                
                const current_address = rows[index].address;
                const current_explorer = rows[index].explorer;
                const current_amount = rows[index].amount;
                rows[index] = {name: current_symbol, rate: Number(data).toFixed(2), address: current_address, explorer: current_explorer, amount: current_amount};
                this.setState({ rows });
            }.bind(this),
                error: function(xhr, status, err){           
                console.log(err);
            }
        });
    }

    getURLBalanceData(index, URL){
        $.ajax({
            url: URL, 
            dataType: 'json',
            contentType: 'json',
            cache: false,
            success: function(data){          
                const rows = [...this.state.rows];  
                const current_symbol = rows[index].name;
                const current_rate = rows[index].rate;                 
                const current_address = rows[index].address;
                const current_explorer = rows[index].explorer;
                rows[index] = {name: current_symbol, rate: current_rate, address: current_address, explorer: current_explorer, amount: data};
                this.setState({ rows });
            }.bind(this),
                error: function(xhr, status, err){           
                console.log(err);
            }
        });
    }

    getCryptoAssetExplorer(asset) {
        if (asset == 'BTC') {
            return "https://live.blockcypher.com/btc/address/"; 
        } else if (asset == 'LTC') {
            return "https://live.blockcypher.com/ltc/address/";
        } else if (asset == 'ETH') {
            return "https://etherscan.io/address/";
        } else if (asset == 'WAVES') {
            return "https://wavesblockexplorer.com/address/";
        } else {
            return "Cryptosymbol is not found";
        }         
    }

    isShowLink(asset) {
        if (asset == 'BTC' || asset == 'ETH' || asset == 'WAVES') {
            return true; 
        } else {
            return false;
        }
        return false;
    }

    isCrypto(asset) {
        if (asset == 'BTC' || asset == 'ETH' || asset == 'WAVES') {
            return true; 
        } else {
            return false;
        }
        return false;
    }

    getUnits(asset) {
        var units = new Object();
        if (asset == 'BTC') {
            units.name = "Satoshi";
            units.base = 100000000;
        } else if (asset == 'ETH') {
            units.name = "Wei";
            units.base = 1000000000000000000; // 1 ETH = 1 000 000 000 000 000 000 WEI (18 zeros)
        } else if (asset == 'WAVES') {
            units.name = "Waves base units";
            units.base = 100000000; 
        } else {
            return null;
        }
        return units;
    }

    getMongoDBData(URL) {
        $.ajax({
            url: URL, 
            dataType: 'json',
            contentType: 'json',
            cache: false,
            success: function(data) {
                this.populateTable(data);             
            }.bind(this),
                error: function(xhr, status, err){           
                console.log(err);
            }
        });
    }

    populateTable(data) {
        var data_update = new Array();

        // Modify array of objects to include rate, amount, and block explorer.        
        var element1 = {rate: 'N/A'};
        var element2 = {amount: 'N/A'};
        for (let i = 0; i < data.length; i++) {
            var obj = data[i];
            var element3 = {explorer: this.getCryptoAssetExplorer(data[i].name)};
            const returnedTarget = Object.assign(obj, element1, element2, element3);
            data_update[i] = returnedTarget;
        }

        this.setState({ rows: data_update });
        
        // Update rates from endpoints
        for (let i = 0; i < data.length; i++) {
            this.updateRate(i, data[i].name);
        }

        // Update amounts from endpoints
        for (let i = 0; i < data.length; i++) {
            this.updateAmount(i, data[i].name, data[i].address);
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
                &nbsp;
                <table border="1">
                    <thead align="center">
                        <tr><th>#</th><th>&nbsp;Symbol&nbsp;</th><th>&nbsp;Rate (USD)&nbsp;</th><th>&nbsp;Address&nbsp;</th><th>&nbsp;Balance&nbsp;</th><th>&nbsp;Balance (USD)&nbsp;</th><th>&nbsp;</th></tr>
                    </thead>
                    <tbody>
                    {
                        this.state.rows.map((item, index) => (
                            this.state.rows[index].address != 'PayPal' &&  // show row conditionally                         
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{this.state.rows[index].name}</td>
                                <td>{this.state.rows[index].rate}</td>  
                                {
                                    this.isShowLink(this.state.rows[index].name) ? (
                                        <td><a href={this.state.rows[index].explorer + this.state.rows[index].address}>{this.state.rows[index].address}</a></td>
                                    ) : (
                                        <td>{this.state.rows[index].address != 'ePay' ? this.state.rows[index].address : 'Gateway' }</td>   
                                    )
                                }
                                {
                                        this.isCrypto(this.state.rows[index].name) ? (
                                        <td title={this.state.rows[index].amount + " (" + this.getUnits(this.state.rows[index].name).name + ")"}>{Number(this.state.rows[index].amount / this.getUnits(this.state.rows[index].name).base).toFixed(5)}</td>
                                        ) : (
                                        <td>{this.state.rows[index].amount != 'N/A' ? this.state.rows[index].amount.toFixed(2) : 'N/A'}</td>
                                    ) 
                                }
                                {                                    
                                    this.isCrypto(this.state.rows[index].name) ? (
                                        <td>{Number((this.state.rows[index].amount / this.getUnits(this.state.rows[index].name).base)*this.state.rows[index].rate).toFixed(2)}</td>
                                        ) : (
                                        <td>0</td>
                                    )       
                                }
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
