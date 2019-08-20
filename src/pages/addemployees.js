import React, { Component } from 'react';
 import Header from '../elements/header';
 import {Link, Redirect} from "react-router-dom";
import axios from 'axios';


 class Add extends Component {
      state = {
       redirect:false,
       toDashboard : false,
       isLoading : false
       }

       handleSubmit = event => {
           event.preventDefault();
           this.setState({isLoading : true});
           const url = 'https://gowtham-rest-api-crud.herokuapp.com/employees';
           const token = localStorage.getItem('token');
           const name = document.getElementById('inputName').value;
           const phone = document.getElementById('inputPhone').value;
           const email = document.getElementById('inputEmail').value;
           const empid = document.getElementById('inputEmpId').value;
           const company = document.getElementById('inputComp').value;
           const location = document.getElementById('inputLoca').value;
           const bodyFormData = new FormData();
           bodyFormData.set('name', name);
           bodyFormData.set('phone', phone);
           bodyFormData.set('email', email);
           bodyFormData.set('emp_id', empid);
           bodyFormData.set('company', company);
           bodyFormData.set('location', location);
           bodyFormData.set('token', token);
           axios.post(url, bodyFormData)
           .then(result => {
               if(result.data.status){
                  this.setState({redirect:true, isLoading:false})  
               }

           })
           .catch(error => {
            this.setState({ toDashboard: true });
            console.log(error);
        });

       }

       renderRedirect = () => {
           if(this.state.redirect){
           return <Redirect to ="/dashboard"/>
        }
       };

       render() {
            return (
    <div>
        {this.renderRedirect()}
        <Header/>
        <div className="Dashboard_mn">
            <div className="container-fluid">
    
                <h1>Add Employee  </h1>
                <div className="card pd20">
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                  
   		<div className="col-md-6">
               
   			<div className="form-group">
   				
   				<input type="text" className="form-control" id="inputName" placeholder="name" name="name" required="required" autoFocus="autofocus" />
   				
   			</div>
   		</div>
   		<div className="col-md-6">
   			<div className="form-group">
   				
   				<input type="text" className="form-control" id="inputPhone" placeholder="phone" name="phone" required="required" />
   				
   			</div>
   		</div>
   		<div className="col-md-6">
   			<div className="form-group">
   				
   				<input type="text" className="form-control" id="inputEmail"  placeholder="email"  name="email" required="required" />
   				
   			</div>
   		</div>
   		<div className="col-md-6">
   			<div className="form-group">
   				
   				<input type="text" className="form-control" id="inputEmpId" placeholder="emp_id" name="emp_id" required="required" />
   				
   			</div>
   		</div>
   		<div className="col-md-6">
   			<div className="form-group">
   				
   				<input type="text" className="form-control" id="inputComp" placeholder="company" name="company" required="required"/>
   				
   			</div>
   		</div>	



   		<div className="col-md-6">
   			<div className="form-group">
   				
   				<input type="text" className="form-control" id="inputLoca" placeholder="location" name="location" required="required" />
   				
   			</div>
   		</div>
   	


   	<div className="col-md-6">
   		<div className="form-group">
   				<button type="submit" className="btn btn-default btlg float-left" disabled={this.state.isLoading ? true :false}>Submit</button>

   		</div>
   	</div>
         </div>
         </form>
                </div>
            </div>
        </div>
    </div>

    ); } } export default Add;