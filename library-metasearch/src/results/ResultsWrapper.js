import React from 'react';
import './Results.css';

export default class ResultsWrapper extends React.Component {
  render() {
    return (
      <div className="results-wrapper grid-item {this.props.class}">
        <div className="results-body">
          <button className="close-btn" onClick={this.props.onClose}>x</button>
          <h3>
            {this.props.api}: {this.props.term}
          </h3>
          {this.props.children}
        </div>
      </div>
    );
  }
}
