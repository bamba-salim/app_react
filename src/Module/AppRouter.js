import React from "react";
import {Switch, Route} from 'react-router-dom'
import Home from "../components/_globals/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import PostPicture from "../components/PostPicture";

class AppRouter extends React.Component {

  render() {
    return (
      <>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/pictures/new" component={PostPicture}/>
        </Switch>

      </>

    );
  }

}

export default AppRouter
