#!/usr/bin/env node

export type CLICommandT = {
    [ command: string ]: () => Promise<(argv?: string[]) => void>
};

const [ cmd ] = process.argv.slice(2);

const DEFAULT_CMD = 'scan';
const COMMANDS: CLICommandT = {
  scan: () => Promise.resolve(require('../lib/index').scan),
  help: () => Promise.resolve(() => console.log('I cann\'t help U)'))
}

const existedCommand = Boolean(COMMANDS[cmd]);
const command = existedCommand ? cmd : DEFAULT_CMD;

COMMANDS[command]().then((exec) => exec());
