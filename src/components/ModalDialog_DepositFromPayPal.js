import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import {endpoints_base} from './Data';
import $ from 'jquery';

let popup = null;

class ModalDialogDepositFromPayPal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            amount_value: "",
            message: ""
        }
    }

    monitorPopup() {
        var self = this;
        var popupTick = setInterval(function() {
            if (popup.closed) {
                clearInterval(popupTick);
                URL = endpoints_base + "/v1/PayPal/sandbox/GetCustomerBalance/" + self.props.user + "/" + self.props.symbol;
                 console.log("monitorPopup> URL: " + URL);
                self.getBalance(URL); 
            } 
        }, 1000);

        return false;
    };
    
    runPayPal() {
        console.log("constructor: " + this.props.index); 
        if (this.state.amount_value != '') {
            URL = endpoints_base + "/v1/PayPal/sandbox/Deposit/" + this.props.user + "/" + this.state.amount_value + "/" + "RUB";
            console.log("URL: " + URL);
            this.getPayPalDepositURL(URL); 
        } else {
            alert ("The amount should not be empty!")
        }  
    }

    getPayPalDepositURL(URL){
        console.log("getPayPalDepositURL> URL:", URL); 
        var self = this;
        $.ajax({
            url: URL, 
            contentType: 'text',
            cache: false,
            success: function(data){ 
                console.log("getPayPalDepositURL> :", data); 
                this.setState({ url: data })
                popup = window.open(data, "name", "width=300, height=600");
                self.monitorPopup();
            }.bind(this),
                error: function(xhr, status, err){           
                console.log(err);
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
                console.log("getBalance> Successfull deposit. The new balance is " + balance + " " + self.props.symbol);
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
                    Deposit
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Amount</h4>                
                <input type="text" size="10" value={this.state.amount_value} onChange={this.updateAmount.bind(this)} />                
            </Modal.Body>
            <Modal.Footer>  
                <Button onClick={this.runPayPal.bind(this)}>Run deposit</Button>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
         );
    }
}
export default ModalDialogDepositFromPayPal;