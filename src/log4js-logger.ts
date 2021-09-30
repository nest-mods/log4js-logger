import {
  ConsoleLogger,
  ConsoleLoggerOptions,
  Injectable,
  LogLevel,
  Optional,
} from '@nestjs/common';
import _ from 'lodash';
import log4js from 'log4js';

@Injectable()
export class Log4jsLogger extends ConsoleLogger {
  private stack: string;

  constructor(
    @Optional() context?: string,
    @Optional() options?: ConsoleLoggerOptions,
  ) {
    options = { timestamp: true, ...options };
    if (!options.logLevels && _.isString(process.env.NESTJS_LOG_LEVEL)) {
      options.logLevels = process.env.NESTJS_LOG_LEVEL.split(',') as any;
    }
    super(context, options);
  }

  error(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('error')) {
      return;
    }
    const { messages, context, stack } = this[
      'getContextAndStackAndMessagesToPrint'
    ]([message, ...optionalParams]);

    // change how to print stack
    this.stack = stack;
    this.printMessages(messages, context, 'error', 'stderr');
  }

  protected printMessages(
    messages: any[],
    context?: string,
    level?: LogLevel,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    writeStreamType?: 'stdout' | 'stderr',
  ) {
    const logger = log4js.getLogger(context);
    logger.addContext('ms', this['updateAndGetTimestampDiff']());
    logger.addContext('trace', this.stack);
    delete this.stack;
    const [message, ...args] = messages;
    switch (level) {
      case 'log':
        logger.info(message, ...args);
        break;
      case 'verbose':
        logger.trace(message, ...args);
        break;
      default:
        logger[level](message, ...args);
        break;
    }
  }
}
