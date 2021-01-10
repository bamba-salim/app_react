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
            <ul className="navbar-nav ml-auto">

              {
                localStorage.getItem('token')
                  ?
                  <>
                    <Link className="nav-link active" to="/pictures/new">Poster une photo</Link>
                    <Link className="nav-link" to="/logout">Se déconnecter</Link>
                  </>
                  :
                  <>
                    <Link className="nav-link active" to="/login">Se connecter</Link>
                    <Link className="nav-link" to="/register">S'inscrire</Link>
                  </>
              }

              {/*<span className="nav-link active pointer" onClick={this.disconect}>Se déconnecter</span>*/}
            </ul>
          </div>
        </nav>
      </>
    );
  }


}

export default Navbar
