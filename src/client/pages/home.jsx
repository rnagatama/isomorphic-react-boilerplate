import React from 'react';
import DocumentTitle from 'react-document-title';
import request from 'superagent';
import Promise from 'bluebird';
import Component from '../components/component.jsx';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foo: props.home.foo
    };
  }

  static fetchData(token, params, query) {
    return new Promise((resolve, reject) => {
      // TODO: create error handler if something goes wrong fetching data from the API
      // TODO: create a helper function to request to web API
      request.get('http://localhost:3000/api/v1')
        .accept('json')
        .end((err, res) => {
          err ? reject(err) : resolve(res.body);
        });
    });
  }

  render() {
    return (
      <DocumentTitle title="Home">
        <div>This is home {this.state.foo}</div>
      </DocumentTitle>
    );
  }
}

export default Home;