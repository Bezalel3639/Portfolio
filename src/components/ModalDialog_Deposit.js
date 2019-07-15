import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import {adress_data} from './Data';

class ModalDialogDeposit extends Component {
    constructor(props) {
        super(props);
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
                    Deposit
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Address</h4>                
                <input type="text" size="100"/>                
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
    }
}
export default ModalDialogDeposit;
