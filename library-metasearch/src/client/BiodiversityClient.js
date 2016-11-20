import $ from 'jquery';

const API_BASE_URL = 'http://www.biodiversitylibrary.org/api2/httpquery.ashx';

const API_KEY = '4d93133f-aa09-4f77-892b-a40c331628ac';

const MAX_SUBJECTS = 20;

const MAX_TITLES = 5;

function parseSubjectNames(xml) {
  let $xml = $(xml);
  let $subjects = $xml.find('Result Subject').slice(0, MAX_SUBJECTS);

  let subject_names = $.map(
    $subjects,
    function (subject) {
      let $subject = $(subject);
      return $subject.find('SubjectText').text();
    }
  );

  // filter out subject names with spaces because the BHL API for GetSubjectTitles can not
  // handle subjects with whitespace in them
  return subject_names.filter(function (subject_name) {
    return !subject_name.includes(' ');
  });
}

function parseSubjectTitles(xml) {
  let $xml = $(xml);

  let $titles = $xml.find('Result Title').slice(0, MAX_TITLES);

  return $.map(
    $titles,
    function (title) {
      let $title = $(title);
      return {
        title_id: $title.find('TitleID').text(),
        short_title: $title.find('ShortTitle').text(),
      };
    }
  );
}

function parseTitleItem(subject_title, xml) {
  let $xml = $(xml);

  let $items = $xml.find('Result Item');

  if ($items.length == 1) {
    let $item = $items.first();

    return {
      title_id: subject_title.title_id,
      short_title: subject_title.short_title,
      item_thumbnail_url: $item.find('ItemThumbUrl').text(),
      title_url: $item.find('TitleUrl').text(),
    };
  } else {
    return null;
  }
}

function fetchSubjectTitles(subject_names) {
  if (subject_names) {
    return $.ajax({
      url: API_BASE_URL,
      method: 'GET',
      data: {
        op: 'GetSubjectTitles',
        subject: subject_names[0],
        apikey: API_KEY,
      },
    }).then((xml, textStatus, jqXHR) => {
      let subject_titles = parseSubjectTitles(xml);

      let title_item_promises = fetchTitleItems(subject_titles);

      return Promise.all(title_item_promises).then(title_items => {
        return {
          subject_titles: subject_titles,
          title_items: title_items,
        };
      });

    });
  } else {
    // todo empty promise
    return {};
  }
}

function fetchTitleItems(subject_titles) {
  if (subject_titles) {
    return subject_titles.map(function (subject_title) {
      return fetchTitleItem(subject_title);
    });
  } else {
    return [];
  }
}

function fetchTitleItem(subject_title) {
  if (subject_title) {
    return $.ajax({
      url: API_BASE_URL,
      method: 'GET',
      data: {
        op: 'GetTitleItems',
        titleid: subject_title.title_id,
        apikey: API_KEY,
      },
      dataType: 'xml',
    }).then((xml, textStatus, jqXHR) => {
      return parseTitleItem(subject_title, xml);
    });
  } else {
    return {};
  }
}

function run(term) {
  if (term) {
    return $.ajax({
      url: API_BASE_URL,
      method: 'GET',
      data: {
        op: 'SubjectSearch',
        subject: term,
        apikey: API_KEY,
      },
      dataType: 'xml',
    }).then((xml, textStatus, jqXHR) => {
      let subject_names = parseSubjectNames(xml);
      return fetchSubjectTitles(subject_names).then(result => {
        return $.extend(
          {subject_names: subject_names},
          result
        );
      });
    });
  } else {
    // todo empty promise
    return {};
  }
}

export default {
  run: run,
};
