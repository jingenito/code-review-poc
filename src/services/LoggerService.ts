import { injectable } from "inversify";
import pino from "pino";
import { env } from "../env";

export interface ILogger {
  fatal(msg: string, ...args: unknown[]): void;
  error(msg: string, ...args: unknown[]): void;
  warn(msg: string, ...args: unknown[]): void;
  info(msg: string, ...args: unknown[]): void;
  debug(msg: string, ...args: unknown[]): void;
  trace(msg: string, ...args: unknown[]): void;
}

@injectable()
export class LoggerService implements ILogger {
  private logger = pino({ level: env.LOG_LEVEL });

  fatal = this.logger.fatal.bind(this.logger);
  error = this.logger.error.bind(this.logger);
  warn  = this.logger.warn.bind(this.logger);
  info  = this.logger.info.bind(this.logger);
  debug = this.logger.debug.bind(this.logger);
  trace = this.logger.trace.bind(this.logger);
}
