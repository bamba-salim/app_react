import React from 'react'
import Navbar from "../_globals/Navbar";
import {Redirect} from "react-router-dom";
import axios from "axios";
import AppLoader from "../_globals/AppLoader";


class Picture extends React.Component {

  constructor() {
    super();
    this.state = {
      id: '',
      redirect: false,
      picture: {}
    }
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      let headers = {headers: {'API_TOKEN': localStorage.getItem('token')}}
      let id = this.props.match.params.id
      axios.get(`http://127.0.0.1:8000/api/pictures/${id}`, headers)
        .then(res => {
          this.setState({picture: res.data})
          document.title = `"${res.data.title}" by ${res.data.user.name} | REACT APP`
        })
        .catch(err => {
          console.log(err)
        })

    } else {
      this.setState({redirect: true})
    }
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/"/>)
    } else {
      return (<>

          <Navbar/>
          <div className="container">
            {
              this.state.picture && this.state.picture.user ?
                (
                  <>
                    <div className="jumbotron jumbotron-fluid mt-3 text-center">
                      <div className="container">
                        <h1 className="display-4">{this.state.picture.title}</h1>
                      </div>
                    </div>

                    <div className="card mb-3">
                      <div className="row no-gutters">
                        <div className="col-12 col-lg-3">
                          <img src={`http://127.0.0.1:8000/storage/pictures/${this.state.picture.image}`}
                               className="card-img"
                               alt={this.state.picture.title}/>
                        </div>
                        <div className="col">
                          <div className="card-body">
                            <p className="card-text">{this.state.picture.description}</p>
                            <p className="card-text"><small
                              className="text-muted">{this.state.picture.created_at}</small>
                            </p>
                            <p className="card-text"><small className="text-muted">{this.state.picture.user.name}</small></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    PHOTO {this.props.match.params.id} WORKS !
                    {JSON.stringify(this.state.picture)}

                  </>

                )
                :
                (
                  <AppLoader/>
                )


            }

          </div>
        </>
      )
    }

  }
}

export default Picture
