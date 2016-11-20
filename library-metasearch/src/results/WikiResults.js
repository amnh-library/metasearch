import React from 'react';

export default class WikiResults extends React.Component {
  render() {
    let result = this.props.result || {};

    let image_url = result.image_url ||
      "https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2@2x.png";

    let image = result.page_url ? (
      <a href={result.page_url}>
        <img src={image_url} alt={result.title}/>
      </a>
    ) : (
      <img src={image_url} alt={result.title}/>
    );

    return (
      <div>
        <div>
          {image}
          <div>
            <a href={result.page_url}>
              {result.title}
            </a>
          </div>
          <div>
            <i>
              &hellip; {result.snippet} &hellip;
            </i>
          </div>
        </div>
      </div>
    );
  }
}
