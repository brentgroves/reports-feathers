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
    logger.info('data is %s', data)
    // This is the information we want from the user signup data
    // 
    const { email, name,family_name,given_name,groups,password, githubId,  } = data;
    // Use the existing avatar image or return the Gravatar for the email
    const avatar = data.avatar || getGravatar(email);
    // The complete user
    const userData = {
      email,
      name,
      family_name,
      given_name,
      groups,
      password,
      githubId,
      avatar
    };
    // email: { type: String, unique: true, lowercase: true },
    // name: { type: String },
    // family_name: { type: String },
    // given_name: { type: String },
    // groups: {type: Array },        
    // password: { type: String },
    // githubId: { type: String },
    // avatar: { type: String },

    logger.info('email:%s, avatar:%s, auth0Id:%s', userData.email, userData.avatar, userData.name)
    // logger.error('Error message');
    // logger.warn('Warning message');
    
    // Call the original `create` method with existing `params` and new data
    return super.create(userData, params);
  }  
  // https://documenter.getpostman.com/view/3967924/RW1Yq1a8
  // https://feathersjs.com/api/client/rest.html
  // https://feathersjs.com/api/services.html#update-id-data-params|Feathers
  // I created this update just for debugging the super.update() function 
  // does not need to be changed .
  update (id, data, params) {
    logger.info('updating user...');
    logger.info('data is %s', data)
    const { email, name,family_name,given_name,groups,password, githubId,  } = data;

    const avatar = data.avatar || getGravatar(email);

    // data to be updated
    const userData = {
      email,
      name,
      family_name,
      given_name,
      groups,
      password,
      avatar
    };
    // email: { type: String, unique: true, lowercase: true },
    // name: { type: String },
    // family_name: { type: String },
    // given_name: { type: String },
    // groups: {type: Array },        
    // password: { type: String },
    // githubId: { type: String },
    // avatar: { type: String },

    logger.info('email:%s, groups:%o', userData.email, userData.groups)
    // logger.error('Error message');
    // logger.warn('Warning message');
    
    // Call the original `create` method with existing `params` and new data
    // return super.update(id, data, params);
    return super.update(id, userData, params);
  }   
};