if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const NODE_ENV = process.env.NODE_ENV;
// https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html
const axios = require('axios');
const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
const routes = require('./routes');

const authentication = require('./authentication');

const mongoose = require('./mongoose');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(cors());
// app.use(cors({ origin: 'http://example.com' , credentials :  true}));
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(mongoose);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Set up non-service routes (see `routes/index.js`)
routes(app);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

// https://stackoverflow.com/questions/67637546/why-when-i-debug-node-app-with-vscode-run-and-debug-process-env-node-env-is-und
// add following to the launch.js
// "env": { "NODE_ENV": "development" } 
console.log(process.env);
console.log(process.env.NODE_ENV)

console.log('require.main=>' + require.main.filename);
logger.info(`logger.info works here`);

let myObj = {
  name: "StackOverflow",
};

logger.info('Content: %o', myObj);
logger.info('Content: %o', {...myObj});

module.exports = app;

// https://stackoverflow.com/questions/48027266/winston-logger-nodejs-debug-console-logs-not-showing-in-vscode
