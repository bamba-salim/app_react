import React from 'react'

class Home extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <>
        <div className="container mt-3">
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">Home</h1>
              <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its
                parent.</p>
            </div>
          </div>
        </div>
      </>
    );
  }

}

export default Home
