const logger = require('../logger');
// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  logger.info('creating model...');
  const modelName = 'users';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
    email: { type: String, unique: true, lowercase: true },
    name: { type: String },
    password: { type: String },
    githubId: { type: String },
    avatar: { type: String },
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
/*
# returned by auth0
basic
{
  "sub": "waad|MwDn8JxKXRANG4m1xrRp6U4V3ZXeWbw4Z1T152yktDU",
  "nickname": "moto",
  "name": "moto",
  "picture": "https://cdn.auth0.com/avatars/mo.png",
  "updated_at": "2022-12-08T20:22:18.884Z"
}
extended
{
  "sub": "waad|MwDn8JxKXRANG4m1xrRp6U4V3ZXeWbw4Z1T152yktDU",
  "given_name": "moto",
  "family_name": "moto",
  "nickname": "moto",
  "name": "moto",
  "picture": "https://cdn.auth0.com/avatars/mo.png",
  "updated_at": "2022-12-08T20:34:02.850Z"
}
*/