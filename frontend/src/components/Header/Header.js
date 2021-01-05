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

class Header extends Component {
	constructor(props){
        super(props);
        //does whatever stuff        
        this.showError = this.showError.bind(this);
		console.log(this.props.userdata+ 'i am here ');
		
		this.setState({ message: "" });
		this.setState({ messageclass: "" });
    }

    //(only applicable to raw and normal forms)
    showError(message){
		
		this.setState({ message: message });
		this.setState({ messageclass: 'alert alert-danger' });
		
    }
	render(){
		
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
					<ul className="navbar-nav">
					<li className="nav-item active">
						<a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/register">Register</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/login">Login</a>
					</li>
					
					</ul>
				</div>
				</nav>
				
	        <Switch>
	          <Route path="/register">
				
	            <RegistrationForm showError={this.showError}/>

	          </Route>
	          <Route path="/login">
	            <Login />
	          </Route>
			  <Route path="/dashboard">
	            <Package />
	          </Route>
			  <Route path="/card-details">
	            <CardDetails />
	          </Route>
	          <Route path="/">
	            <Login />
	          </Route>
	        </Switch>
	      </div>
	    </Router>

		)
	   }
    
}
export default Header;