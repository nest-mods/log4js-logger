import _ from 'lodash';
import { Log4jsLogger } from './log4js-logger';

const orignal = Log4jsLogger.prototype['getContextAndStackAndMessagesToPrint'];
/**
 * support handle last argument is error
 */
function modified(
  args: Parameters<Log4jsLogger['getContextAndStackAndMessagesToPrint']>,
) {
  const { messages, context } = this.getContextAndMessagesToPrint(args);
  if (messages?.length <= 1) {
    return { messages, context };
  }
  const lastElement = messages[messages.length - 1];
  const isStack = _.isString(lastElement) || _.isError(lastElement);
  if (!isStack) {
    return { messages, context };
  }
  return {
    stack: _.isError(lastElement) ? lastElement.stack : lastElement,
    messages: messages.slice(0, messages.length - 1),
    context,
  };
}

/**
 * enable last error handle support
 *
 * when last argument is error, make `error.stack` as `stack`
 */
export function enableLastErrorHandle() {
  Log4jsLogger.prototype['getContextAndStackAndMessagesToPrint'] = modified;
}

export function disableLastErrorHandle() {
  Log4jsLogger.prototype['getContextAndStackAndMessagesToPrint'] = orignal;
}
