const logger = require('../logger');
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
// https://docs.feathersjs.com/guides/basics/hooks.html#populate-the-message-sender
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {

  return async context => {
    // Get `app`, `method`, `params` and `result` from the hook context
    logger.info('in populate-user');

    const { app, method, result, params } = context;
    logger.info('context: %s',context);

    // Function that adds the user to a single message object
    const addUser = async message => {
      logger.info('in addUser')
      logger.info('message: %s',message);

      // Get the user based on their id, pass the `params` along so
      // that we get a safe version of the user data
      const user = await app.service('users').get(message.userId, params);
      logger.info('after users.get message.userId=%s',message.userId);

      // Merge the message content to include the `user` object
      return {
        ...message,
        user
      };
    };

    // In a find method we need to process the entire page
    if (method === 'find') {
      // Map all data to include the `user` information
      context.result.data = await Promise.all(result.data.map(addUser));
    } else {
      // Otherwise just update the single result

      context.result = await addUser(result);
      logger.info('context:%s', context)
      logger.info('context.result:%s', context.result)
    }

    return context;
  };

};
