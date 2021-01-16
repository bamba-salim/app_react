import React, {Component} from "react";
import Navbar from "../_globals/Navbar";
import axios from "axios";
import {Redirect} from "react-router-dom";

class PostPicture extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      image: '',
      errors: [],
      redirect: false

    }
  }


  handleTitleChange = event => {
    this.setState({title: event.target.value}, () => {
      console.log(this.state.title)
    });
  }

  handleDescriptionChange = event => {
    this.setState({description: event.target.value}, () => {
      console.log(this.state.description)

    });
  }

  handleImageChange = event => {
    this.setState({image: event.target.files[0]}, () => {
      console.log(this.state.image)

    });
  }

  handleFormSubmit = event => {

    event.preventDefault()
    let bodyFormData = new FormData();
    bodyFormData.set('title', this.state.title)
    bodyFormData.set('description', this.state.description)
    bodyFormData.set('image', this.state.image)

    let headers = {headers: {'API_TOKEN': localStorage.getItem('token')}}


    axios.post('http://127.0.0.1:8000/api/pictures/new', bodyFormData, headers)
      .then(res => {
        this.setState({redirect: true})
        console.log(res)
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.setState({errors: err.response.data.errors})
          console.log(this.state.errors)
        }
      })
  }


  render() {
    if (this.state.redirect) {
      return (<Redirect to="/"/>)
    } else {

      return (
        <>
          <Navbar/>

          <div className="container mt-3">
            <h2 className="text-center">Poster une photo</h2>
            <form method="POST" onSubmit={this.handleFormSubmit} className="row pt-3" encType="multipart/form-data">

              <div className="form-group col-12">
                <label htmlFor="title">Titre</label>
                <input type="text"
                       className={`form-control ${(this.state.errors && this.state.errors.title) ? "is-invalid" : ""}`}
                       id="title" onChange={this.handleTitleChange}/>
                {this.state.errors && this.state.errors.title ?
                  <small className="text-danger">{this.state.errors.title}</small> : ''}
              </div>

              <div className="form-group col-12">
                <label htmlFor="description">Description</label>
                <textarea id="description"
                          className={`form-control ${(this.state.errors && this.state.errors.description) ? "is-invalid" : ""}`}
                          onChange={this.handleDescriptionChange} placeholder="Description" rows="5"/>
                {this.state.errors && this.state.errors.description ?
                  <small className="text-danger">{this.state.errors.description}</small> : ''}
              </div>

              <div className="form-group col-12">
                <label htmlFor="Image">Image</label>
                <input id="image" type="file"
                       className={`form-control-file ${(this.state.errors && this.state.errors.image) ? "is-invalid" : ""}`}
                       onChange={this.handleImageChange}/>
                {this.state.errors && this.state.errors.image ?
                  <small className="text-danger">{this.state.errors.image}</small> : ''}
              </div>

              <div className="form-group col-12">
                <button type="submit" className="btn btn-primary">Ajouter</button>
              </div>
            </form>
          </div>
        </>
      );
    }
  }

}

export default PostPicture
