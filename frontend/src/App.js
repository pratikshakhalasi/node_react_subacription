import React from 'react';
//import logo from './logo.svg';
import './App.css';
//import Login from "./components/Login/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import axios from 'axios';
import {API_BASE_URL} from './constant';
import { Component } from 'react';
class App extends Component {
	constructor(){
        super();
        this.state = {
            userdata : [],
        }
    }
	componentDidMount() {
  		axios.defaults.withCredentials = true;
		axios.get(API_BASE_URL+'/admin/apichecklogin')
			.then( (response) =>{
				if(response.status === 200){
					if(response.data.error === true){
						console.log(response.data.message);
						this.setState({'userdata':response.data});

					}else{
						console.log(response.data);
						this.setState({'userdata':response.data});
						
						//alert("Some error ocurred");
					}
				} else{
					alert("Some error ocurred");
				}
			})
			.catch(function (error) {
				console.log(error);
			}); 

}
render(){
	return (
	
    <div className="App">
    <Header userdata={this.state.userdata} />
    <div className="col-md-12">
       
    </div>
    </div>
  );
}
}
 
export default App;
