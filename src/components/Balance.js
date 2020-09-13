import React, { Component } from 'react';
import ModalDialogDeposit from './ModalDialog_Deposit';
import ModalDialogDepositFromPayPal from './ModalDialog_DepositFromPayPal';
import ModalDialogWithdraw from './ModalDialog_Withdraw';
import ModalDialogWithdrawFromFintechGateway from './ModalDialog_WithdrawFromFintechGateway';
import { Button } from 'react-bootstrap';
import $ from 'jquery';
import { endpoints_base } from './Data';

class Balance extends Component {
    constructor(props) {
        super();
        this.state = {
            modalDepositShow: false,
            modalDepositFromPayPalShow: false,
            modalWithdrawShow: false,
            modalWithdrawFromFintechGatewayShow: false,
            selectedData: {}, 
            rows: [],
            currentRow: '',
            currentSymbol: ''       
        }
        
        this.callback_balanceUpdate = this.callback_balanceUpdate.bind(this);
    }

    componentWillMount(){
        this.getMongoDBData(endpoints_base + "/v1/BackOffice/GetBalancesAssets/" + this.props.investor);     
    }

    callback_balanceUpdate(data) {
        var balance = parseFloat(data.replace(",", "."));
        const rows = [...this.state.rows];  
        const current_symbol = rows[this.state.currentRow].name;
        const current_address = rows[this.state.currentRow].address;
        const current_explorer = rows[this.state.currentRow].explorer;
        rows[this.state.currentRow] = {name: current_symbol, address: current_address, explorer: current_explorer, amount: balance} ; // 45.55};
        this.setState({ rows });
    }
    
    getMongoDBData(URL) {
        $.ajax({
            url: URL, 
            dataType: 'json',
            contentType: 'json',
            cache: false,
            success: function(data) {
                console.log("getMongoDBData> :", data);
                this.populateTable(data); 
            }.bind(this),
                error: function(xhr, status, err){           
                console.log(err);
            }
        });
    }

    populateTable(data) {
        var data_update = new Array();

        // Modify array of objects to include amount, and block explorer        
        var element1 = {amount: 'N/A'};
        for (let i = 0; i < data.length; i++) {
            var obj = data[i];
            var element2 = {explorer: this.getCryptoAssetExplorer(data[i].name)};
            const returnedTarget = Object.assign(obj, element1, element2);
            data_update[i] = returnedTarget;
        }

        this.setState({ rows: data_update });    

        // Update amounts from endpoints
        for (let i = 0; i < data.length; i++) {
            this.updateAmount(i, data[i].name, data[i].address);
        }
    }

    updateAmount(index, asset, address) {
        if (asset == 'BTC') {
            URL = endpoints_base + "/v1/Bitcoin/Balance/" + address; 
            this.getURLBalanceData(index, URL);
        }  else if (asset == 'LTC') {
            URL = endpoints_base + "/v1/Litecoin/Balance/" + address; 
            this.getURLBalanceData(index, URL);
        } else if (asset == 'ETH') {
            URL = endpoints_base + "/v1/Ethereum/Blockcypher/Balance/" + address;
            this.getURLBalanceData(index, URL);
        } else if (asset == 'WAVES') {
            URL = endpoints_base + "/v1/Waves/Balance/" + address;
            this.getURLBalanceData(index, URL); 
        } else if (asset == 'RUB') {
            URL = endpoints_base + "/v1/PayPal/GetCustomerBalance/" + this.props.investor + "/" + "RUB";
            this.getURLBalanceData(index, URL); 
            console.log ("updateAmount> Currency: " + asset + ", address: " + address);
        }  else if (asset == 'USD') {            
            URL = endpoints_base + "/v1/PayPal/GetCustomerBalance/" + this.props.investor + "/" + "USD";
            this.getURLBalanceData(index, URL); 
            console.log ("updateAmount> Currency: " + asset + ", address: " + address);
        }  else if (asset == 'HKD') {
            URL = endpoints_base + "/v1/PayPal/GetCustomerBalance/" + this.props.investor + "/" + "HKD";
            this.getURLBalanceData(index, URL); 
            console.log ("updateAmount> Currency: " + asset + ", address: " + address);
        } else {
            console.log ("Currency is fiat");
        }
    }

