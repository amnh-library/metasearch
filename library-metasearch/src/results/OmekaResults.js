import React from 'react';

export default class OmekaResults extends React.Component {
  render() {
    let results = this.props.results || {};

    if (results.length > 0) {
    return (
      <div>
        <div className='omeka'>
        {results.map(function (result, index) {
          return (<div className='sub-item' key={result.url}>
            <a href={result.url}>
              <img src={result.url} alt="Omeka" />
            </a>
          </div>)
        })}
        </div>
      </div>
    );
    }
  }
}
