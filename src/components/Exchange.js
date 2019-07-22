import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import $ from 'jquery';
import './Styles.css';

class Exchange extends Component {
    constructor(props) {
        super();
        this.state = {
            ticker: 'Please select assets for exchange',
            quote_buy: '',
            quote_sell: ''
        } 
    }     

    handleSelect1() {
        alert (options1.value);    
    }

    handleSelect2() {       
        if (options2.value != 'Select asset' && options3.value != 'Select asset') {
            var baseURL = "http://18.218.13.159:8080/trading_api_71819/v1/Exchange/Testnet/getPairQuote/";            
            var URL = baseURL + options1.value + "/" + options3.value + "/1/" + options2.value;
            this.getRate(URL);
        }
    }

    handleSelect3() {
        if (options2.value != 'Select asset' && options3.value != 'Select asset') {
            var baseURL = "http://18.218.13.159:8080/trading_api_71819/v1/Exchange/Testnet/getPairQuote/";            
            var URL = baseURL + options1.value + "/" + options3.value + "/1/" + options2.value;
            this.getRate(URL);
        }    
    }

    getRate(URL) { 
        $.ajax({
            url: URL, 
            dataType: 'json',
            contentType: 'json',
            cache: false,
            success: function(data){ 
                console.log("dada");
                var ratedata = "1 " + options2.value + " is " + data + " " + options3.value;
                this.setState({ ticker : ratedata }); 
            }.bind(this),
                error: function(xhr, status, err){           
                console.log(err);
            }
        });
    }

    getQuote() {
        this.getURLData("http://18.218.13.159:8080/trading_api_71819/v1/Exchange/Testnet/getPairQuote/Buy/WAVES/1/BTC");
    }  
 
    getURLData(URL) {        
        $.ajax({
            url: URL, 
            dataType: 'json',
            contentType: 'json',
            cache: false,
            success: function(data) {     
                this.setState({ quote_buy : '' });
                this.setState({ quote_sell : '' });   
                if (options1.value == 'Buy') {                   
                    this.setState({ quote_buy : data });
                }
                else if (options1.value == 'Sell') {
                    this.setState({ quote_sell : data });
                }
            }.bind(this),
                error: function(xhr, status, err){           
                console.log(err);
            }
        });
    }

    render() {
        return (
            <div align="center">
            <h3 align="center">Sandbox Exchange</h3>
            <select id="options1" onChange={this.handleSelect1.bind(this)}>
                <option>Buy</option>
                <option>Sell</option>
            </select>&nbsp;
            <input type="text" size="5" value="1" value={this.state.quote_buy}/>&nbsp;
            <select id="options2" onChange={this.handleSelect2.bind(this)}>
                <option>Select asset</option>
                <option>ETH</option>
                <option>BTC</option>
                <option>LTC</option>
                <option>WAVES</option>
            </select>
            &nbsp;for&nbsp; 
            <input type="text" size="5" value={this.state.quote_sell}/>&nbsp;
            <select id="options3" onChange={this.handleSelect3.bind(this)}>
                <option>Select asset</option>
                <option>ETH</option>
                <option>BTC</option>
                <option>LTC</option>
                <option>WAVES</option>
            </select>&nbsp; 
            <Button onClick={this.getQuote.bind(this)}>Estimate</Button>&nbsp;    
            <Button>Execute</Button>
            <div>{<br></br>}</div>
            <div>
                <input type="text" className="no-border" size="50" id="rateinfo" value={this.state.ticker}></input> 
            </div>
            </div>     
        );
    }
} 

export default Exchange;