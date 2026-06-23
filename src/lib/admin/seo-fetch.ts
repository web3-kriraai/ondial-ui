/** Send the HttpOnly SEO session cookie on same-origin API requests. */
export const SEO_FETCH_INIT: RequestInit = {
  credentials: "include",
};
