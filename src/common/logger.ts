import { ConsoleLogger } from '@nestjs/common';

export class CustomLogger extends ConsoleLogger {
  log(message: any, context = '') {
    super.log(message, context);
  }

  debug(message: any, context = '') {
    super.debug(message, context);
  }

  verbose(message: any, context = '') {
    super.verbose(message, context);
  }

  warn(message: any, context = '') {
    super.warn(message, context);
  }

  error(message: any, stack?: string, context = '') {
    super.error(message, stack, context);
  }
}
