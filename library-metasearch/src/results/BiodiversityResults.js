import React from 'react';

export default class BiodiversityResults extends React.Component {
  render() {
    let results = this.props.results || [];
    let title_items = results.title_items || [];

    return (
      <div>
        <h3>Biodiversity Results: {this.props.term}</h3>
        {title_items.map(function (title_item, index) {
          return (
            <div key={title_item.title_id}>
              <a href="title_item.title_url">
                <img src={title_item.item_thumbnail_url} height="100" alt={title_item.short_title}/>
                <br/>
                {title_item.short_title}
              </a>
            </div>
          );
        })}
      </div>
    );
  }
}
