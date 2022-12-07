const logger = require('../../logger');
const { Service } = require('feathers-mongoose');

// exports.Users = class Users extends Service {
  
// };

// We need this to create the MD5 hash
const crypto = require('crypto');

// The Gravatar image service
const gravatarUrl = 'https://s.gravatar.com/avatar';
// The size query. Our chat needs 60px images
const query = 's=60';
// Returns the Gravatar image for an email
const getGravatar = email => {
  // Gravatar uses MD5 hashes from an email address (all lowercase) to get the image
  const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  // Return the full avatar URL
  return `${gravatarUrl}/${hash}?${query}`;
};

exports.Users = class Users extends Service {
  create (data, params) {
    logger.info('creating user...');
    // This is the information we want from the user signup data
    const { email, password, auth0Id, githubId, name } = data;
    // Use the existing avatar image or return the Gravatar for the email
    const avatar = data.avatar || getGravatar(email);
    // The complete user
    const userData = {
      email,
      name,
      password,
      auth0Id,
      githubId,
      avatar
    };
    logger.info('email:%s, avatar:%s, auth0Id:%s', userData.email, userData.avatar, userData.auth0Id)
    // logger.error('Error message');
    // logger.warn('Warning message');
    
    // Call the original `create` method with existing `params` and new data
    return super.create(userData, params);
  }  
};