import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";


class Header extends Component {

  constructor (props){
    super(props);
    this.handleLogout =this.handleLogout.bind(this);

  }
    state = { 
      toDashboard :false,
     }

     handleLogout = event => {
       localStorage.removeItem('token');
       localStorage.setItem('isLoggedIn', false);
       this.setState({toDashboard:true});     }

    render() { 
      if (this.state.toDashboard === true) {
        return <Redirect to ="/" />
      }
        return ( 
            <div className="header fixed-top">

  <nav className="navbar navbar-expand-lg r_nav">
  <Link to={'#'} className="navbar-brand logo imhed"><h2>LOGO</h2></Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent"/>
    <ul className="navbar-nav mr-auto nv">
      <li className="nav-item">
        <Link to={'/dashboard'} className="nav-link"><img src="/images/dashboard-ico.png" alt="" /> Dashboard</Link>
      </li>
      <li className="nav-item">
        <Link to={'/addemployee'} className="nav-link"><img src="/images/catelog-ico.png" alt="" />  Form</Link>
      </li>
      <li className="nav-item"> <Link to={'/upload'} className="nav-link"><i className="fa fa-user"></i> File-upload</Link></li>
      <li className="nav-item dropdown">
        <Link to={'#'} className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         <img src="/images/catelog-ico.png" alt="" />  Cotalog
        </Link>
        <ul className="dropdown-menu m100 bgsals" aria-labelledby="navbarDropdown">
          <li><Link to={'#'} className="dropdown-item"><img src="/images/orders-ico.png" alt="" /> Orders</Link></li>
          <li><Link to={'#'} className="dropdown-item"><img src="/images/payments-ico.png" alt="" /> Payments</Link></li>
          <li><Link to={'#'} className="dropdown-item"><img src="/images/shipping-ico.png" alt="" /> Shipping</Link></li>
          <li><Link to={'#'} className="dropdown-item"><img src="/images/invoices-ico.png" alt="" /> Invoices</Link></li>
        </ul>
      </li>
       <li className="nav-item"><Link to={'#'} className="nav-link"><img src="/images/customers-ico.png" alt="" />  Customers </Link></li>
     <li className="nav-item"><Link to={'#'} className="nav-link"><img src="/images/vendors-ico.png" alt="" /> Vendors</Link></li>
     <li className="nav-item"><Link to={'#'} className="nav-link"><img src="/images/cms-ico.png" alt="" />  CMS </Link></li>
          <li className="nav-item"><Link to={'#'} className="nav-link"><img src="/images/reports-ico.png" alt="" /> Reports </Link></li>
    </ul>
    <ul className="navbar-nav mr-auto nv_lgn">
       <li className="nav-item"><Link to={'#'} className="nav-link"><i className="fa fa-cog"></i></Link></li>
      <li className="nav-item dropdown">
            <Link to={'#'} className="nav-link dropdown-toggle"  id="navbardrop" data-toggle="dropdown"><span className="usrne"><img src="/images/user.png" alt="" /></span> Rajesh</Link>
            <ul className="dropdown-menu tp120">
              <li><Link to={'#'} className="dropdown-item"><i className="fa fa-unlock"></i> Change Password</Link></li>
              <li><Link to={'#'} onClick={this.handleLogout} className="dropdown-item"><i className="fa fa-sign-out"></i> Logout</Link></li>

            </ul>
          </li>
    </ul>

</nav>
</div>
         );
    }
}
 
export default Header;