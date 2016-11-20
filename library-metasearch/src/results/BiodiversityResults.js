import React from 'react';
import generic_book from '../img/generic-book.png'

export default class BiodiversityResults extends React.Component {
  render() {
    let result = this.props.result || [];
    let title_items = result.title_items || [];

    if (title_items.length > 0) {
      return (
        <div className="horizontal-flex">
          {title_items.map(function (title_item, index) {
            let image = title_item.item_thumbnail_url ? (
              <a href={title_item.title_url}>
                <img src={title_item.item_thumbnail_url} alt={title_item.short_title}/>
              </a>
            ) : (
              <img src={generic_book} alt={title_item.short_title}/>
            );

            return (
              <div key={title_item.title_id}>
                {image}
                <br/>
                <a href={title_item.title_url}>
                  {title_item.short_title}
                </a>
              </div>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  }
}
