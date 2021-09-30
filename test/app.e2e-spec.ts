import fs from 'fs';
import { Injectable, Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Log4jsLogger, setupLog4js } from '../src/main';
import path from 'path';

const logFilePath = path.join(__dirname, '../logs/nest.log');

@Injectable()
class DemoService {
  private logger = new Logger('demo');

  test() {
    this.logger.verbose(
      'verbose',
      'message',
      { test: 'ok' },
      new Error('error'),
    );
    this.logger.debug('debug', 'message', { test: 'ok' }, new Error('error'));
    this.logger.log('info', 'message', { test: 'ok' }, new Error('error'));
    this.logger.warn('warn', 'message', { test: 'ok' }, new Error('error'));
    this.logger.error('error', 'message', { test: 'ok' }, new Error('error'));
  }
}

setupLog4js();

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
