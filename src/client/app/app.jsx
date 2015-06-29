import React from 'react';
import {RouteHandler, Link} from 'react-router';
import Component from '../components/component.jsx';

export default class App extends Component {
  render() {
    return (
      <div className="page">
        <div className="nav">
          <Link to="home">Home</Link>
          <Link to="login">Login</Link>
        </div>
        <div className="container">
          <RouteHandler {...this.props} />
        </div>        
      </div>
    );
  }
}