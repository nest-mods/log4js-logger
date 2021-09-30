import log4js, { Configuration } from 'log4js';
import { LOG4JS_DEFAULT_CONFIG } from './constant';

export function setup(config: Configuration = LOG4JS_DEFAULT_CONFIG) {
  log4js.configure(config);
}
