const logger = require('../logger');
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  // module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  logger.info('in process message');
  // logger.info('email:%s, avatar:%s, auth0Id:%s', userData.email, userData.avatar, userData.auth0Id)

    return async context => {
      const { data } = context;
  
      // Throw an error if we didn't get a text
      if(!data.text) {
        throw new Error('A message must have a text');
      }
  
      // The logged in user
      const { user } = context.params;
      logger.info('user:%s', user)

      // The actual message text
      // Make sure that messages are no longer than 400 characters
      const text = data.text.substring(0, 400);
  
      // Update the original data (so that people can't submit additional stuff)
      context.data = {
        text,
        // Set the user id
        userId: user._id,
        //user,
        // Add the current date
        createdAt: new Date().getTime()
      };
      logger.info('context.data:%s', context.data)
  
      return context;
    };
};
