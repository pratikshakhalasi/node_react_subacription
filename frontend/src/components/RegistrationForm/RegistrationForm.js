import React, {Component} from 'react';
import axios from 'axios';
import {API_BASE_URL} from './../../constant';
import { Redirect } from "react-router-dom";

class RegistrationForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            email : "",
            password : "",
            username : "",
            name : ""
        }
    }
    handlechange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }
    sendDetailsToServer(){
        console.log('why here');
        console.log(this.state.email+' !! oky here!!');
        if(this.state.email !== '' && this.state.password !== '') {
            console.log(this.state.email+' !! one here!!');
            this.props.showError('test');
            const payload={
                "email":this.state.email,
                "password":this.state.password,
                "username": this.state.username,
                "name":this.state.name
            }
            axios.post(API_BASE_URL+'/admin/register', payload)
                .then( (response) =>{
                    if(response.status === 200){
                        console.log(response.data);
                        if(response.data.success === false){
                            this.props.showError(response.data.message);
                           
                        }else{
                            this.props.showError(response.data.message);
                            this.setState({ redirect: "/login" });
                            console.log('registered!!');
                        }
                        
                        
                    } else{
                        this.props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        } else {
            this.props.showError('Please enter valid username and password')    
        }
        
    }
   
    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        return(

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                <form>
                    <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" 
                           className="form-control" 
                           id="name" 
                          
                           placeholder="Enter name"
                           name="name"
                           onChange={this.handlechange.bind(this)}
                    />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Username</label>
                        <input type="text" 
                            className="form-control" 
                            id="username" 
                            
                            placeholder="Enter username"
                            name="username"
                            onChange={this.handlechange.bind(this)}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Email</label>
                        <input type="email" 
                            className="form-control" 
                            id="email" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email"
                            name="email"
                            onChange={this.handlechange.bind(this)}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Password"
                            name="password"
                           onChange={this.handlechange.bind(this)}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Confirm Password</label>
                        <input type="password" 
                            className="form-control" 
                            id="confirmPassword" 
                            name="confirmPassword"
                           onChange={this.handlechange.bind(this)}
                            placeholder="Confirm Password"
                        />
                    </div>
                    <button  onClick={this.sendDetailsToServer.bind(this)}
                        type="button" 
                        className="btn btn-primary"
                    >
                        Register
                    </button>
                </form>
                </div>
                </div>
            </div>
        )
    }
}
export default RegistrationForm;