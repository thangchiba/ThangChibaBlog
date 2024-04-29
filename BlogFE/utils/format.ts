export function createUrl(base, ...paths) {
  // First join all parts of the URL.
  const url = [base, ...paths].join('/')

  // Replace all instances of multiple slashes with a single slash, except after the protocol part.
  return url.replace(/([^:]\/)\/+/g, '$1')
}