    getURLBalanceData(index, URL){
        $.ajax({
            url: URL, 
            dataType: 'json',
            contentType: 'json',
            cache: false,
            success: function(data){ 
                console.log("getURLBalanceData> :", data);         
                const rows = [...this.state.rows];  
                const current_symbol = rows[index].name;
                const current_address = rows[index].address;
                const current_explorer = rows[index].explorer;
                rows[index] = {name: current_symbol, address: current_address, explorer: current_explorer, amount: data};
                this.setState({ rows });

                // Pass rows to parent
                const {dataCallback_userBalanceSandbox} = this.props; 
                dataCallback_userBalanceSandbox(rows);
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
        if (asset == 'BTC' || asset == 'LTC' || asset == 'ETH' || asset == 'WAVES') {
            return true; 
        } else {
            return false;
        }
        return false;
    }

    isCrypto(asset) {
        if (asset == 'BTC' || asset == 'LTC' || asset == 'ETH' || asset == 'WAVES') {
            return true; 
        } else {
            return false;
        }
        return false;
    }

    getUnits(asset) {
        console.log("getUnits>", asset)
        var units = new Object();
        if (asset == 'BTC') {
            units.name = "Satoshi";
            units.base = 100000000;
        } else if (asset == 'LTC') {
            units.name = "Microlitecoins"; // "Photons"
            units.base = 1000000; 
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

    handlerButtonWithdrawClick(object) {
        this.setState({ selectedData: object })
        this.setState({ modalWithdrawShow: true })        
    }
  
    render() { 
        let modalDepositClose = () => this.setState({ modalDepositShow: false });  
        let modalDepositFromPayPalClose = () => this.setState({ modalDepositFromPayPalShow: false }); 
        let modalWithdrawClose = () => this.setState({ modalWithdrawShow: false });
        let modalWithdrawFromFintechGatewayClose = () => this.setState({ modalWithdrawFromFintechGatewayShow: false });
        return (            
            <div align="center">                
                <h3 align="center">User Balances: {this.props.investor != '' ? this.props.investor : "Investor is NOT DEFINED"}</h3>
                <table border="1">
                    <thead>
                        <tr align="center"><th className='hidden'>#</th><th>&nbsp;Symbol&nbsp;</th><th>&nbsp;Address&nbsp;</th><th>Balance</th><th>&nbsp;</th><th>&nbsp;</th></tr>
                    </thead>
                    <tbody>
                    {
                        this.state.rows.map((item, index) => (                            
                            <tr key={index}>
                                { /* Row number column */ }
                                <td className='hidden'>{index}</td>                                 
                                { /* Asset column */ }
                                <td>{this.state.rows[index].name}</td>
                                { /* Address column */ }
                                {
                                    this.isShowLink(this.state.rows[index].name) ? (
                                        <td><a href={this.state.rows[index].explorer + this.state.rows[index].address}>{this.state.rows[index].address}</a></td>
                                    ) : (
                                        <td>{this.state.rows[index].address}</td> 
                                    )
                                }
                                { /* Balance column */ }
                                {
                                    this.isCrypto(this.state.rows[index].name) ? (
                                        <td title={this.state.rows[index].amount + " (" + this.getUnits(this.state.rows[index].name).name + ")"}>{Number(this.state.rows[index].amount / this.getUnits(this.state.rows[index].name).base).toFixed(5)}</td>
                                        ) : (
                                        <td>{this.state.rows[index].amount != 'N/A' ? this.state.rows[index].amount.toFixed(2) : 'N/A'}</td>
                                    ) 
                                }                             
                                <td><Button onClick={()=>{ this.isCrypto (this.state.rows[index].name) ? this.setState({ modalDepositShow: true }) : this.setState({ currentRow: index, currentSymbol: this.state.rows[index].name, modalDepositFromPayPalShow: true })} }>Deposit</Button></td>
                                <td><Button onClick={()=>{ this.isCrypto (this.state.rows[index].name) ? this.setState({ modalWithdrawShow: true }) : this.setState({ currentRow: index, currentSymbol: this.state.rows[index].name, modalWithdrawFromFintechGatewayShow: true })} }>Withdraw</Button></td>
                            </tr>
                        ))
                    }
                    </tbody>                    
                </table>
                <ModalDialogDeposit 
                    show={this.state.modalDepositShow} 
                    onHide={modalDepositClose}/>
                <ModalDialogWithdraw 
                    data={this.state.selectedData} 
                    show={this.state.modalWithdrawShow} 
                    onHide={modalWithdrawClose}/> 
                <ModalDialogDepositFromPayPal 
                    user={this.props.investor} 
                    index={this.state.currentRow} 
                    symbol={this.state.currentSymbol} 
                    callback_balanceUpdate = {this.callback_balanceUpdate} 
                    show={this.state.modalDepositFromPayPalShow} 
                    onHide={modalDepositFromPayPalClose}/>     
                <ModalDialogWithdrawFromFintechGateway 
                    user={this.props.investor} 
                    callback_balanceUpdate = {this.callback_balanceUpdate}                    
                    symbol={this.state.currentSymbol} 
                    data={this.state.selectedData} 
                    show={this.state.modalWithdrawFromFintechGatewayShow} 
                    onHide={modalWithdrawFromFintechGatewayClose}/> 
            </div>      
        );
    }
}  

export default Balance;
