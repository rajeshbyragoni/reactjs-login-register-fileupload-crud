import React, { Component } from 'react';
import Header from '../elements/header';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';

class Upload extends Component {

	constructor(props) {
        super(props);
        this.file = '';
        this.url = 'https://gowtham-rest-api-crud.herokuapp.com/';
        this.token = localStorage.getItem('token');
	}
	
    state = { 
		files: [],
        redirect: false,
		isLoading: false,
		
	 }

    componentDidMount(){
		axios.get(this.url + 'fileupload', { params: { token: this.token}})
		.then(result => {
			const files = result.data.data.files;
			this.setState({ files: files });
		})
		.catch(error => {
			this.setState({ toDashboard: true });
			console.log(error);
		});
	}

	

	handleChange = event => {
        event.preventDefault();
        this.file = event.target.files[0];
        document.getElementById('fileLabel').innerHTML = event.target.files[0].name;
	};
	
	handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        let bodyFormData = new FormData();
        bodyFormData.append('file', this.file);
        bodyFormData.set('token', this.token);
        axios.post(this.url + 'fileupload', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})
            .then(result => {
                if (result.data.status) {
                    this.componentDidMount();
                    this.setState({redirect: true, isLoading: false});
                    document.getElementById('fileInput').value = "";
                    document.getElementById('fileLabel').innerHTML = "Choose file";
                }
            })
            .catch(error => {
                this.setState({ toDashboard: true });
                console.log(error);
            });
	};

	handleClickDelete = event => {
        const id = event.target.value;
        document.getElementById('delete' + id).classList.remove('d-none');
        const preview = document.querySelectorAll ('.delete' + id);
        preview[0].setAttribute("disabled", true);
        axios.delete(this.url + 'filedelete/' + id , { params: { token: this.token}})
            .then(response => {
                this.componentDidMount();
            })
            .catch( error => {
                console.log(error.toString());
                this.componentDidMount();
            });
    };
	
	renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/upload' />
        }
    };

    render() { 
		// if (this.state.toDashboard === true) {
        //     return <Redirect to='/' />
        // }
        return ( 
            <div>
				 {this.renderRedirect()}
        <Header/>
        <div className="Dashboard_mn">
            <div className="container-fluid">
    
                <h1>File Upload  </h1>
                <div className="card pd20">
					<form onSubmit={this.handleSubmit}>
                <div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<div className="custom-file mb-3">
							<input type="file" onChange={this.handleChange}  className="custom-file-input" id="fileInput"/>
                                                                <label className="custom-file-label" id="fileLabel" htmlFor="fileInput">Choose file</label>
							</div>
					
			</div>

		</div>
		<div className="col-md-6">
			<div className="form-group">
           
								<button type="submit" className="btn btn-default btlg" disabled={this.state.isLoading ? true : false} >Upload File</button>

			</div>
		</div>
		</div>
		</form>
		<div className="row">
        <table className="table table-bordered">
	<thead>
		<tr>
			<th>Id</th>
			<th>Image</th>
			<th>Created</th>
			<th>Action</th>

		</tr>
	</thead>
	<tbody>
	{this.state.files.map((files , index)=>
                                        <tr key={files.id}>
                                            <td>{index + 1}</td>
                                            <td><img src={this.url + '/uploads/students/' + files.name} style={{height:50}} alt={files.name} /></td>
                                            <td>
                                                <Moment format="YYYY-MM-DD">{files.created_at}</Moment>
                                            </td>
                                            <td className="text-center">
                                                <button value={files.id}  className={'btn btn-sm btn-danger delete' + files.id } onClick={this.handleClickDelete} >Delete &nbsp;&nbsp;&nbsp;
                                                        <span className="spinner-border spinner-border-sm d-none" id={'delete'+files.id} role="status" aria-hidden="true"></span>
                                                </button>
                                            </td>
                                        </tr>)
                                    }

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
 
export default Upload;