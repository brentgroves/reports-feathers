// function route (req, res) {
//   res.redirect(
//     `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
//   );
// }
const axios = require('axios');
const path = require('path');
const jwt_decode = require('jwt-decode');

module.exports = function (app) {

  // Initialize our service with any options it requires
  // app.get('/auth', route(req,res));
  app.get('/auth-callback', async ({ query: { code }}, res) => {
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
    axios.post('https://login.microsoftonline.com/5269b021-533e-4702-b9d9-72acbc852c97/oauth2/v2.0/token',
      querystring.stringify({
        client_id:'29fa39d4-de57-4009-a46a-c561fa048562',
        scope:'api://29fa39d4-de57-4009-a46a-c561fa048562/User.Info',
        code:code,
        redirect_uri:'http://localhost:3030/auth-callback',
        grant_type:'authorization_code',
        state:12345
      }), {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function(response) {
          console.log(response.data.access_token);
          // var decoded = jwt_decode(token);
      });

  });  
};
