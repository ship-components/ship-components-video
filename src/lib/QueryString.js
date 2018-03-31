/**
 * Parses key/value strings. Default usage for window.location.search, but can be used to parse document.cookie
 * @param  {String} queryString
 * @param  {String} splitChar
 * @return {Object}
 */
export function queryString2Map(queryString = window.location.search, splitChar = '&') {
  if (queryString.substring(0, 1) === '?') {
    queryString = queryString.substring(1);
  }

  if (queryString === '') {
    return {};
  }

  const querySet = queryString.split(splitChar);
  let queryMap = {};

  querySet.forEach((str) => {
    const pair = str.split('=');
    const key = (pair[0] || '').trim();
    const value = (pair[1] || '').trim();
    switch (value) {
    case '':
    case 'true':
      queryMap[key] = true;
      break;
    case 'false':
      queryMap[key] = false;
      break;
    default:
      queryMap[key] = value;
    }
  });

  return queryMap;
}

/**
 * By default just export an object with the current query params
 */
export default queryString2Map();

/**
 * convert a map to a query string (no '?')
 * @param  {object} map
 * @return {string}
 */
export function map2QueryString(map) {
  let queryString = '';
  Object.keys(map).forEach((key) => {
    queryString += `${key}=${map[key]}&`;
  });
  queryString = queryString.slice(0,-1);
  return queryString;
}

export function cookie2Map(cookieString) {
  return queryString2Map(cookieString, ';');
}
