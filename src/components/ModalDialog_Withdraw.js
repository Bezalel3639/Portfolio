import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import {adress_data} from './Data';

class ModalDialogWithdraw extends Component {
    constructor(props) {
        super(props);
        //console.log ("ModalDialogWithdraw ");
        //console.log (adress_data.map.get("3N12JNDNAYNE2dRSGbxK3UQXfVJnXaMwiYT"));        
    }

    componentWillMount(){ 
        console.log ("ModalDialogWithdraw ");
        //console.log (adress_data.map.get("3N12JNDNAYNE2dRSGbxK3UQXfVJnXaMwiYT"));
        //console.log (adress_data);  
    }

    sendMessage() {
         //alert( adress_data.length ); // OK, 2
        alert( adress_data[0].seed ); // OK, 2
    }

    render() {
        return (
            <Modal
                {...this.props}
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
                <input type="text" size="10"/>
                <h4>Address</h4>                
                <input type="text" size="100"/> 
                <h4>Message</h4>                
                <input type="text" size="100"/>                
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.sendMessage}>Send</Button>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
    }
}
export default ModalDialogWithdraw;
