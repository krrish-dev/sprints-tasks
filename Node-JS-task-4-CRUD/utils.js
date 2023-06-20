import fetch from "node-fetch";

export const _fetch = (url, method = "GET", { body, headers } = {}) =>
  fetch(url, {
    method,
    body,
    headers,
  }).then((res) => res.json());
