// require URLSearchParams;
function route (req, res) {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
  );
}

module.exports = function (app) {

  // Initialize our service with any options it requires
  // app.get('/auth', route(req,res));

  app.get('/auth', (req, res) => {
    // const urlEncoded = new URLSearchParams(query).toString();
  // const { code, client_id } = req.query;
    const state=11111
  // app.get('/test', (req, res) => {
    //   res.redirect(
    //     `https://login.microsoftonline.com/5269b021-533e-4702-b9d9-72acbc852c97/oauth2/v2.0/authorize?client_id=29fa39d4-de57-4009-a46a-c561fa048562&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3030%2Foauth%2Fmicrosoft%2Fcallback&response_mode=query&scope=api%3A%2F%2F29fa39d4-de57-4009-a46a-c561fa048562%2FUser.Info&state=12345
    //     `,
    //   );
    // }); 
    // res.status(301).redirect("/")
    // status 301, resource has moved
    res.status(301).redirect(
      // test sending client id as state with redirect uri.
      // http://localhost/auth-callback
      // http%3A%2F%2Flocalhost%2Fauth-callback%3F11111

      // `https://login.microsoftonline.com/5269b021-533e-4702-b9d9-72acbc852c97/oauth2/v2.0/authorize?client_id=29fa39d4-de57-4009-a46a-c561fa048562&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3030%2Fauth-callback%3Fsession_id%3F11111&response_mode=query&scope=api%3A%2F%2F29fa39d4-de57-4009-a46a-c561fa048562%2FUser.Info&state=12345`,
      `https://login.microsoftonline.com/5269b021-533e-4702-b9d9-72acbc852c97/oauth2/v2.0/authorize?client_id=29fa39d4-de57-4009-a46a-c561fa048562&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3030%2Fauth-callback&response_mode=query&scope=api%3A%2F%2F29fa39d4-de57-4009-a46a-c561fa048562%2FUser.Info&state=${state}`,
    );

    // res.redirect(
    //   `https://login.microsoftonline.com/5269b021-533e-4702-b9d9-72acbc852c97/oauth2/v2.0/authorize?client_id=29fa39d4-de57-4009-a46a-c561fa048562&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3030%2Fauth-callback&response_mode=query&scope=api%3A%2F%2F29fa39d4-de57-4009-a46a-c561fa048562%2FUser.Info&state=12345`,
    // );
  });  
};
