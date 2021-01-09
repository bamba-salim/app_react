import React from "react";
import axios from "axios";
import {Redirect} from 'react-router-dom';

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      mail: '',
      comfirm_password: '',
      redirect: false
    }

  }


  handleMailChange = event => {
    this.setState({mail: event.target.value}, () => {
      console.log(this.state.mail)
    });
  }

  handlePasswordChange = event => {
    this.setState({password: event.target.value}, () => {
      console.log(this.state.password)
    });
  }


  handleFormSubmit = event => {
    event.preventDefault()
    let bodyFormData = new FormData();
    bodyFormData.set('email', this.state.mail)
    bodyFormData.set('password', this.state.password)

    axios.post('http://127.0.0.1:8000/api/login', bodyFormData)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('token',res.data.api_token)
        this.setState({redirect: true})
      })
      .catch(err => {
        console.log('err')
      })
  }

  render() {
    if (this.state.redirect || localStorage.getItem('token')) {
      return (<Redirect to="/"/>)
    } else {
      return (
        <>
          <div className="container mt-3">
            <h2 className="text-center">Connexion</h2>
            <form method="POST" onSubmit={this.handleFormSubmit}>

              <div className="form-group">
                <label htmlFor="mail">Address Email</label>
                <input type="text" className="form-control" id="mail" onChange={this.handleMailChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Mot de pass</label>
                <input type="password" name="" id="password" className="form-control"
                       onChange={this.handlePasswordChange}/>
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </>
      );
    }
  }
}

export default Login
