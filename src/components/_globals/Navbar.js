import React from "react";
import {Link} from 'react-router-dom'

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  disconect = event => {
    console.log('déconnecté')
    localStorage.removeItem('token')
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">REACT APP</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                  aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
              <Link className="nav-link active" to="/login">Se connecter </Link>
              <Link className="nav-link active" to="/register">S'inscrire </Link>
              <span className="nav-link active pointer" onClick={this.disconect} >Se déconnecter</span>
            </div>
          </div>
        </nav>
      </>
    );
  }


}

export default Navbar
