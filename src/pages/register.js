import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import Axios from 'axios';


class Register extends Component {
    state = {
        name : '',
        email : '',
        password : '',
        isLoading : false,
        Redirect :false,
        authError :false
      }
      handleNameChange = event => {
          this.setState({name : event.target.value});
      }

      handleEmailChange = event => {
      this.setState({email : event.target.value});

      }
      handlePwdChange = event => {
          this.setState({password : event.target.value});
      }
      handleSubmit = event => {
          event.preventDefault();
          const url = 'https://gowtham-rest-api-crud.herokuapp.com/register';
          const name = this.state.name;
          const email = this.state.email;
          const password = this.state.password;
          const bodyFormData = new FormData();
          bodyFormData.set('name', name);
          bodyFormData.set('email', email);
          bodyFormData.set('password', password);
          axios.post(url, bodyFormData)
          .then(result => {
            this.setState({isLoading: false});
            if (result.data.status !== 'fail') {
                this.setState({redirect: true, authError: true});
            }else {
                this.setState({redirect: false, authError: true});
            }
        })
          .catch(error=> {
              console.log(error);
              this.setState({authError: true, isLoading:false});
          })
      }

      renderRedirect = () => {
          if(this.state.redirect){
              return <Redirect to = {'/'} />
          }
      }


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
                                            <input type="text" className={"form-control" + (this.state.authError ? 'is-invalid' : '')} name="name"
                                             onChange={this.handleNameChange}
                                             placeholder="Name" autoFocus required />
                                             <div className ="invalid-feedback">
                                                 please provide a valid name

                                             </div>
    
                                        </div>
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
                                            <div className="col-md-6 nopad">
                                            <button type="submit" className="fgp sigup" disabled={this.state.isLoading ? true : false}>Sig up
                                                
                                                </button>
                                                
                                            </div>
                                            <div className="col-md-6 nopad">
                                                <Link to ={''} type="submit" className="btn btn-default btlg pull-right">Login
                                                
                                                </Link>
    
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
         );
    }
}
 
export default Register;