/**
 * Exit codes and signals serve different purposes in a Unix-like operating system.
 *
 * Exit Codes: An exit code is a value returned by a program to the system when it finishes execution. By convention, an exit code of 0 means success, and any non-zero value indicates an error. The specific meanings of different error codes are defined by each program, but there are some conventions (for example, 1 often means a general error, 2 means misuse of shell builtins, according to Bash conventions).
 *
 * Signals: A signal is a software interrupt delivered to a process. The operating system uses signals to communicate with processes. For example, when you press Ctrl+C in the terminal, the foreground process receives a SIGINT (interrupt) signal. There are many other signals for different purposes (SIGTERM for termination, SIGSEGV for segmentation fault, etc.).
 *
 * We need both because they serve different purposes. Exit codes are used to indicate how a program finished. They are a form of communication between the program and its parent process or the shell that launched it.
 *
 * Signals, on the other hand, are a way for the operating system (or other processes) to communicate with a running process. They can tell a process to terminate (SIGTERM), to pause (SIGSTOP), to continue if it was paused (SIGCONT), and many other things.
 * @link https://nodejs.org/api/process.html#exit-codes
 */
export const exitCodeMap = new Map<
  number | null,
  { description: string; shortenUserFriendlyMessage: string }
>([
  [
    0,
    {
      description:
        'Node.js will normally exit with a 0 status code when no more async operations are pending.',
      shortenUserFriendlyMessage: 'Process exited normally (success)',
    },
  ],
  [
    1,
    {
      description:
        "Uncaught Fatal Exception: There was an uncaught exception, and it was not handled by a domain or an 'uncaughtException' event handler.",
      shortenUserFriendlyMessage: 'uncaught exception',
    },
  ],
  [
    2,
    {
      description: 'Unused (reserved by Bash for builtin misuse)',
      shortenUserFriendlyMessage: 'reserved by Bash for builtin misuse',
    },
  ],
  [
    3,
    {
      description:
        'Internal JavaScript Parse Error: The JavaScript source code internal in the Node.js bootstrapping process caused a parse error. This is extremely rare, and generally can only happen during development of Node.js itself.',
      shortenUserFriendlyMessage: 'parse error',
    },
  ],
  [
    4,
    {
      description:
        'Internal JavaScript Evaluation Failure: The JavaScript source code internal in the Node.js bootstrapping process failed to return a function value when evaluated. This is extremely rare, and generally can only happen during development of Node.js itself.',
      shortenUserFriendlyMessage: 'evaluation failure',
    },
  ],
  [
    5,
    {
      description:
        'Fatal Error: There was a fatal unrecoverable error in V8. Typically a message will be printed to stderr with the prefix FATAL ERROR.',
      shortenUserFriendlyMessage: 'fatal error',
    },
  ],
  [
    6,
    {
      description:
        'Non-function Internal Exception Handler: There was an uncaught exception, but the internal fatal exception handler function was somehow set to a non-function, and could not be called.',
      shortenUserFriendlyMessage: 'non-function internal exception handler',
    },
  ],
  [
    7,
    {
      description:
        "Internal Exception Handler Run-Time Failure: There was an uncaught exception, and the internal fatal exception handler function itself threw an error while attempting to handle it. This can happen, for example, if an 'uncaughtException' or domain.on('error') handler throws an error.",
      shortenUserFriendlyMessage: 'internal exception handler run-time failure',
    },
  ],
  [
    8,
    {
      description:
        'Unused. In previous versions of Node.js, exit code 8 sometimes indicated an uncaught exception.',
      shortenUserFriendlyMessage: 'unused, can indicated an uncaught exception',
    },
  ],
  [
    9,
    {
      description:
        'Invalid Argument: Either an unknown option was specified, or an option requiring a value was provided without a value.',
      shortenUserFriendlyMessage: 'invalid argument',
    },
  ],
  [
    10,
    {
      description:
        'Internal JavaScript Run-Time Failure: The JavaScript source code internal in the Node.js bootstrapping process threw an error when the bootstrapping function was called. This is extremely rare, and generally can only happen during development of Node.js itself.',
      shortenUserFriendlyMessage: 'internal javascript run-time failure',
    },
  ],
  [
    12,
    {
      description:
        'Invalid Debug Argument: The --inspect and/or --inspect-brk options were set, but the port number chosen was invalid or unavailable.',
      shortenUserFriendlyMessage: 'invalid debug argument',
    },
  ],
  [
    13,
    {
      description:
        'Unfinished Top-Level Await: await was used outside of a function in the top-level code, but the passed Promise never resolved.',
      shortenUserFriendlyMessage: 'unfinished top-level await',
    },
  ],
  [
    14,
    {
      description:
        'Node.js was started to build a V8 startup snapshot and it failed because certain requirements of the state of the application were not met.',
      shortenUserFriendlyMessage: 'node.js snapshot failed',
    },
  ],
  [
    null,
    {
      description:
        'If the exit code is null, it means that the process did not exit normally',
      shortenUserFriendlyMessage: 'process did not exit normally',
    },
  ],
]);

