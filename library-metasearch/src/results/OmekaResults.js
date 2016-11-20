import React from 'react';

export default class OmekaResults extends React.Component {
  render() {
    let results = this.props.results || {};

    if (results.length > 0) {
    return (
      <div>
        <div className='omeka'>
        {results.map(function (result, index) {
          return (<div key={result.url}>
            <img src={result.url} alt="Omeka" />
          </div>)
        })}
        </div>
      </div>
    );
    }
  }
}
