import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';


 class Login extends Component {
      state = { 
          email : '',
          password : '',
          Redirect : false,
          isLoading : false,
          authError : false
        
      }
      
      handleEmailChange = event => {
          this.setState({email : event.target.value});
      }

      handlePwdChange = event => {
          this.setState({password : event.target.value});
      }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading : true});
        const url = 'https://gowtham-rest-api-crud.herokuapp.com/login';
        const email = this.state.email;
        const password = this.state.password;
        let bodyFormData = new FormData();
        bodyFormData.set('email', email);
        bodyFormData.set('password', password);
        axios.post(url, bodyFormData)
        .then(result =>{
            console.log(result.data.status);
            if(result.data.status){
                localStorage.setItem('token', result.data.token);
                this.setState({redirect:true, isLoading:false});
                localStorage.setItem('isLoading', true);
            }

        })
        .catch(error => {
            console.log(error);
            this.setState({authError:true, isLoading:false});
        })

    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/dashboard' />
        }
    };


       render() {
        //const isLoading = this.state.isLoading;
            return (
                
    <div>
        {this.renderRedirect()}
      
        <div className="carousel slide carousel-fade" data-ride="carousel">
    
            <div className="carousel-inner" role="listbox">
                <div className="item active">
                </div>
                <div className="item">
                </div>
                <div className="item">
                </div>
            </div>
        </div>
    
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 nopad">
                    <div className="ct_mn">
    
                        <div className="ds60">
                            <div className="col-md-6">
                                <h2>Logo</h2>
                                <h2>WELCOME TO ADMIN</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
                            </div>
                        </div>
    
                    </div>
                </div>
                <div className="col-md-6 nopad">
                    <div className="lgn_m">
                        <div className="ds60">
                            <div className="col-md-5">
    
                                <form onSubmit={this.handleSubmit}>
                                    <div className="col-md-12">
                                        <div className="usrlgn">
                                            <img src="/images/user.png" alt="" />
                                        </div>
                                        <br/>
                                    </div>
                                    <div className="col-md-12">
    
                                        <div className="form-group">
                                            <input type="text" className={"form-control" + (this.state.authError ? 'is-invalid' : '')} name="email" onChange={this.handleEmailChange}
                                             placeholder="Email address" autoFocus required />
                                             <div className ="invalid-feedback">
                                                 please provide a valid email

                                             </div>
    
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="password"  className={"form-control" + (this.state.authError ? 'is-invalid' : '')} name="password" onChange={this.handlePwdChange}
                                             required placeholder="Password" />
                                            <div className ="invalid-feedback">
                                                 please provide a valid password

                                             </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Link to ={'register'} className="fgp sigup"> Sign Up </Link>
                                            </div>
                                            <div className="col-md-6">
                                                <button type="submit" className="btn btn-default btlg pull-right" disabled={this.state.isLoading ? true : false}>Login
                                                
                                                </button>
    
                                            </div>
                                        </div>
                                    </div>
    
                                </form>
                            </div>
    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    ); } } export default Login;