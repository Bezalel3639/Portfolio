import React, { Component } from 'react';
import { ButtonGroup, Form, Button } from 'react-bootstrap';
import $ from 'jquery';
import {endpoints_base} from './Data';
import './Styles.css';

class LoginSandbox extends Component {
    constructor(props) {
        super();
        this.state = { 
            edit1_value: '',
            edit2_value: '',
            message: '',
            isuserfound: false  /* reserved */ };        
    }

    componentWillMount(){
        this.setState({ edit1_value: 'bezalel5390@yandex.ru', edit2_value: '5390' });
    }

    updateInput1 (e) {
        this.setState({ edit1_value: e.target.value });
        this.setState({ message : "" });  
    }

    updateInput2 (e) {
        this.setState({ edit2_value: e.target.value });
        this.setState({ message : "" });  
    }
 
    onClick() {
        this.getMongoDBData(endpoints_base + "/v1/BackOffice/Login/ValidateSandboxUser/" + this.state.edit1_value +"/{password}?password=" + this.state.edit2_value);   
    }

    getMongoDBData(URL) {
        $.ajax({
            url: URL, 
            contentType: 'text',
            cache: false,
            success: function(data) {
                console.log("getMongoDBData> :" + data);              
                if (data.includes("A record was found in the DB!")) {                    
                    console.log("getMongoDBData> : The user is found");
                    const {dataCallback_login} = this.props; 
                    if (data.includes("Admin status: true")) { 
                        dataCallback_login(this.state.edit1_value, "admin");
                    } else {
                        dataCallback_login(this.state.edit1_value, "regular_customer");  
                    }
                } else {
                    console.log("getMongoDBData> : The user is not found!"); 
                    this.setState({ message : "The user is not found!" }); 
                }            
            }.bind(this),                
                error: function(xhr, status, err){
                console.log(err);
            }
        });
    }
    
    render() {
        return (
            <div className="login_form">
                <Form>
                <Form.Group controlId="form_email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder={this.state.edit1_value} onChange={this.updateInput1.bind(this)} />
                </Form.Group>

                <Form.Group controlId="form_password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder={this.state.edit2_value} onChange={this.updateInput2.bind(this)} />
                </Form.Group>
                <Button variant="primary" onClick={this.onClick.bind(this)}>Login</Button>
                </Form>

                <div>
                    <br></br> 
                    <input type="text" readOnly className="no-border" size="50" id="rateinfo" value={this.state.message}></input> 
                </div>  
            </div>    
        );
    }
}  

export default LoginSandbox;