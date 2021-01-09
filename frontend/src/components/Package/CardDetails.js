import React from "react";
import { Component } from "react";
import axios from "axios";
import StripeCheckout from 'react-stripe-checkout';
import {API_BASE_URL} from './../../constant';

class CardDetails extends Component{
  constructor(props){
    super(props);
  }
    onToken = (token) => {
        token.package_id = this.props.package_id ;
        token.user_id = this.props.user_id;
        const payload={
          "token": token
          
        
        }
        
        axios.post(API_BASE_URL+'/admin/apitoken', payload).then( (response) =>{
          if(response.status === 200){
            window.location.href ="/success"
            
          } else{
            alert("Some error ocurred");
          }
        })
        .catch(function (error) {
          console.log(error);
        });  
    }
    render(){
        return(
            <StripeCheckout name="SUBSCRIBE"
            token={this.onToken}
            stripeKey={process.env.REACT_APP_SECRET_KEY}
            >
            <button className="btn btn-primary">SUBSCRIBE</button>
            </StripeCheckout>
            
            
        );

    }

}
export default CardDetails;