const original = jest.requireActual('../logger.ts');

export const logger = {
    ...original.logger,
    error: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    verbose: jest.fn(),
    info: jest.fn(),
    log: jest.fn(),
    fatal: jest.fn(),
};

export const loggerInit = jest.fn();