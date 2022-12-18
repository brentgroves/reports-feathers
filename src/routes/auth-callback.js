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

module.exports = function (app) {

  // Initialize our service with any options it requires
  // app.get('/auth', route(req,res));
  // res.render('index.html', { title: 'Express' });
  // https://stackoverflow.com/questions/28352871/in-express-how-do-i-redirect-a-user-to-an-external-url
  app.get('/auth-callback', async ({ query: { code }}, res,next) => {
    // https://login.microsoftonline.com/5269b021-533e-4702-b9d9-72acbc852c97/oauth2/v2.0/authorize?client_id=29fa39d4-de57-4009-a46a-c561fa048562&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3030%2Foauth%2Fmicrosoft%2Fcallback&response_mode=query&scope=api%3A%2F%2F29fa39d4-de57-4009-a46a-c561fa048562%2FUser.Info&state=12345
    // https://docs.feathersjs.com/api/authentication/service.html#to-authenticate-an-external-request
    // curl -X POST -H 'Content-Type: application/x-www-form-urlencoded' \
    // https://login.microsoftonline.com/5269b021-533e-4702-b9d9-72acbc852c97/oauth2/v2.0/token \
    // -d 'client_id=29fa39d4-de57-4009-a46a-c561fa048562' \
    // -d 'scope=api%3A%2F%2F29fa39d4-de57-4009-a46a-c561fa048562%2FUser.Info' \
    // -d 'code=0.AXwAIbBpUj5TAke52XKsvIUsl9Q5-ilX3glApGrFYfoEhWK7ALI.AgABAAIAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P937T6-z0dpiK7YdVC6F8UOD8DwBimhy-98zS4AouwpxR62p89LkbLmgc20tZ19DqJEbyreORo0ec5hhWI5nwMDYWDbTEojnbrA0VPfYGrdjgXlUN2mc8mqA8ErKcdaMikLWEIjlw4xXl4ApLR5JsF8WT_5YnjvuJaOcpPzewl00W9jkbdl2CswN-A80o8CX4VfbGRk3JR5jr1luWbhepeBXjYSF8QbZoj-WOuLZdQYz3NJJ0DgSzBoovZj-J59San6ApWg3g3SqTW_GJJA7iecPALYJkOwAs_0t6wDwgNyLa7MmImz7Mgs8lR6e3CxImF-_GCzrcBY_qmqxjbvq1F0DjbecLp0CGbOuY1eoSKBjoN48zue2yjrFpPn-KR30eEwIToabtbaPO9t9oMn657I4ZxjhoK03_mKtwLNTEG34TeraE_DB0MEyeVwY9IvHtZJsLoevaFkg9pXl3VUkh7URD7E4_DsTglXUPpscfJPsWfeGJ3H4gybHTi2lw_9w9573k0WVRQPN7bI6hARyyvQEYC8dmriSWA2KTBDI-O5Uv_oIc9cCCAuIyuD0FLhdjrn3eFcVgDGouiPiskD4ujiVBfHwA9IFSSDo6fyaAfY0RBKr_kRTldONgm8T3i_tSZLENHsbHVselh-1l-SZBVuzQavaA2JxjjD9rbEXHTQ2a1wMJ9S&state=12345&session_state=87a1a296-b455-4aaf-b51d-fd0c0150ee05' \
    // -d 'redirect_uri=http%3A%2F%2Flocalhost%3A3030%2Foauth%2Fmicrosoft%2Fcallback' \
    // -d 'grant_type=authorization_code' \
    // -d 'state=12345'    
    // https://stackoverflow.com/questions/67009128/how-to-get-azure-access-token-with-node-js-api-using-axios
    // https://stackoverflow.com/questions/31756756/axios-http-client-how-to-construct-http-post-url-with-form-params
    // https://medium.com/@masnun/handling-timeout-in-axios-479269d83c68
    // The default timeout is 0 set a longer timeout for the access_token request.
    // https://blog.bitsrc.io/the-power-of-axios-cf45e085d924
    // console.log(`before post:${code}`)
    // console.log(`before post 2`)
    // console.log('querystring.stringify=>' + querystring.stringify({
    //   client_id:'29fa39d4-de57-4009-a46a-c561fa048562',
    //   scope:'api://29fa39d4-de57-4009-a46a-c561fa048562/User.Info',
    //   code:code,
    //   redirect_uri:'http://localhost:3030/auth-callback',
    //   grant_type:'authorization_code',
    //   state:12345
    // }))
    // console.log(`before post 3`)
    // console.log('qs.stringify=>' + qs.stringify({
    //   client_id:'29fa39d4-de57-4009-a46a-c561fa048562',
    //   scope:'api://29fa39d4-de57-4009-a46a-c561fa048562/User.Info',
    //   code:code,
    //   redirect_uri:'http://localhost:3030/auth-callback',
    //   grant_type:'authorization_code',
    //   state:12345
    // }))
    // let myObj = { 
    //   client_id:'29fa39d4-de57-4009-a46a-c561fa048562',
    //   scope:'api://29fa39d4-de57-4009-a46a-c561fa048562/User.Info',
    //   code:code,
    //   redirect_uri:'http://localhost:3030/auth-callback',
    //   grant_type:'authorization_code',
    //   state:12345
    //  };
    // logger.info('TEST')
    // logger.info('This message will include a complete object: %O', myObj);
    // console.log(`console log`);
    var res = axios.post('https://login.microsoftonline.com/5269b021-533e-4702-b9d9-72acbc852c97/oauth2/v2.0/token',
      qs.stringify({
        client_id:'29fa39d4-de57-4009-a46a-c561fa048562',
        scope:'api://29fa39d4-de57-4009-a46a-c561fa048562/User.Info',
        code:code,
        redirect_uri:'http://localhost:3030/auth-callback',
        grant_type:'authorization_code',
        state:12345
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
                  // res.status(200).redirect("/");
                  res.render('index.html', { title: 'Express' });
              }).catch((err) => { 
                  logger.info('%o', err);
              })
                  // app.service('/authentication').create(data) 
              // or POST /authentication 
              // with data as { strategy: name, ...loginData }. Internally authentication will then

              // Call the strategy .authenticate method with data
              // Create a JWT for the entity returned by the strategy
              // Return the JWT (accessToken) and the additional information from the strategy
              
              // app
              // .service('authenticate')
              // .authenticate({
              //   strategy: 'local',
              //   email,
              //   password:'passwordless'
              // }).catch((err) => { 
              //   logger.info('%o', err);
              //   // response.status(500).json({ err: err.message })
              // });

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
