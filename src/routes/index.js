const auth = require('./auth.js');
const authCallback = require('./auth-callback.js');
const signout = require('./signout.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  auth(app);
  authCallback(app);
  signout(app)
};
