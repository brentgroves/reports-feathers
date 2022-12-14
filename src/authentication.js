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


module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  // authentication.register('auth0', new Auth0Strategy());
  authentication.register('microsoft', new MicrosoftStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
// https://docs.feathersjs.com/cookbook/authentication/auth0.html#strategy