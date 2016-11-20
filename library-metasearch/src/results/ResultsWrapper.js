import React from 'react';
import './Results.css';

export default class ResultsWrapper extends React.Component {
  render() {
    return (
      <div className="results-wrapper">
        {this.props.children}
        <button className="close-btn" onClick={this.props.onClose}>x</button>
      </div>
    );
  }
}
