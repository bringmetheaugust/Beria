import { ConfigI, OptionsI, SearchRuleI } from './interfaces';
import { logger } from './utils';

export class SearchRule implements SearchRuleI<RegExp> {
    folder: string;
    fileExtention: string;
    targets: RegExp;

    constructor({
        folder = '*',
        fileExtention = '*',
        targets,
        withRegister = false
    }: SearchRuleI) {
        try {
            switch(true) {
                case Boolean(!targets):
                    throw new Error('"targets" field is required.');
                case !targets.length:
                    throw new Error('"targets" array must has at least 1 item.');
                case (fileExtention as string).includes('.'):
                    throw new Error('"fileExtention" field shouldn\'t have a dot.');
            }
        } catch({ message }) {
            logger(`Invalid search rule configuration: ${message}`, 'err'); process.exit(2);
        }

        this.folder = folder;
        this.fileExtention = fileExtention;
        this.targets = new RegExp(`(${targets.join('|')})`, `g${withRegister ? '' : 'i'}`);
    }
}

export class Config implements ConfigI<SearchRuleI<RegExp>> {
    include: SearchRule[];
    onlyWarnings: boolean;

    constructor({ include, onlyWarning = false }: ConfigI) {
        try {
            switch(true) {
                case Boolean(!include):
                    throw new Error('"include" field is required.');
                case include.length < 1:
                    throw new Error('"include" field must has at least 1 rule object.');
            }
        } catch({ message }) {
            logger(`Invalid configuration: ${message}`, 'err'); process.exit(2);
        }

        this.include = include.map(rule => new SearchRule(rule));
        this.onlyWarnings = onlyWarning;
    }
}

export class Options implements OptionsI {
    configSrc: string;

    constructor({ configSrc = '/beria.config.json' }: OptionsI) {
        this.configSrc = configSrc;
    }
}
