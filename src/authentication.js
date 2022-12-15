const logger = require('./logger');
const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth, OAuthStrategy } = require('@feathersjs/authentication-oauth');

class MicrosoftStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    logger.info('in MicrosoftStrategy');
    logger.info('in MicrosoftStrategy');
    logger.info('in MicrosoftStrategy');
    return {
      email: 'test@microsoft.com'
    };

    // const baseData = await super.getEntityData(profile);
    // return {
    //   ...baseData,
    //   email: profile.email
    // };
  }
}


// https://docs.feathersjs.com/cookbook/authentication/auth0.html#strategy



class MyAuthService extends AuthenticationService {
  async getPayload(authResult, params) {
    // Call original `getPayload` first
    console.log('in getPayLoad');

    const payload = await super.getPayload(authResult, params);
    const { user } = authResult;

    if (user && user.permissions) {
      payload.permissions = user.permissions;
    }

    return payload;
  }
}
// https://docs.feathersjs.com/api/authentication/service.html#customization
// https://docs.feathersjs.com/cookbook/authentication/stateless.html#configuration
module.exports = app => {
  console.log('in AuthService');
  const authentication = new MyAuthService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  // authentication.register('auth0', new Auth0Strategy());
  authentication.register('microsoft', new MicrosoftStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};

// module.exports = app => {
//   const authentication = new AuthenticationService(app);

//   authentication.register('jwt', new JWTStrategy());
//   authentication.register('local', new LocalStrategy());
//   // authentication.register('auth0', new Auth0Strategy());
//   authentication.register('microsoft', new MicrosoftStrategy());

//   app.use('/authentication', authentication);
//   app.configure(expressOauth());
// };
