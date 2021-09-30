import { Configuration } from 'log4js';

export const LOG4JS_DEFAULT_LAYOUT = {
  type: 'pattern',
  pattern:
    '%[%d{yyyy-MM-dd hh:mm:ss.SSS} %-5.5p %z --- [%c]%] : %m %X{ms} %x{trace}',
  tokens: {
    trace: (logEvent) =>
      logEvent.context?.trace ? '\n' + logEvent.context.trace : '',
  },
};

export const LOG4JS_NO_COLOUR_DEFAULT_LAYOUT = {
  type: 'pattern',
  pattern: '%d{yyyy-MM-dd hh:mm:ss.SSS} %-5.5p %z --- [%c] : %m %x{trace}',
  tokens: {
    trace: (logEvent) =>
      logEvent.context?.trace ? '\n' + logEvent.context.trace : '',
  },
};

export const LOG4JS_DEFAULT_CONFIG: Configuration = {
  appenders: {
    stdout: {
      type: 'stdout',
      layout: LOG4JS_DEFAULT_LAYOUT,
    },
    file: {
      type: 'file',
      filename: './logs/nest.log',
      maxLogSize: 256 * 1024 * 1024,
      backups: 16,
      compress: true,
      keepFileExt: true,
      layout: LOG4JS_NO_COLOUR_DEFAULT_LAYOUT,
    },
    dateFile: {
      type: 'dateFile',
      filename: './logs/nest.log',
      daysToKeep: 365,
      compress: true,
      keepFileExt: true,
      layout: LOG4JS_NO_COLOUR_DEFAULT_LAYOUT,
    },
  },
  categories: {
    default: {
      appenders: ['stdout', 'file'],
      level: 'all',
    },
  },
};
