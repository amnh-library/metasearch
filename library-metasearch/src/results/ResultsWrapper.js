import React from 'react';

export default class ResultsWrapper extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onClose}>Close</button>
        {this.props.children}
      </div>
    );
  }
}
