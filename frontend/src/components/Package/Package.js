import React from "react";

import {API_BASE_URL} from './../../constant';
import axios from 'axios';
import { Component } from "react";

 class Package extends Component {
	constructor(){
        super();
        this.state = {
            plans : [],
          
        }
    }
	componentDidMount() {
        
        axios.get(API_BASE_URL+'/admin/packages/apigetPackage')
          .then(res => {
            
            this.setState({ "plans": res.data.data});
            
            console.log(this.state.plans[0].name);
          }).catch(function (error) {
            console.log(error);
        }); 
          
      }
    
      render(){
        return (
          
           <div>
            {this.state.plans.map(d => (
              <div>
                <div className="card">
                 
                  <div className="card-body">
                    <h5 className="card-title">{d.name}</h5>
                    <p className="card-text">{d.description}</p>
                    <h3>{d.amount}</h3>
                    <a href="/card-details?package={d.name}" className="btn btn-primary">Subscribe</a>
                    
                  
                  </div>
                </div>
              </div>
            
            ))} 
      </div>
            
        )
      }
}
export default Package;