import React from 'react';
import './Results.css';

export default class ResultsWrapper extends React.Component {
  render() {
    return (
      <div className="results-wrapper">
        <button className="close" onClick={this.props.onClose}>Close</button>
        {this.props.children}
      </div>
    );
  }
}
