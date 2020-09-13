import React, { Component } from 'react';
import { ButtonGroup, Form, Button} from 'react-bootstrap';
import $ from 'jquery';
import {endpoints_base} from './Data';
import './Styles.css';

class Registration extends Component {
    constructor(props) {
        super();
        this.state = { 
            edit1_value: '',
            edit2_value: '',
            message: '',
            isuserfound: false  /* reserved */ };        
    }

    componentWillMount(){
         this.setState({ message: "Create an account" }); 
    }

    updateInput1 (e) {
        this.setState({ edit1_value: e.target.value });
        this.setState({ message : "" });  
    }

    updateInput2 (e) {
        this.setState({ edit2_value: e.target.value });
        this.setState({ message : "" });  
    }
 
    submitData() {
        var postdata = {email: this.state.edit1_value, password: this.state.edit2_value};
        this.postMongoDBData(endpoints_base + "/v1/BackOffice/Login/RegisterUser/", postdata);
    }
  
    postMongoDBData(URL, data) {         
        var self = this;
        $.post(URL, data, function( data ) { 
            self.setState({ message: data });             
        });
    }
    
    render() {
        return (
            <div className="registration_form">
                <Form>
                <Form.Group controlId="form_email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder={this.state.edit1_value} onChange={this.updateInput1.bind(this)} />
                </Form.Group>

                <Form.Group controlId="form_password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder={this.state.edit2_value} onChange={this.updateInput2.bind(this)} />
                </Form.Group>
                <Button variant="primary" onClick={this.submitData.bind(this)}>Create</Button>
                </Form>

                <div align="left">
                    <br></br> 
                    <input type="text" readOnly className="no-border" size="38" value={this.state.message}></input> 
                </div>  
            </div>
        );
    }
}  

export default Registration;
