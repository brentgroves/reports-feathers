const winston = require('winston');
const { format, transports } = winston
const path = require('path')
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: format.combine(
      format.splat(),
      format.simple()
    )
  }));
}

// let myObj = {
//   name: "StackOverflow",
// };

// logger.info('Content: %o', myObj);
// logger.info('Content: %o', {...myObj});

// https://github.com/winstonjs/winston#formats
// info: test message my string {}
// logger.log('info', 'test message %s', 'my string');
// // info: test message 123 {}
// logger.log('info', 'test message %d', 123);
// // info: test message first second {number: 123}
// logger.log('info', 'test message %s, %s', 'first', 'second', { number: 123 });

// 
// const winston = require('winston')
// const { format, transports } = winston
// const path = require('path')
// const logFormat = format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)

// const logger = winston.createLogger({
//   level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
//   format: format.combine(
//     format.label({ label: path.basename(require.main.filename) }),
//     format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//     // Format the metadata object
//     format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
//   ),
//   transports: [
//     new transports.Console({
//       format: format.combine(
//         // format.colorize(),
//         // logFormat,

//         )
//     }),
//     new transports.File({
//       filename: 'logs/combined.log',
//       format: format.combine(
//         // Render in one line in your log file.
//         // If you use prettyPrint() here it will be really
//         // difficult to exploit your logs files afterwards.
//         format.json()
//       )
//     })
//   ],
//   exitOnError: false
// })


// const { createLogger, format, transports } = require('winston');

// // Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
// const logger = createLogger({
//   // To see more detailed errors, change this to 'debug'
//   level: 'info',
//   format: format.combine(
//     format.splat(),
//     format.simple()
//   ),
//   transports: [
//     new transports.Console()
//   ],
// });


// const winston = require('winston')
// const { createLogger, format, transports } = winston;

// const consoleFormat = format.combine(
//   format.prettyPrint(),
//   format.splat(),
//   format.printf((info) => {
//     if (typeof info.message === 'object') {
//       info.message = JSON.stringify(info.message, null, 3)
//     }

//     return info.message
//   })
// )

// const logger = winston.createLogger({
//   // level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
//   // format: format.combine(
//   //   format.label({ label: path.basename(require.main.filename) }),
//   //   format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//   //   // Format the metadata object
//   //   format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
//   // ),
//   transports: [
//     new transports.Console({
//       format: consoleFormat
//     }),
//     new transports.File({
//       filename: 'logs/combined.log',
//       format: format.combine(
//         // Render in one line in your log file.
//         // If you use prettyPrint() here it will be really
//         // difficult to exploit your logs files afterwards.
//         format.json()
//       )
//     })
//   ],
//   exitOnError: false
// })

module.exports = logger;
