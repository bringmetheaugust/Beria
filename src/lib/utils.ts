const CONSOLE_TYPES = {
    err: '\x1b[31m',
    warn: '\x1b[33m',
    info: '\x1b[36m',
    reset: '\x1b[0m',
}

/**
 * @description colorfull CLI logs
 * @example logger('Ты долбоёб?', 'info');
 */
export function logger(txt: string, type: keyof typeof CONSOLE_TYPES): void {
    if (process.env.NODE_ENV === 'test') return;

    console.log(CONSOLE_TYPES[type], txt);
}
