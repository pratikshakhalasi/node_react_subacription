import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {API_BASE_URL} from './../../constant';
import axios from 'axios';
import { Component } from "react";
import { Redirect } from "react-router-dom";
 class Login extends Component {
	constructor(){
        super();
        this.state = {
            username : "",
            password : "",
          
        }
    }
	handlechange(e) {
		this.setState({ [e.target.name] : e.target.value });
	}
	validateForm() {
		return this.state.username.length > 0 && this.state.password.length > 0;
	}

	handleSubmit(event) {
		event.preventDefault();
		this.checkLogin();
		
	}
   checkLogin(){
	if(this.state.username !== '' && this.state.password !== '') {
		console.log(this.state.username+' !! one here!!');
		
		const payload={
			"username":this.state.username,
			"password":this.state.password,
		
		}
		axios.defaults.withCredentials = true;
		axios.post(API_BASE_URL+'/admin/apilogin', payload)
			.then( (response) =>{
				if(response.status === 200){
					console.log(response.data);
					if(response.data.error === true){
						
						this.setState({ loggedin: false });
						localStorage.setItem('loggedIn', false);
						localStorage.setItem('user', '');
					}else{
						
						
						localStorage.setItem('loggedIn', response.data.loggedIn);
						localStorage.setItem('user_id', response.data.user_id);
						localStorage.setItem('user_name', response.data.username);

						window.location.reload();
						this.setState({ redirect: "/dashboard" });
						window.location.href = '/dashboard';

					}
					
					
				} else{
					alert("Some error ocurred");
				}
			})
			.catch(function (error) {
				console.log(error);
			});    
	} else {
		alert('Please enter valid username and password')    
	}
  }
render(){
	if (this.state.redirect) {
		return <Redirect to={this.state.redirect} />
	}
	
	return (
		
		<div className="container mt-5">
		<div className="row">
			<div className="col-md-12">
			<div >
			  <Form onSubmit={this.handleSubmit.bind(this)}>
				  <div className="col-md-6">
				<Form.Group size="lg" controlId="username">
				  <Form.Label>Username</Form.Label>
				  <Form.Control
					autoFocus
					type="text"
					value={this.state.username}
					name = "username"
					onChange={this.handlechange.bind(this)}
				  />
				</Form.Group>
				</div>
				<div className="col-md-6">
				<Form.Group size="lg" controlId="password">
				  <Form.Label>Password</Form.Label>
				  <Form.Control
					type="password"
					value={this.state.password}
					name="password"
					onChange={this.handlechange.bind(this)}
				  />
				</Form.Group>
				</div>
				 <div className="col-md-6">
				<Button block  type="submit" disabled={!this.validateForm()}>
				  Login
				</Button>
				</div>
			  </Form>
			</div>
			</div>
		   </div>
		</div>
	  );
	}
  
}
export default Login;