export type ExitCodeType = number | null;

/**
 * @link https://nodejs.org/api/process.html#signal-events
 */
export const NODEJS_SIGNALS: { [key in NodeJS.Signals]: key } = {
  /** Hangup detected on controlling terminal or death of controlling process */
  SIGHUP: 'SIGHUP',
  /** Interrupt from keyboard (Ctrl+C) */
  SIGINT: 'SIGINT',
  /** Quit from keyboard */
  SIGQUIT: 'SIGQUIT',
  /** Illegal Instruction */
  SIGILL: 'SIGILL',
  /** Trace/breakpoint trap */
  SIGTRAP: 'SIGTRAP',
  /** Abort signal from abort(3) */
  SIGABRT: 'SIGABRT',
  /** Bus error (bad memory access) */
  SIGBUS: 'SIGBUS',
  /** Floating point exception */
  SIGFPE: 'SIGFPE',
  /** Kill signal */
  SIGKILL: 'SIGKILL',
  /** User-defined signal 1 */
  SIGUSR1: 'SIGUSR1',
  /** User-defined signal 2 */
  SIGUSR2: 'SIGUSR2',
  /** Broken pipe: write to pipe with no readers */
  SIGPIPE: 'SIGPIPE',
  /** Alarm clock */
  SIGALRM: 'SIGALRM',
  /** Termination signal */
  SIGTERM: 'SIGTERM',
  /** Child stopped or terminated */
  SIGCHLD: 'SIGCHLD',
  /** Continue if stopped */
  SIGCONT: 'SIGCONT',
  /** Stop process */
  SIGSTOP: 'SIGSTOP',
  /** Stop typed at terminal */
  SIGTSTP: 'SIGTSTP',
  /** Terminal input for background process */
  SIGTTIN: 'SIGTTIN',
  /** Terminal output for background process */
  SIGTTOU: 'SIGTTOU',
  /** Urgent condition on socket */
  SIGBREAK: 'SIGBREAK',
  /** I/O now possible (4.2 BSD) */
  SIGIO: 'SIGIO' as const,
  /** IOT trap. A synonym for SIGABRT */
  SIGIOT: 'SIGIOT' as const,
  /** File lock lost (unused) */
  SIGLOST: 'SIGLOST' as const,
  /** Pollable event (Sys V). Synonym for SIGIO */
  SIGPOLL: 'SIGPOLL' as const,
  /** Profiling timer expired */
  SIGPROF: 'SIGPROF' as const,
  /** Power failure (System V) */
  SIGPWR: 'SIGPWR' as const,
  /** Invalid memory reference */
  SIGSEGV: 'SIGSEGV' as const,
  /** Stack fault on coprocessor (unused) */
  SIGSTKFLT: 'SIGSTKFLT' as const,
  /** Bad argument to routine (SVr4) */
  SIGSYS: 'SIGSYS' as const,
  /** Unused signal (System V) */
  SIGUNUSED: 'SIGUNUSED' as const,
  /** Urgent condition on socket (4.2 BSD) */
  SIGURG: 'SIGURG' as const,
  /** Virtual alarm clock (4.2 BSD) */
  SIGVTALRM: 'SIGVTALRM' as const,
  /** Window resized */
  SIGWINCH: 'SIGWINCH' as const,
  /** CPU time limit exceeded (4.2 BSD) */
  SIGXCPU: 'SIGXCPU' as const,
  /** File size limit exceeded (4.2 BSD) */
  SIGXFSZ: 'SIGXFSZ' as const,
  /** Information request (BSD) */
  SIGINFO: 'SIGINFO' as const,
} as const;
