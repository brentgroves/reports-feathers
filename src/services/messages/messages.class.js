const { Service } = require('feathers-mongoose');
// https://www.sitepoint.com/crud-app-node-react-feathersjs/
exports.Messages = class Messages extends Service {
  // constructor() {
  //   this.messages = [];
  // }

  // async find () {
  //   // Just return all our messages
  //   return this.messages;
  // }

  // async create (data) {
  //   // The new message is the data merged with a unique identifier
  //   // using the messages length since it changes whenever we add one
  //   const message = {
  //     id: this.messages.length,
  //     text: data.text
  //   }

  //   // Add new message to the list
  //   this.messages.push(message);

  //   return message;
  // }  
};
