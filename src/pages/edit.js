import React, { Component } from 'react';
import Header from '../elements/header';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

class Edit extends Component {
	 constructor(props){
		 super(props);
		 this.url = 'https://gowtham-rest-api-crud.herokuapp.com/employees';
		 this.token = localStorage.getItem('token');
	 }

	state = {
		id : '',
		redirect : false,
		isLoding : false
	  }
	
	  componentDidMount() {
		  const id = this.props.location.search[4];
		  axios.get(this.url + '/' + id, {params : {token : this.token}})
		  .then(result => {
			  const emp = result.data.employee
			  this.setState({id: emp.id});
			  document.getElementById('inputName').value = emp.name;
			  document.getElementById('inputPhone').value = emp.phone;
			  document.getElementById('inputEmail').value = emp.email;
			  document.getElementById('inputEmpId').value = emp.emp_id;
			  document.getElementById('inputComp').value = emp.name;
			  document.getElementById('inputLoca').value = emp.location;
			 })

		  .catch(error => {
			  console.log(error);
			  this.setState({redirect : true ,isLoding : true})
		  })
	  }

	  handleSubmit = event => {
		  event.preventDefault();
		  this.setState({isLoding : true});
		  const token =localStorage.getItem("token");
		  const url = 'https://gowtham-rest-api-crud.herokuapp.com/employees/'+ this.state.id;
		  const name = document.getElementById('inputName').value;
		  const phone = document.getElementById('inputPhone').value;
		  const email = document.getElementById('inputEmail').value;
		  const empid = document.getElementById('inputEmpId').value;
		  const company = document.getElementById('inputComp').value;
		  const location = document.getElementById('inputLoca').value;
		 axios.put(url, {name : name, phone : phone, email : email, emp_id : empid, company :company, location :location, token:token } )
		 .then(result => {
			 if(result.data.status){
				 this.setState({redirect : true , isLoding:true})
			 }
		 })

		 .catch(error => {
			this.setState({ toDashboard: true });
			console.log(error);
		});
	  }

	  renderRedirect = () => {
		  if(this.state.redirect){
			  return <Redirect to = "/dashboard"/>
		  }
	  }


    render() { 
        return (
            <div>
				{this.renderRedirect()}
        <Header/>
        <div className="Dashboard_mn">
            <div className="container-fluid">
    
                <h1>Edit Employee  </h1>
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
   				
   				<input type="text" className="form-control" id="inputPhone" placeholder="phone" name="phone" equired="required" />
   				
   			</div>
   		</div>
   		<div className="col-md-6">
   			<div className="form-group">
   				
   				<input type="text" className="form-control" id="inputEmail"  placeholder="email"  name="email" required="required" />
   				
   			</div>
   		</div>
   		<div className="col-md-6">
   			<div className="form-group">
   				
   				<input type="text" className="form-control" id="inputEmpId"  placeholder="emp_id" name="emp_id" required="required" />
   				
   			</div>
   		</div>
   		<div className="col-md-6">
   			<div className="form-group">
   				
   				<input type="text" className="form-control" id="inputComp" placeholder="company" name="company" required="required" />
   				
   			</div>
   		</div>	



   		<div className="col-md-6">
   			<div className="form-group">
   				
   				<input type="text" className="form-control" id="inputLoca" placeholder="location" name="location" required="required" />
   				
   			</div>
   		</div>
   	


   	<div className="col-md-6">
   		<div className="form-group">
		 
   				<button type="submit" className="btn btn-default btlg float-left" disabled={this.state.isLoading ? true : false}>Update</button>

   		</div>
   	</div>


                    </div>
					</form>
                </div>
            </div>
        </div>
    </div>
          );
    }
}
 
export default Edit;
