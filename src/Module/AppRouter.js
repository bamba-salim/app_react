import React from "react";
import {Switch, Route} from 'react-router-dom'
import Home from "../components/_globals/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import PostPicture from "../components/Pictures/PostPicture";
import Picture from "../components/Pictures/Picture";

class AppRouter extends React.Component {

  render() {
    return (
      <>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/pictures/new" component={PostPicture}/>
          <Route path="/pictures/:id" component={Picture}/>
        </Switch>

      </>

    );
  }

}

export default AppRouter
