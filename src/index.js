import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import App from './App';
import Editor from './Editor'; 

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('username') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <PrivateRoute path="/editor/:id" component={Editor} />
    </Switch>
  </Router>,
  document.getElementById('root')
);