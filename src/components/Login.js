import React, {Component} from "react";
import axios from "axios";
import {Redirect} from 'react-router-dom';
import Navbar from "./_globals/Navbar";

class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      redirect: false,
      errors: []
    }

  }


  handleMailChange = event => {
    this.setState({email: event.target.value}, () => {

    });
  }


  handlePasswordChange = event => {
    this.setState({password: event.target.value}, () => {
    });
  }


  handleFormSubmit = event => {
    event.preventDefault()
    let bodyFormData = new FormData();
    bodyFormData.set('email', this.state.email)
    bodyFormData.set('password', this.state.password)


    axios.post('http://127.0.0.1:8000/api/login', bodyFormData)
      .then(res => {
        localStorage.setItem('token', res.data.api_token)
        this.setState({redirect: true})
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.setState({errors: err.response.data.errors})
        }
      })
  }

  render() {
    if (this.state.redirect || localStorage.getItem('token')) {
      return (<Redirect to="/"/>)
    } else {
      return (
        <>
          <Navbar/>
          <div className="container mt-3">
            <h2 className="text-center">Connexion</h2>
            <form method="POST" onSubmit={this.handleFormSubmit} className="row pt-3">

              <div className="form-group col-12">
                <label htmlFor="mail">Address Email</label>
                <input type="text"
                       className={`form-control ${(this.state.errors && this.state.errors.email) || this.state.errors.identifiant ? "is-invalid" : ""}`}
                       id="mail" onChange={this.handleMailChange}/>
                {this.state.errors && this.state.errors.email ?
                  <small className="text-danger">{this.state.errors.email}</small> : ''}
              </div>

              <div className="form-group col-12">
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password"
                       className={`form-control ${(this.state.errors && this.state.errors.password) || this.state.errors.identifiant ? "is-invalid" : ""}`}
                       onChange={this.handlePasswordChange}/>
                {this.state.errors && this.state.errors.password ?
                  <small className="text-danger">{this.state.errors.password}</small> : ''}

              </div>
              <div className="form-group col-12 m-0">
                {this.state.errors && this.state.errors.identifiant ?
                  <div className="alert alert-danger w-100">{this.state.errors.identifiant}</div> : ''}
              </div>

              <div className="form-group col-12">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>

            </form>
          </div>
        </>
      );
    }
  }
}

export default Login
