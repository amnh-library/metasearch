import $ from 'jquery';

const API_BASE_URL = 'http://www.biodiversitylibrary.org/api2/httpquery.ashx';

const API_KEY = '4d93133f-aa09-4f77-892b-a40c331628ac';

const MAX_SUBJECTS = 5;

function getSubjectNames(xml) {
  let $xml = $(xml);
  let $subjects = $xml.find('Result Subject').slice(0, MAX_SUBJECTS);

  return $.map(
    $subjects,
    function (subject) {
      let $subject = $(subject);
      return $subject.find('SubjectText').text();
    }
  );
}

function run(term, callback) {
  $.ajax({
    url: API_BASE_URL,
    method: 'GET',
    data: {
      op: 'SubjectSearch',
      subject: term,
      apikey: API_KEY
    },
    dataType: 'xml',
    success: function (xml, textStatus, jqXHR) {
      let subject_names = getSubjectNames(xml);
      callback({subject_names: subject_names});
    }
  });
}

export default run;
