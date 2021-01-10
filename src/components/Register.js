import React from "react";
import axios from "axios";

import {Redirect} from 'react-router-dom';

class Register extends React.Component {

  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      redirect: false,
      errors: []
    }
  }

  handleNameChange = event => {
    this.setState({name: event.target.value});
  }

  handleMailChange = event => {
    this.setState({email: event.target.value});
  }

  handlePasswordChange = event => {
    this.setState({password: event.target.value});
  }

  handleConfirmPasswordChange = event => {
    this.setState({confirm_password: event.target.value});
  }

  handleFormSubmit = event => {
    event.preventDefault()
    let bodyFormData = new FormData();
    bodyFormData.set('name', this.state.name)
    bodyFormData.set('email', this.state.email)
    bodyFormData.set('password', this.state.password)
    bodyFormData.set('confirm_password', this.state.confirm_password)

    axios.post('http://127.0.0.1:8000/api/register', bodyFormData)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('token', res.data.token)
        this.setState({redirect: true})
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.setState({errors: err.response.data.errors}, () => {
            console.log(err.response.data.errors)

          })
        }
      })

  }


  render() {
    if (this.state.redirect || localStorage.getItem('token')) {
      return (<Redirect to="/"/>)
    } else {
      return (
        <>
          <div className="container mt-3">
            <h2 className="text-center">Inscription</h2>
            <form method="POST" onSubmit={this.handleFormSubmit}
                  className="row pt-3">
              <div className="form-group col-12">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name"
                       onChange={this.handleNameChange}/>
                {this.state.errors && this.state.errors.name ?
                  <small className="text-danger">{this.state.errors.name}</small> : ''}
              </div>
              <div className="form-group col-12">
                <label htmlFor="mail">Address Email</label>
                <input type="text" className="form-control" id="mail"
                       onChange={this.handleMailChange}/>
                {this.state.errors && this.state.errors.email ?
                  <small className="text-danger">{this.state.errors.email}</small> : ''}
              </div>
              <div className="form-group col-12">
                <label htmlFor="password">Mot de pass</label>
                <input type="password" name="" id="password" className="form-control"
                       onChange={this.handlePasswordChange}/>
                {this.state.errors && this.state.errors.password ?
                  <small className="text-danger">{this.state.errors.password}</small> : ''}
              </div>
              <div className="form-group col-12">
                <label htmlFor="password2">Confirmation mot de passe</label>
                <input type="password" id="password2" className="form-control"
                       onChange={this.handleConfirmPasswordChange}/>
                {this.state.errors && this.state.errors.confirm_password ?
                  <small className="text-danger">{this.state.errors.confirm_password}</small> : ''}
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </>
      );
    }

  }
}

export default Register
