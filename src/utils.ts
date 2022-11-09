/**
 * @description colorfull CLI logs
 * @example logger.err('Ты долбоёб?');
 */
export const logger = {
    err: function(txt: string) {
        console.error('\x1b[31m', txt);
    },
    warning: function(txt: string) {
        console.warn('\x1b[33m', txt);
    },
    info: function(txt: string) {
        console.log('\x1b[36m', txt);
    },
    reset: function(txt: string) {
        console.log('\x1b[0m', txt);
    }
}
