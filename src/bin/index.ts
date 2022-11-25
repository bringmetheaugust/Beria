#!/usr/bin/env node

const { argv } = process;
const args = parseFlags(argv);

if (argv.includes('--help')) {
    console.log(
        `There are no commands for this package🦅.

Options:
    --config
        Set another path to Your config file.
        Example: --config=myfolder/conf.json
        By default package looks for default beria.config.json config file inside project folder.

    --onlyWarning
        By default, programm exist with error status if search was successful.
        This option disable this behavior.
`
    );
} else {
    Promise.resolve(require('../lib/index').scan(args));
}

/**
 * @description parse cmd flags and pack them to the object
 * @param {Array} args array of CMD arguments
 * @returns object with parsed flags
 */
function parseFlags(args: string[]): { [key: string]: string } {
    return args
        .filter(arg => arg.startsWith('-'))
        .map(arg => arg.replace(/^(-)*/, ''))
        .reduce((acc, curr) => {
            const [key, val] = curr.split('=');

            return ({ ...acc, [key]: typeof val === 'undefined' ? true : val })
        }, {});
}
