import React from 'react'
import {
  Router,
  Route,
  
  Switch
} from 'react-router-dom';
import Chat from './Container/embededChat';
import Login from './Container/login/login';
import SignUp from './Container/signup/signup';
import Home from './Container/home';
// import createBrowserHistory from 'history/createBrowserHistory'
// import { Route, Router, browserHistory } from 'react-router';
import History from './History';

class Routers extends React.Component {
  render() {
    return (
        <Router history = {History}>
        <Switch>   
          <Route exact path="/" component={Login}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/home" component={Home}/>
          {/* <Route exact path="/home/:id" component={Child}/>    */}
          <Route exact path="/chat" component={Chat}/>          
                 

          {/* <Route path="/topics" component={Topics}/> */}
        </Switch>
      </Router>
      // <Router history={browserHistory}>
      //     <Route exact path="/" component={Login} />
      //     <Route path="/signup" component={SignUp} />
      //     <Route path="/home" component={Home} />
      // </Router>
    )
  }
}
export default Routers;