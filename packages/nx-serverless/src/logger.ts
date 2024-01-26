import chalk from 'chalk';
import stripAnsi from 'strip-ansi';
import { logger as nrwlLogger } from '@nx/devkit';
import { format } from 'date-fns/format';

export type LogSeverity = 'log' | 'error' | 'warn' | 'debug' | 'verbose';
export interface LoggerOptions {
  /**
   * Whether to include colors in the log message, colors are in ANSI format, uses `chalk` and `strip-ansi`.
   * @default false
   */
  noColors?: boolean;
  /**
   * Whether to include the log severity (log, error, warn, debug, verbose) in the log message
   * @example [INFO]
   * @default true
   */
  useInitials?: boolean;
  /**
   * Whether to include timestamp in the log message, depends if `useInitials` is true
   * @example [INFO 2021-08-01 12:00:00.000]
   * @default true
   */
  useTimestamp?: boolean;
  /**
   * The format of the timestamp, depends if `includeTimestamp` is true and `useInitials` is true.
   * @example 'yyyy-MM-dd HH:mm:ss.SSS'
   * @default 'yyyy-MM-dd HH:mm:ss.SSS'
   */
  timeFormat?: 'yyyy-MM-dd HH:mm:ss.SSS';
}

export interface LoggerContract {
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

class DefaultLogger implements LoggerContract {
  private _loggerOptions: Required<LoggerOptions>;
  private _logger: typeof nrwlLogger;
  private defaultOptions: Required<LoggerOptions> = {
    noColors: false,
    useInitials: true,
    useTimestamp: true,
    timeFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
  };
  constructor(options: LoggerOptions = {}) {
    this._logger = nrwlLogger;
    this._loggerOptions = {
      noColors:
        typeof options.noColors === 'boolean' ? options.noColors : this.defaultOptions.noColors,
      useInitials:
        typeof options.useInitials === 'boolean' ? options.useInitials : this.defaultOptions.useInitials,
      useTimestamp:
        typeof options.useTimestamp === 'boolean'
          ? options.useTimestamp
          : this.defaultOptions.useTimestamp,
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
    options: LoggerOptions) {
    return `[${level.toUpperCase()}${
      options.useTimestamp ? ` ${this.getFormattedNowDate()}]` : ']'
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
  logger = new DefaultLogger(options);
}
