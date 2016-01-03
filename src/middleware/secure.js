
export default function() {
  return function(app) {
    if (process.env.NODE_ENV !== 'production') {
      return app;
    }
    const { request } = app;
    return {
      ...app,
      request(req, res) {
        // https://www.owasp.org/index.php/List_of_useful_HTTP_headers
        res.setHeader('Strict-Transport-Security', 'max-age=16070400');
        res.setHeader('X-Frame-Options', 'deny');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('X-Download-Options', 'noopen');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        request(req, res);
      },
    };
  };
}
