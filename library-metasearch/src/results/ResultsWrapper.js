import React from 'react';
import './Results.css';

export default class ResultsWrapper extends React.Component {
  render() {
    return (
      <div className={"results-wrapper grid-item age-" + this.props.age}>
        <div className="results-body">
          <h3>
            <span>{this.props.api}: </span>
            {this.props.term} ({this.props.number_results})
            <button className="close-btn" onClick={this.props.onClose}>&times;</button>
          </h3>
          {this.props.children}
        </div>
      </div>
    );
  }
}
