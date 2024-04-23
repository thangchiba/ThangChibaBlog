export function createUrl(base, ...paths) {
  return [base, ...paths].join('/').replace(/\/\/+/g, '/')
}
