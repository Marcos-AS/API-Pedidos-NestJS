import { Reflector } from '@nestjs/core';
import { ApiKeyGuard } from './api-key.guard';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';

describe('ApiKeyGuard', () => {
  let reflector: Reflector;
  let configService: ConfigType<typeof config>;

  beforeEach(() => {
    reflector = new Reflector();
  });

  it('should be defined', () => {
    const guard = new ApiKeyGuard(reflector, configService);
    expect(guard).toBeDefined();
  });
});
