import React from 'react';
import $ from 'jquery';

export default class BiodiversityClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {$subjects: []};
  }

  componentDidMount() {
    const API_KEY = '4d93133f-aa09-4f77-892b-a40c331628ac';
    const MAX_SUBJECTS = 5;

    let _this = this;

    $.ajax({
      url: 'http://www.biodiversitylibrary.org/api2/httpquery.ashx?op=SubjectSearch' +
      '&subject=' + (this.props.term || 'diptera') +
      '&apikey=' + API_KEY,
      dataType: 'xml',
      success: function (xml, textStatus, jqXHR) {
        let $xml = $(xml);
        let $subjects = $xml.find('Result Subject').slice(0, MAX_SUBJECTS);
        _this.setState({$subjects: $subjects});
      }
    });
  }

  render() {
    let items = $.map(
      this.state.$subjects,
      function (subject, index) {
        let $subject = $(subject);
        let subject_name = $subject.find('SubjectText').text();

        return (
          <div>{subject_name}</div>
        );
      }
    );

    return (
      <div>
        <h3>Biodiversity Results: {this.props.term}</h3>
        {items}
      </div>
    );
  }
}
