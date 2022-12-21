
module.exports = function (app) {

  // Initialize our service with any options it requires
  // app.get('/auth', route(req,res));

  app.get('/signout', (req, res) => {
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
      // https://stackoverflow.com/questions/45935305/azure-ad-logout-url-not-redirecting
      // test sending client id as state with redirect uri.
      // http://localhost/auth-callback
      // http%3A%2F%2Flocalhost%2Fauth-callback%3F11111
      // Name:AzureTokenTest
      // `https://login.microsoftonline.com/5269b021-533e-4702-b9d9-72acbc852c97/oauth2/v2.0/authorize?client_id=29fa39d4-de57-4009-a46a-c561fa048562&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3030%2Fauth-callback%3Fsession_id%3F11111&response_mode=query&scope=api%3A%2F%2F29fa39d4-de57-4009-a46a-c561fa048562%2FUser.Info&state=12345`,
      // `https://login.microsoftonline.com/5269b021-533e-4702-b9d9-72acbc852c97/oauth2/v2.0/authorize?client_id=29fa39d4-de57-4009-a46a-c561fa048562&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3030%2Fauth-callback&response_mode=query&scope=api%3A%2F%2F29fa39d4-de57-4009-a46a-c561fa048562%2FUser.Info&state=${state}`,
      `https://login.microsoftonline.com/5269b021-533e-4702-b9d9-72acbc852c97/oauth2/logout?post_logout_redirect_uri=https%3A%2F%2Flocalhost%3A3000%2F`,
      // https://dev-gfcd1ld5m2jtz0m0.us.auth0.com/v2/logout?federated&client_id=IGs15ncDb9uKQujCzzSYUm8qFgnqaTE5&returnTo=http://localhost:3000"
    );
    // https://login.windows.net/<tenant_id_of_your_app>/oauth2/logout?post_logout_redirect_uri=<logout_URL_of_your_app>/logout
    // https://login.microsoftonline.com/f4aaf6e1-ffff-ffff-bb63-4e8ebf728113/oauth2/logout?client_id=f562b4e3-ffff-ffff-b4bb-49ca64216e75&post_logout_redirect_uri=https%3A%2F%2Fmyazureapp.azurewebsites.net
    // res.redirect(
    //   `https://login.microsoftonline.com/5269b021-533e-4702-b9d9-72acbc852c97/oauth2/v2.0/authorize?client_id=29fa39d4-de57-4009-a46a-c561fa048562&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3030%2Fauth-callback&response_mode=query&scope=api%3A%2F%2F29fa39d4-de57-4009-a46a-c561fa048562%2FUser.Info&state=12345`,
    // );
  });  
};