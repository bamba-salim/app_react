import React from 'react'
import Navbar from "./Navbar";
import axios from "axios";
import {Link} from "react-router-dom";


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      pictures: []
    }
  }

  componentDidMount() {
    axios.post('http://127.0.0.1:8000/api/pictures')
      .then(res => {
        this.setState({pictures: res.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleSearchChange = event => {
    this.setState({search: event.target.value}, () => {
      if (this.state.search === '') {
        this.getArticles()
      }
    })

  }

  handleSubmit = event => {
    event.preventDefault()
    this.getArticles()
  }

  getArticles() {
    let bodyFormData = new FormData()
    bodyFormData.set('search', this.state.search)
    axios.post('http://127.0.0.1:8000/api/pictures', bodyFormData)
      .then(res => {
        this.setState({pictures: res.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <>
        <Navbar/>
        <div className="container mt-3">


          <div className="jumbotron jumbotron-fluid mt-3">
            <div className="container">
              <h1 className="display-4">Home</h1>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <form className="form-inline" method="POST" onSubmit={this.handleSubmit}>
              <input type="search" name="search" id="search" className="form-control w-100"
                     placeholder="Rechercher une photo.." onChange={this.handleSearchChange}/>
            </form>
          </div>
          {
            this.state.pictures > 0 ?
              (<>
                <div className="row row-cols-2 row-cols-md-4 mt-3">

                  {
                    this.state.pictures.map((picture) => (
                      <div className="col mb-4" key={picture.id}>
                        <div className="card h-100">
                          <div className="card-header">
                            <h5 className="card-title">{picture.title}</h5>
                          </div>
                          <img src={`http://127.0.0.1:8000/storage/pictures/${picture.image}`} className="card-img-top"
                               alt={picture.title}/>
                          <div className="card-body">
                            <p className="card-text">{picture.description}</p>
                          </div>
                          <div className="card-footer">
                            <div className="ml-auto">
                              <Link to={`/pictures/${picture.id}`} className="btn btn-info">En savoir +</Link>

                            </div>
                          </div>
                        </div>
                      </div>

                    ))


                  }


                </div>
              </>)
              :
              (<>
                <div className="text-center mt-3">
                  <h2>Pas de posts pour le moment...</h2>
                </div>
              </>)

          }

        </div>
      </>
    );
  }

}

export default Home
