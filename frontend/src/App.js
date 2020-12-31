import React, { useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';
//import Login from "./components/Login/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import axios from 'axios';
import {API_BASE_URL} from './constant';

function App() {
  axios.defaults.withCredentials = true;
  useEffect(() => {
		axios.get(API_BASE_URL+'/admin/apichecklogin')
			.then( (response) =>{
				if(response.status === 200){
					if(response.data.error === true){
						console.log(response.data.message);
						this.setState({ loggedin: response.data.loggedin });
					}else{
						this.setState(response.data);
						console.log('registered!!');
					}
				} else{
					alert("Some error ocurred");
				}
			})
			.catch(function (error) {
				console.log(error);
			}); 

  })
  return (

    <div className="App">
    <Header />
    <div className="col-md-12">
       
    </div>
    </div>
  );
}

 
export default App;
