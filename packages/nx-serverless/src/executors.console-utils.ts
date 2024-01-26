import chalk from 'chalk';
import stripAnsi from 'strip-ansi';
import { logger as nrwlLogger } from '@nx/devkit';
import { format } from 'date-fns/format';
export type LogSeverity = 'log' | 'error' | 'warn' | 'debug' | 'verbose';

// /**
//  * Log (info): General operational information about what's happening inside the application.
//  * This is usually the default logging level.
//  * --------------------------
//  * Debug: Contains information that is helpful for debugging during development and troubleshooting.
//  * It's usually only meaningful to developers and often high-volume.
//  * --------------------------
//  * Verbose: Verbose logging includes detailed information about the application's behavior.
//  * It's usually only meaningful for in-depth troubleshooting.
//  * --------------------------
//  * Warn: When something unexpected happens, but the application still works as expected,
//  * it's a good idea to log this event as a warning.
//  * --------------------------
//  * Error: When an operation fails, an error log gives insight into the event.
//  * It includes things like stack traces or exception messages.
//  */
// export const LOG_SEVERITY_COLOR = new Map<LogSeverity, chalk.Chalk>([
//     ['log', chalk.cyan],
//     ['error', chalk.red],
//     ['warn', chalk.yellow],
//     ['debug', chalk.green],
//     ['verbose', chalk.magenta],
// ]);

export interface LoggerOptions {
  noColors?: boolean;
  useInitials?: boolean;
  includeTimestamp?: boolean;
  timeFormat?: 'yyyy-MM-dd HH:mm:ss.SSS';
}

interface LoggerContract {
    /**
     * Log (info): General operational information about what's happening inside the application.
     * This is usually the default logging level.
     */
    info(message: string): void;
    /**
     * Warn: When something unexpected happens, but the application still works as expected,
     * it's a good idea to log this event as a warning.
     */
    warn(message: string): void;
    /**
     * Error: When an operation fails, an error log gives insight into the event.
     * It includes things like stack traces or exception messages.
     */
    error(message: string): void;
    /**
     * Debug: Contains information that is helpful for debugging during development and troubleshooting.
     * It's usually only meaningful to developers and often high-volume.
     */
    debug(message: string): void;
    /**
     * Verbose: Verbose logging includes detailed information about the application's behavior.
     * It's usually only meaningful for in-depth troubleshooting.
     */
    verbose(message: string): void;
}

class Logger implements LoggerContract {
  public static init(options: LoggerOptions = {}) {
    Logger.logger = new Logger(options);
  }

  public static logger: Logger;

  private _loggerOptions: Required<LoggerOptions>;
  private _logger: typeof nrwlLogger;
  private defaultOptions: Required<LoggerOptions> = {
    noColors: false,
    useInitials: true,
    includeTimestamp: true,
    timeFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
  };
  constructor(options: LoggerOptions = {}) {
    this._logger = nrwlLogger;
    this._loggerOptions = {
      noColors:
        typeof options.noColors === 'boolean' ? options.noColors : this.defaultOptions.noColors,
      useInitials:
        typeof options.useInitials === 'boolean' ? options.useInitials : this.defaultOptions.useInitials,
      includeTimestamp:
        typeof options.includeTimestamp === 'boolean'
          ? options.includeTimestamp
          : this.defaultOptions.includeTimestamp,
      timeFormat: options.timeFormat ?? this.defaultOptions.timeFormat,
    };
  }
  info(message: string) {
    this._logger.info(this.buildLogString(message, 'log', this._loggerOptions));
  }

  warn(message: string) {
    this._logger.warn(
      this.buildLogString(message, 'warn', this._loggerOptions)
    );
  }

  error(message: string) {
    this._logger.error(
      this.buildLogString(message, 'error', this._loggerOptions)
    );
  }

  debug(message: string) {
    this._logger.debug(
      this.buildLogString(message, 'debug', this._loggerOptions)
    );
  }

  verbose(message: string) {
    this._logger.log(
      this.buildLogString(message, 'verbose', this._loggerOptions)
    );
  }

  private buildLogString(
    message: string,
    level: LogSeverity,
    options: LoggerOptions
  ) {
    const _message = options.useInitials
      ? `${this.getInitials(level, options)} ${message}`
      : message;
    return this.colorize(this.log_severity_map.get(level), _message, options);
  }

  /**
   * Log (info): General operational information about what's happening inside the application.
   * This is usually the default logging level.
   * --------------------------
   * Debug: Contains information that is helpful for debugging during development and troubleshooting.
   * It's usually only meaningful to developers and often high-volume.
   * --------------------------
   * Verbose: Verbose logging includes detailed information about the application's behavior.
   * It's usually only meaningful for in-depth troubleshooting.
   * --------------------------
   * Warn: When something unexpected happens, but the application still works as expected,
   * it's a good idea to log this event as a warning.
   * --------------------------
   * Error: When an operation fails, an error log gives insight into the event.
   * It includes things like stack traces or exception messages.
   */
  private log_severity_map = new Map<LogSeverity, chalk.Chalk>([
    ['log', chalk.cyan],
    ['error', chalk.red],
    ['warn', chalk.yellow],
    ['debug', chalk.green],
    ['verbose', chalk.magenta],
  ]);

  private getInitials(
    level: LogSeverity,
    options: { timestamp?: boolean; timeFormat?: 'yyyy-MM-dd HH:mm:ss.SSS' } = {
      timeFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
      timestamp: true,
    }
  ) {
    return `[${level.toUpperCase()}${
      options.timestamp ? ` ${this.getFormattedNowDate()}]` : ']'
    }`;
  }
  private getFormattedNowDate() {
    return format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS');
  }

  private colorize(
    chalkColorFn: chalk.Chalk,
    str: string,
    options: LoggerOptions
  ) {
    return options.noColors ? stripAnsi(str) : chalkColorFn(str);
  }
}

class PredefinedLogger implements LoggerContract {
    private loggerInitNotCalled = `You must call "${loggerInit.name}" before using the logger methods. Example: \nimport { loggerInit } from '@nx-tools/nx-serverless';\n loggerInit();`;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(message: string): void {
        throw new Error(this.loggerInitNotCalled);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(message: string): void {
        throw new Error(this.loggerInitNotCalled);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(message: string): void {
        throw new Error(this.loggerInitNotCalled);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    debug(message: string): void {
        throw new Error(this.loggerInitNotCalled);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    verbose(message: string): void {
        throw new Error(this.loggerInitNotCalled);
    }
}

export let logger: LoggerContract = new PredefinedLogger();

export function loggerInit(options: LoggerOptions = {}) {
  logger = new Logger(options);
}
