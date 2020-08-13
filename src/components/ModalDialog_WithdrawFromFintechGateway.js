import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import {endpoints_base, waves_admin_password} from './Data';
import $ from 'jquery';

class ModalDialogWithdrawFromFintechGateway extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           amount_value: '',
           message: ''
        }
    }

    runPayPal() {
        if (this.state.amount_value != '') {
            URL = endpoints_base + "/v1/PayPal/sandbox/GetAccessToken/" + waves_admin_password; 
            this.getPayPalToken(URL, {password: waves_admin_password});
            console.log("runPayPal> symbol: " + this.props.symbol);
        } else {
            alert ("The amount should not be empty!")
        } 
    }

    getPayPalToken(URL, data) {
        var self = this;
        $.post(URL, data, function( data ) {
            console.log("getPayPalToken> response:", data); 
            URL = endpoints_base + "/v1/PayPal/sandbox/Withdraw/";
            console.log("getPayPalToken> user:", self.props.user); 
            self.runPayPalWithdraw(URL, {receiver: self.props.user, amount: self.state.amount_value, symbol: self.props.symbol, accesstoken: data });
        });
    }

    runPayPalWithdraw(URL, data) {
        var self = this;
        $.post(URL, data, function( data ) {
            console.log("runPayPalWithdraw> response:", data);  
            if (data == "Success") {
               URL = endpoints_base + "/v1/PayPal/sandbox/GetCustomerBalance/" + self.props.user + "/" + self.props.symbol;
               self.getBalance(URL);   
            }
        });
    }

    getBalance(URL) {
        var self = this;
        $.ajax({
            url: URL, 
            contentType: 'text',
            cache: false,
            success: function(data) {
                console.log("getBalance> :" + data);  
                var balance = parseFloat(data.replace(",", ".")).toFixed(2);
                self.setState({ message: "Result: Successfull withdrawal. The new balance is " + balance + " " + self.props.symbol});
                self.props.callback_balanceUpdate(data); 
             }.bind(this),                
                error: function(xhr, status, err){
                console.log(err);
            }
        });
    }    

    updateAmount (e) {
        this.setState({ amount_value: e.target.value });
    }

    render() {
        return (
            <Modal 
                show={this.props.show} 
                onHide={this.props.onHide}             
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Withdraw
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Amount</h4>                
                <input type="text" size="10" value={this.state.amount_value} onChange={this.updateAmount.bind(this)} /> 
                <h6></h6><h6></h6>
                <h6>{this.state.message}</h6>
            </Modal.Body>
            <Modal.Footer>                
                <Button onClick={this.runPayPal.bind(this)}>OK</Button>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
    }
}
export default ModalDialogWithdrawFromFintechGateway;