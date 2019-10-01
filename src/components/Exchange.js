import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import $ from 'jquery';
import './Styles.css';
import {endpoints_base} from './Data';

class Exchange extends Component {
    constructor(props) {
        super();
        this.state = {
            ticker: 'Please select assets for exchange',
            give_value: '',
            get_value: '',
            isfixed_give: true,
            selected_pair: '',
            execute_disabled: true
        } 
    } 
    
    handleSelect1() {       
        if (options1.value != 'Select asset' && options2.value != 'Select asset') {

            // Validate if different currencies are selected
            if (options1.value == options2.value) {
                this.setState({ ticker : "The currencies should be different!" }); 
                return;
            }

            var baseURL = endpoints_base + "/v1/Exchange/Testnet/GetPairQuote/";
            if (this.isGiveBaseAsset(options1.value, options2.value)) {
                // BUY
                var URL = baseURL + "BUY/" + options1.value + "/1/" + options2.value;
            } else {
                // SELL
                var URL = baseURL + "SELL/" + options1.value + "/1/" + options2.value;
            } 

            this.getRate(URL);
        }
    }

    handleSelect2() { 

        if (options1.value != 'Select asset' && options2.value != 'Select asset') { 
            
            // Validate if different currencies are selected
            if (options1.value == options2.value) {
                this.setState({ ticker : "The currencies should be different!" }); 
                return;
            }

            var baseURL = endpoints_base + "/v1/Exchange/Testnet/GetPairQuote/";   
            if (this.isGiveBaseAsset(options1.value, options2.value)) {
                // BUY
                var URL = baseURL + "BUY/" + options1.value + "/1/" + options2.value;
            } else {
                // SELL
                var URL = baseURL + "SELL/" + options1.value + "/1/" + options2.value;
            }
            
            this.getRate(URL);
        }    
    }

    // The input is uneditable without onChange handler
    updateInput1 (e) {
        this.setState({ give_value: e.target.value, isfixed_give: true });
    }

    // The input is uneditable without onChange  
    updateInput2 (e) {
         this.setState({ get_value: e.target.value, isfixed_give: false });
    }
    
    getRate(URL) { 
        $.ajax({
            url: URL, 
            dataType: 'json',
            contentType: 'json',
            cache: false,
            success: function(data){ 
                console.log("dada");
                var ratedata = "1 " + options1.value + " is " + data + " " + options2.value;
                this.setState({ ticker : ratedata }); 
            }.bind(this),
                error: function(xhr, status, err){           
                console.log(err);
            }
        });
    }

    getQuote() {
        if (options1.value != 'Select asset' && options2.value != 'Select asset') {
            
            // Validate that pair should be different
            if (options1.value == options2.value) {
                alert ("Wrong selection!");
                return;
            }
            
            // Validate if the pair is supported
            if (!((options1.value == "ETH" && options2.value == "WAVES") || (options1.value == "WAVES" && options2.value == "ETH"))) {
                alert ("The trading pair is not supported at the moment");
                return;
            }

            var baseURL = endpoints_base + "/v1/Exchange/Testnet/GetPairQuote/";    
    
            if (this.isGiveBaseAsset(options1.value, options2.value)) {
                // BUY
                if (this.state.isfixed_give) {
                    // Validate give value: must be numeric, positive, and not zero
                    if (isNaN(this.state.give_value)) {
                        alert ("The amount to give must be a numerical value!")
                        return;
                    }
                    if (this.state.give_value <= 0) {
                        alert ("The amount to give must be greater than zero!") 
                        return;
                    } 

                    var URL = baseURL + "BUY/" + options1.value + "/" + this.state.give_value + "/" + options2.value;
                    this.getURLData(URL, true); 
                 } else {
                    // TODO: this scenario  
                }
            } else {
                // SELL
                if (this.state.isfixed_give) {
                    var URL = baseURL + "SELL/" + options2.value + "/1/" + options1.value;
                    this.getURLData(URL, true); 
                } else {
                    var URL = baseURL + "SELL/" + options2.value + "/" + this.state.get_value + "/" + options1.value;
                    this.setState({ selected_pair : "ETH_WAVES_SELL_FIXEDBASETRUE" });
                    this.getURLData(URL, false);                      
                }
            }
        }
    }
    
