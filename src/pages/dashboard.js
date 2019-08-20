import React, { Component } from 'react';
import Header from "../elements/header";
import {Link} from 'react-router-dom';
import axios from 'axios';


class Dashboard extends Component {
    state = { 
      
      employees: [],
      toDashboard: false,
      isLoading: false
     }
     constructor(props){
       super(props);
      this.url = 'https://gowtham-rest-api-crud.herokuapp.com/employees';
      this.token= localStorage.getItem('token');
     }
     componentDidMount(){
       axios.get(this.url , {params: {token: this.token}})
       .then(response => {
        const employees = response.data.data.employees;
        this.setState({ employees });
       })
       .catch(error => {
         console.log(error);
         this.setState({toDashboard:true});
       })
     }

     handleClickDelete = event => {
       axios.delete(this.url + '/' + event.target.value, {params: {token: this.token}})
      .then(response => {
         this.componentDidMount();
         this.setState({toDashboard:true});

       })
       .catch(error => {
         console.log(error);
         this.setState({toDashboard :true});
       })
     }



    render() { 
        return ( 
            <div>
          <Header/>
            <div className="Dashboard_mn">
            <div className="container-fluid">

		<h1>Overview Dashboard  </h1>
        <div className="card pd20">
			<div className="row">
				<div className="col-md-3 bdr2">
					<div className="row">
						<div className="col-md-5">
							<div className="imgor hvr"><img src="/images/order.png" alt="order" /> </div>
						</div>
						<div className="col-md-4">
							<div className="cntnt"><h4>Order <span>99</span></h4></div>
						</div> 
					</div> 
				</div>
                <div className="col-md-3 bdr2">
					<div className="row">
						<div className="col-md-5">
							<div className="imgor hvr"><img src="/images/Payments.fw.png" alt="Payments" /> </div>
						</div>
						<div className="col-md-4">
							<div className="cntnt"><h4>Payments <span>0</span></h4></div>
						</div> 
					</div> 
				</div>
                <div className="col-md-3 bdr2">
					<div className="row">
						<div className="col-md-5">
							<div className="imgor hvr"><img src="/images/product.fw.png" alt="product" /> </div>
						</div>
						<div className="col-md-4">
							<div className="cntnt"><h4>Products <span>203</span></h4></div>
						</div> 
					</div> 
				</div>
                <div className="col-md-3">
					<div className="row">
						<div className="col-md-5">
							<div className="imgor hvr"><img src="/images/Customers.fw.png" alt="Customers" /> </div>
						</div>
						<div className="col-md-4">
							<div className="cntnt"><h4>Customers <span>155</span></h4></div>
						</div> 
					</div> 
				</div>
               
        </div>
        </div>


       

 <div className="card pdtb20">
 <div className="row">
 <div className="col-md-12 nopad">
  <h3 className="til">Top Selling Products <Link to={"addemployee"} className="float-right">Add Employee</Link></h3>
  </div>

 
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Phone No</th>
        <th>Email ID</th>
        <th>Emp ID</th>
        <th>Company</th>
        <th>Location</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    {this.state.employees.map((employees, index) => 
       <tr key={employees.id}>
       <td>{index+1}</td>
       <td>{employees.name}</td>
       <td>{employees.phone}</td>
       <td>{employees.emp_id}</td>
       <td>{employees.email}</td>
       <td>{employees.company}</td>
       <td>{employees.location}</td>
       <td> <Link className="btn btn-sm btn-info" to={{ pathname: 'edit', search: '?id=' + employees.id }}>Edit</Link>&nbsp; | &nbsp;
         <button value={employees.id} className="btn btn-sm btn-danger" disabled={index === 0 ? true : false} onClick={this.handleClickDelete}>Delete </button></td>
       
     </tr>
      )}
     
      
    </tbody>
  </table>
  

 </div>

</div>
        </div>
        </div>
        </div>
        
        
        
        
         );
    }
}
 
export default Dashboard;