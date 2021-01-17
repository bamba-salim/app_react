import React from 'react'
import Navbar from "../_globals/Navbar";
import {Redirect} from "react-router-dom";
import axios from "axios";
import AppLoader from "../_globals/AppLoader";
import DayJS from 'react-dayjs';
import {Favorite, FavoriteBorder} from "@material-ui/icons";


class Picture extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      redirect: false,
      picture: {},
      liked: false,
      countLikes: ''
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id
    axios.get(`http://127.0.0.1:8000/api/pictures/${id}`)
      .then(res => {
        this.setState({picture: res.data})
        document.title = `"${res.data.title}" by ${res.data.user.name} | REACT APP`
        if (localStorage.getItem('token')) {
          this.checkLikes()
        }
        this.countLikes()
      })
      .catch(err => {
        console.log(err)
      })
  }

  checkLikes() {
    let headers = {headers: {'token': localStorage.getItem('token')}}

    axios.get(`http://127.0.0.1:8000/api/pictures/${this.state.picture.id}/checkLike`, headers)
      .then(res => {
        this.setState({liked: res.data},()=>{
          this.countLikes()
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  countLikes() {
    axios.get(`http://127.0.0.1:8000/api/pictures/${this.state.picture.id}/countLikes`)
      .then(res => {
        this.setState({countLikes: res.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleLike = event => {
    let id = this.props.match.params.id
    if (localStorage.getItem('token')) {

      let headers = {headers: {'token': localStorage.getItem('token')}}

      axios.get(`http://127.0.0.1:8000/api/pictures/${id}/handleLike`, headers)
        .then(res => {
          this.checkLikes()
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      //
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
              this.state.picture && this.state.picture.user && (this.state.liked || !this.state.liked) && (this.state.countLikes || !this.state.countLikes) ?
                (
                  <>
                    <div className="jumbotron jumbotron-fluid mt-3 text-center">
                      <div className="container">
                        <h1 className="display-4">{this.state.picture.title}</h1>
                        <p className="card-text">
                          <small className="text-muted">
                            Postée le <DayJS format="dddd DD MMMM  YYYY"
                                             date={this.state.picture.created_at}/> par {this.state.picture.user.name}
                          </small>
                        </p>
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
                            <div>
                              <span onClick={this.handleLike}>
                                                              {
                                                                this.state.liked ?
                                                                  (<>
                                                                    <Favorite className="text-danger"/>
                                                                  </>)
                                                                  :
                                                                  (<>
                                                                    <FavoriteBorder/>
                                                                  </>)

                                                              }
                              </span>

                              {this.state.countLikes} J'aime
                            </div>
                            <div>
                              <p className="card-text">{this.state.picture.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

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
