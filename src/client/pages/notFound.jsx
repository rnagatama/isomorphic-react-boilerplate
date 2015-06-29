import React from 'react';
import DocumentTitle from 'react-document-title';

export default class NotFound extends React.Component {
  render() {
    return (
      <DocumentTitle title="Page Not Found">
        <div>This is not found</div>
      </DocumentTitle>
    );
  }
}