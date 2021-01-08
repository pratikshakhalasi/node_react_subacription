import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from "../Login/Login";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import { Component } from "react";
import Package from '../Package/Package';
import CardDetails from '../Package/CardDetails';
import Success from '../Package/Success';
//import axios from 'axios';
//import {API_BASE_URL} from './../../constant';

class Header extends Component {
	constructor(props){
        super(props);
        //does whatever stuff        
        this.showError = this.showError.bind(this);
		
		this.setState({ message: "" });
		this.state = ({ loggedIn: false,user: false });
		
		this.setState({ messageclass: "" });
    }

    //(only applicable to raw and normal forms)
    showError(message){
		
		this.setState({ message: message });
		this.setState({ loggedIn: false });
		this.setState({ messageclass: 'alert alert-danger' });
		
	}
	/*componentDidMount() {
		console.log("111");
  		axios.defaults.withCredentials = true;
		axios.get(API_BASE_URL+'/admin/apichecklogin')
			.then( (response) =>{
				if(response.status === 200){
					if(response.data.error === true){
						console.log(response.data.message);
						this.setState({'loggedIn':response.data.loggedIn});
						this.setState({'user':false});
						console.log("222");
					}else{
						console.log("444");
						console.log(response.data);
						this.setState({'loggedIn':response.data.loggedIn});
						this.setState({'user':response.data.user});
						
						//alert("Some error ocurred");
					}
				} else{
					alert("Some error ocurred");
				}
			})
			.catch(function (error) {
				console.log(error);
			}); 

}*/
logout() {
	localStorage.clear();
	window.location.href = '/';
}
 LoginButton() {
	 
	return (
		<ul className="navbar-nav">
			<li className="nav-item active">
				<a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
			</li>
			<li className="nav-item">
				<a className="nav-link" href="/register">Register</a>
			</li>
			<li className="nav-item">
				<a className="nav-link" href="/login"> Login </a>
			</li>
			</ul>
		
	);
  }
  
   LogoutButton() {
	return (
		<ul className="navbar-nav">
			<li className="nav-item active">
				<a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
			</li>
			
			<li className="nav-item">
			<button className="nav-link" onClick={this.logout}> Logout </button>
			</li>
		</ul>

	);
  }
	render(){
		var button_html = '';
		
		if(localStorage.getItem('loggedIn') === '1') {
			button_html = this.LogoutButton();
		}else{
			button_html = this.LoginButton();
			
		}
			
	
		return (
			
		<Router>

	      <div>
	      	<nav className="navbar navbar-dark bg-primary">
            <div className="row col-12 d-flex justify-content-center text-white">
            <span className="h3">PNRD</span>
            </div>
        	</nav>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				
				<div className="collapse navbar-collapse" id="navbarNav">
					{button_html}
				</div>
				</nav>
				
	        <Switch>
	          <Route path="/register">
				
	            <RegistrationForm showError={this.showError}/>

	          </Route>
	          <Route path="/login">
	            <Login />
	          </Route>
			  
			  <Route path="/success">
	            <Success />
	          </Route>
			  <Route path="/dashboard">
	            <Package />
	          </Route>
			  <Route path="/card-details">
	            <CardDetails />
	          </Route>
			  <Route
					exact
					path="/"
					component={
					localStorage.getItem('loggedIn') === '1'
					? () => <Package />
					: () =>  <Login />
					}
				/>

	    
			 
	        </Switch>
	      </div>
	    </Router>

		)
	   }
    
}
export default Header;