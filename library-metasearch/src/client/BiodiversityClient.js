import $ from 'jquery';

const API_BASE_URL = 'http://www.biodiversitylibrary.org/api2/httpquery.ashx';

const API_KEY = '4d93133f-aa09-4f77-892b-a40c331628ac';

const MAX_CREATORS = 3;

const MAX_SUBJECTS = 20;

const MAX_TITLES = 3;

function parseCreators(xml) {
  let $xml = $(xml);
  let $creators = $xml.find('Result Creator').slice(0, MAX_CREATORS);

  return $.map(
    $creators,
    function (creator) {
      let $creator = $(creator);
      return $creator.find('CreatorID').text();
    }
  );
}

function parseSubjects(xml) {
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

function parseTitles(xml) {
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

function parseItem(title, xml) {
  let $xml = $(xml);

  let $items = $xml.find('Result Item');

  if ($items.length > 0) {
    let $item = $items.first();

    return {
      item_thumbnail_url: $item.find('ItemThumbUrl').text(),
      short_title: title.short_title,
      title_id: title.title_id,
      title_url: $item.find('TitleUrl').text(),
      year: $item.find('Year').text(),
    };
  } else {
    return null;
  }
}

function fetchTitlesForAuthors(creator_ids) {
  if (creator_ids.length > 0) {
    return creator_ids.map(function (creator_id) {
      return fetchTitlesForAuthor(creator_id);
    });
  } else {
    return Promise.resolve({});
  }
}

function fetchTitlesForAuthor(creator_id) {
  if (creator_id) {
    return queryBiodiversity(
      'GetAuthorTitles',
      {creatorid: creator_id},
      (xml, textStatus, jqXHR) => {
        let titles = parseTitles(xml);

        return Promise.all(fetchItemsForTitles(titles)).then(items => {
          return {
            title_items: items,
          };
        });
      });
  } else {
    return Promise.resolve({});
  }
}

function fetchSubjectTitles(subject_names) {
  if (subject_names.length > 0) {
    return queryBiodiversity(
      'GetSubjectTitles',
      {subject: subject_names[0]},
      (xml, textStatus, jqXHR) => {
        let titles = parseTitles(xml);

        return Promise.all(fetchItemsForTitles(titles)).then(items => {
          return {
            title_items: items,
          };
        });
      });
  } else {
    return Promise.resolve({});
  }
}

function fetchItemsForTitles(subject_titles) {
  if (subject_titles.length > 0) {
    return subject_titles.map(function (subject_title) {
      return fetchItemForTitle(subject_title);
    });
  } else {
    return [];
  }
}

function fetchItemForTitle(subject_title) {
  if (subject_title) {
    return queryBiodiversity(
      'GetTitleItems',
      {titleid: subject_title.title_id},
      (xml, textStatus, jqXHR) => {
        return parseItem(subject_title, xml);
      });
  } else {
    return Promise.resolve({});
  }
}

function searchAuthor(term) {
  if (term) {
    return queryBiodiversity(
      'AuthorSearch',
      {name: term},
      (xml, textStatus, jqXHR) => {
        let creators = parseCreators(xml);

        return Promise.all(fetchTitlesForAuthors(creators))
          .then(results => {
            let merged_items = [];

            $.each(results, function (index, result) {
              if (!$.isEmptyObject(result) && result.title_items.length > 0) {
                $.merge(merged_items, result.title_items);
              }
            });

            return {title_items: merged_items};
          })
          .catch(() => {
            return Promise.resolve({});
          });
      });
  } else {
    return Promise.resolve({});
  }
}

function searchSubject(term) {
  if (term) {
    return queryBiodiversity(
      'SubjectSearch',
      {subject: term},
      (xml, textStatus, jqXHR) => {
        let subject_names = parseSubjects(xml);
        return fetchSubjectTitles(subject_names);
      });
  } else {
    return Promise.resolve({});
  }
}

function searchTitle(term) {
  if (term) {
    return queryBiodiversity(
      'TitleSearchSimple',
      {title: term},
      (xml, textStatus, jqXHR) => {
        let titles = parseTitles(xml);

        return Promise.all(fetchItemsForTitles(titles)).then(items => {
          return {
            title_items: items,
          };
        });
      }
    );
  } else {
    return Promise.resolve({});
  }
}

function queryBiodiversity(operation, data, promise) {
  return $.ajax({
    url: API_BASE_URL,
    method: 'GET',
    data: $.extend(
      {
        op: operation,
        apikey: API_KEY,
      },
      data
    ),
    dataType: 'xml',
  }).then(promise).catch(() => {
    return Promise.resolve({});
  });
}

function run(term) {
  let searches = [
    searchSubject(term),
    searchTitle(term),
    searchAuthor(term),
  ];

  return Promise.all(searches).then(results => {
    let merged_items = [];
    $.each(results, function (index, result) {
      if (!$.isEmptyObject(result) && result.title_items.length > 0) {
        $.merge(merged_items, result.title_items);
      }
    });

    if (merged_items.length > 0) {
      return {title_items: merged_items.slice(0, MAX_TITLES)};
    } else {
      return {};
    }
  });
}

export default {
  run: run,
};
