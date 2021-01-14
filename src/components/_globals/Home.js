import React from 'react'
import Navbar from "./Navbar";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <>
        <Navbar/>
        <div className="container mt-3">
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">Home</h1>
              <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its
                parent.</p>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-3">
            <div className="col mb-4">
              <div className="card h-100">
                <div className="card-header">                    <h5 className="card-title">Card title</h5>
                </div>
                <img src="https://fakeimg.pl/400x400/282828/eae0d0/" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <p className="card-text">This is a longer card with supporting text below as a natural lead-in to
                      additional content. This content is a little bit longer.</p>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </>
    );
  }

}

export default Home
