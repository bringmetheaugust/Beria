import { ConfigI, SearchRuleI } from './interfaces';
import { logger } from './utils';

export class SearchRuleDTO implements SearchRuleI<RegExp> {
    folder: string;
    fileExtention: string;
    targets: RegExp;

    constructor({ folder, fileExtention, targets, withRegister = false }: SearchRuleI) {
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
            logger.err(`Invalid search rule configuration: ${message}`); process.exit(2);
        }

        this.folder = folder || '*';
        this.fileExtention = fileExtention || '*';
        this.targets = new RegExp(`(${targets.join('|')})`, `g${withRegister ? '' : 'i'}`);
    }
}

export class ConfigDTO implements ConfigI<SearchRuleI<RegExp>> {
    include: SearchRuleDTO[];
    onlyWarnings: boolean;

    constructor({ include, onlyWarning }: ConfigI) {
        try {
            switch(true) {
                case Boolean(!include):
                    throw new Error('"include" field is required.');
                case include.length < 1:
                    throw new Error('"include" field must has at least 1 rule object.');
            }
        } catch({ message }) {
            logger.err(`Invalid configuration: ${message}`); process.exit(2);
        }

        this.include = include.map(rule => new SearchRuleDTO(rule));
        this.onlyWarnings = typeof onlyWarning === 'undefined' ? false : onlyWarning;
    }
}
