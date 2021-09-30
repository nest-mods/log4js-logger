import fs from 'fs';
import { Injectable, Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  enableLastErrorHandle,
  Log4jsLogger,
  LOG4JS_DEFAULT_CONFIG,
  setupLog4js,
} from '../src/main';
import path from 'path';

const logFilePath = path.join(__dirname, '../logs/nest.log');

@Injectable()
class DemoService {
  private logger = new Logger();

  test() {
    this.logger.verbose('verbose', 'message', { test: 'ok' });
    this.logger.debug('debug', 'message', { test: 'ok' }, 'context');
    this.logger.log('info', 'message', { test: 'ok' }, [1, 2, 3, 4, 5, 6]);
    this.logger.warn('warn', 'message', { test: 'ok' }, 123);
    this.logger.error('error', 'message', { test: 'ok' }, new Error('error'));
  }
}

LOG4JS_DEFAULT_CONFIG.categories.default.appenders = ['stdout', 'dateFile'];
setupLog4js(LOG4JS_DEFAULT_CONFIG);
enableLastErrorHandle();

describe('log4js tests', () => {
  let service: DemoService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [DemoService],
    })
      .setLogger(new Log4jsLogger())
      .compile();

    await module.init();

    service = module.get(DemoService);
  });

  it('print', () => {
    service.test();
    expect(fs.existsSync(logFilePath)).toBeTruthy();
  });
});
