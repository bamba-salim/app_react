import React from "react";
import {Link} from 'react-router-dom'

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isConnect: false
    }
  }


  logout = event => {
    localStorage.removeItem('token')
    this.setState({isConnect: false})
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
              {
                localStorage.getItem('token')
                  ?
                  <>

                    <Link className="nav-link" to="/pictures/new">Poster une photo</Link>
                    <span className="nav-link" onClick={this.logout} style={{cursor: 'pointer'}}>Se déconnecter</span>
                  </>
                  :
                  <>
                    <Link className="nav-link" to="/login">Se connecter</Link>
                    <Link className="nav-link" to="/register">S'inscrire</Link>
                  </>
              }
            </div>
          </div>
        </nav>
      </>
    );
  }


}

export default Navbar
