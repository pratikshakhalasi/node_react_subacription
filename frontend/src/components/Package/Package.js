import React from "react";

import {API_BASE_URL} from './../../constant';
import axios from 'axios';
import { Component } from "react";
import CardDetails from '../Package/CardDetails';
import  { Col, Row ,Container} from "react-bootstrap"
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
            
          }).catch(function (error) {
            console.log(error);
        }); 
          
      }
    
      render(){
        return (
          <Container>
          <p>&nbsp;</p>
          <Row className="show-grid">
           
            {this.state.plans.map(d => (
              
              <Col md={4}>
               
               <div className="card">
                 
                 <div className="card-body">
                   <h5 className="card-title">{d.name}</h5>
                   <p className="card-text">{d.description}</p>
                   <h3>${d.amount}</h3>
                   <CardDetails user_id={localStorage.user_id} package_id={d._id}></CardDetails>
                   
                 </div>
               </div>
               <p>&nbsp;</p>
              </Col>
            
            ))} 
      </Row>
      </Container>
         
        )
      }
}
export default Package;