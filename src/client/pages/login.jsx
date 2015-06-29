import React from 'react';
import DocumentTitle from 'react-document-title';

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <DocumentTitle title="Login">
        <form method="post" onSubmit={this._onSubmit}>
          <input type="text" name="username" value={this.state.username} onChange={this._onFieldChange('username')} placeholder="Username" /><br />
          <input type="password" name="password" value={this.state.password} onChange={this._onFieldChange('password')} placeholder="Password" /><br />
          <button type="submit">Login</button>
        </form>
      </DocumentTitle>
    );
  }

  _onFieldChange(name) {
    var self = this;
    return (e) => {
      e.preventDefault();
      var nextState = {};
      nextState[name] = e.target.value;
      self.setState(nextState);
    }
  }

  _onSubmit(e) {
    //e.preventDefault();
    // validate
    // ...

    // login
    // ...
  }
}