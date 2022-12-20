// function route (req, res) {
//   res.redirect(
//     `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
//   );
// }
const axios = require('axios');
const path = require('path');
const jwt_decode = require('jwt-decode');
// var querystring = require('querystring');
var qs = require('qs');
const logger = require('../logger');
const { authenticate } = require('@feathersjs/express');
var g_state = 1;
module.exports = function (app) {

  // Initialize our service with any options it requires
  // app.get('/auth', route(req,res));
  // res.render('index.html', { title: 'Express' });
  // https://stackoverflow.com/questions/28352871/in-express-how-do-i-redirect-a-user-to-an-external-url
  // https://fusebit.io/blog/oauth-state-parameters-nodejs/?utm_source=www.google.com&utm_medium=referral&utm_campaign=none

  // https://fusebit.io/blog/oauth-state-parameters-nodejs/?utm_source=www.google.com&utm_medium=referral&utm_campaign=none
  // goal: to get the email from microsoft login to the client so that it can call the authenticate function.
  // 0. browser script creates a client_id random_number
  // 1. from browser redirect to /microsoft-login with redirect_url?client_id=client_id 
  // 2. from app route /auth-callback parse for client_id and code 
  // 3. use code to get access_token 
  // 4. on success create message with client_id and email  
  // 5. browser gets message with random_number then calls authenticate with email. 

  // app.get('/auth-callback', async ({ query: { code }}, res,next) => {
  app.get('/auth-callback', async (req, res) => {
      //Extracting code and state
    const { state, code } = req.query;
    g_state = state;
    res.redirect("http://localhost:3000/?session_id=2");

    var res2 = axios.post('https://login.microsoftonline.com/5269b021-533e-4702-b9d9-72acbc852c97/oauth2/v2.0/token',
      qs.stringify({
        client_id:'29fa39d4-de57-4009-a46a-c561fa048562',
        scope:'api://29fa39d4-de57-4009-a46a-c561fa048562/User.Info',
        code:code,
        redirect_uri:'http://localhost:3030/auth-callback',
        grant_type:'authorization_code',
        state:state
      }),{
        // timeout:10, // in ms the default is 0 which is no timeout limit.
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }).then(function(response) {

          // console.log(response.data.access_token);
          const decoded = jwt_decode(response.data.access_token);
          // logger.info('jwt:%s', JSON.stringify(decoded))
          logger.info('jwt: %o', decoded);
          const email = decoded.email;
          const upn = decoded.upn;
          const name = decoded.name;
          const family_name = decoded.family_name;
          const given_name = decoded.given_name;
          const groups = decoded.groups;
          const password = 'passwordless';

          logger.info('jwt: %o', {email,upn,name,family_name,given_name,groups});
          app
          .service('users')
          .create({ email, password })
          .then(() => {
            logger.info('now try to login');
          }) 
          .then(() => {
            logger.info('now try to logout');
          }).catch((err) => { 
            if(err.code == 409)
            {
              logger.info('%o', err);
              logger.info('now try to login');
              // res.redirect("/");
              app
              .service('messages')
              .create({ text:'test',userId:'test' })
              .catch((err) => { 
              logger.info('%o', err);
              });              
              // https://docs.feathersjs.com/api/authentication/service.html#configuration    
              // Call the strategy .authenticate method with data
              // Create a JWT for the entity returned by the strategy
              // Return the JWT (accessToken) and the additional information from the strategy
              app.service('/authentication')
              .create({
                strategy: 'local',
                email,
                password:'passwordless'
              }).then((authResult) => {
                  logger.info('now try to logout %o',authResult);
                  res.redirect("/");
                  // res.render('index.html', { title: 'Express' });
              }).catch((err) => { 
                  logger.info('%o', err);
              })
              // res.redirect('/');
              // app.service('/authentication').create(data) 
              // or POST /authentication 
              // with data as { strategy: name, ...loginData }. Internally authentication will then

              // Call the strategy .authenticate method with data
              // Create a JWT for the entity returned by the strategy
              // Return the JWT (accessToken) and the additional information from the strategy
              

            }
            else
            {
              logger.info('%o', err);
            }
            // console.log(err.message )
            // response.status(500).json({ err: err.message })
          });
                
          // app
          // .authenticate({
          //   strategy: 'local',
          //   email,
          //   password:'passwordless'
          // })
          // .catch(err => setError(err));

          // function login() {
          //   return client
          //     .authenticate({
          //       strategy: 'local',
          //       email,
          //       password,
          //     })
          //     .catch(err => setError(err));
          // }
          // https://www.codementor.io/@prasadsaya/working-with-arrays-in-mongodb-16s303gkd3
        }).catch((err) => { 
          logger.info('%o', err);
        // console.log(err.message )
        // response.status(500).json({ err: err.message })
      });

  });  
};