    getURLData(URL, fixedgive) {        
        $.ajax({
            url: URL, 
            dataType: 'json',
            contentType: 'json',
            cache: false,
            success: function(data) {     

                if (fixedgive) {                   
                     this.setState({ get_value : this.state.give_value/data });
                }
                else {
                     this.setState({ give_value : data });
                }

                // Enable Execute button
                this.setState({ execute_disabled: false }); 
            }.bind(this),
                error: function(xhr, status, err){           
                console.log(err);
            }
        });
    }
 
    // When pair is selected one of assets is base, and the other is quote asset by
    // by this convention. 
    isGiveBaseAsset(asset_give, asset_get) {

        if (asset_give == "ETH" && asset_get == "BTC")
            return false;
        else if (asset_give == "ETH" && asset_get == "LTC")
            return false;
        else if (asset_give == "ETH" && asset_get == "WAVES")
            return true;

        if (asset_give == "BTC" && asset_get == "ETH")
            return true;
        else if (asset_give == "BTC" && asset_get == "LTC")
            return true;
        else if (asset_give == "BTC" && assetl_get == "WAVES")
            return true;

        if (asset_give == "LTC" && asset_get == "ETH")
            return true;
        else if (asset_give == "LTC" && asset_get == "BTC")
            return false;
        else if (asset_give == "LTC" && assetl_get == "WAVES")
            return true;

        if (asset_give == "WAVES" && asset_get == "ETH")
            return false;
        else if (asset_give == "WAVES" && asset_get == "BTC")
            return false;
        else if (asset_give == "WAVES" && assetl_get == "LTC")
            return false;
    }

    executeTrade() {

        var trading_pair = "ETH_WAVES_SELL_FIXEDBASETRUE";

        var baseURL = endpoints_base + "/v1/Exchange/Testnet/Exchange_ETH2WAVES/";
        var exchangeURL = null;
        var userETH_address = "0x8d8057d0810996077effe2283ef5788178a91e61";
        var userWAVES_address = "3MqnoW5aY4x2eiwmM4ee1VjWwuJEvKnffj8";
        var fixedbaseamount = "true"; 

        switch (trading_pair) {
            case "ETH_WAVES_BUY_FIXEDBASETRUE":
                break;
            case "ETH_WAVES_BUY_FIXEDBASEFALSE":
                break;
            case "ETH_WAVES_SELL_FIXEDBASETRUE": // focus
                exchangeURL = baseURL + "SELL/" + this.state.get_value + "/" + userETH_address +   
                    "/" + userWAVES_address + "/" + fixedbaseamount;
                break;
            case "ETH_WAVES_SELL_FIXEDBASEFALSE":
                break;
        }

        // Run exchange
        this.exchangeTradingPair(exchangeURL) ; 
        this.setState({ selected_pair : '' });       
    }

    exchangeTradingPair(URL) { 
        $.ajax({
            url: URL, 
            dataType: 'json',
            contentType: 'json',
            cache: false,
            success: function(data){ 
                console.log(data);
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
            &nbsp;You give: &nbsp; 
            <input type="text" size="12" value="1" value={this.state.give_value} onChange={this.updateInput1.bind(this)}/>&nbsp;
            <select id="options1" onChange={this.handleSelect1.bind(this)}>
                <option>Select asset</option>
                <option>ETH</option>
                <option>BTC</option>
                <option>LTC</option>
                <option>WAVES</option>
            </select>
            &nbsp; You want: &nbsp; 
            <input type="text" size="12" value={this.state.get_value} onChange={this.updateInput2.bind(this)}/>&nbsp;
            <select id="options2" onChange={this.handleSelect2.bind(this)}>
                <option>Select asset</option>
                <option>ETH</option>
                <option>BTC</option>
                <option>LTC</option>
                <option>WAVES</option>
            </select>&nbsp; 
            <Button onClick={this.getQuote.bind(this)}>Estimate</Button>&nbsp;    
            <Button disabled={this.state.execute_disabled} onClick={this.executeTrade.bind(this)}>Execute</Button>
            <div>{<br></br>}</div>
            <div>
                <input type="text" readOnly className="no-border" size="50" id="rateinfo" value={this.state.ticker}></input> 
            </div>
            </div>     
        );
    }
} 

export default Exchange;