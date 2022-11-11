import { sync } from 'glob';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import { createInterface } from 'readline';

import { Config, Options, SearchRule } from './entities';
import { logger } from './utils';
import { OptionsI } from './interfaces';

/**
 * @description find matches in string (line) by regExp
 * @param {String} txt string (line) from text file
 * @param target searching regExp
 * @return {RegExpMatchArray | Boolean} array of matched cases or undefined if string doesn't contain any targets
 */
export function findMatches(txt: string, target: RegExp): RegExpMatchArray | undefined {
    const cases = txt.match(target);

    if (cases?.length) return cases;
}

/**
 * @description parsing files by one search rule
 * @param {SearchRule} param0 one of search rule
 * @return true is scanner has caught forbidden search target
 */
export async function scanRule({ folder, fileExtention, targets }: SearchRule): Promise<boolean> {
    let forbiddenCaseCount: number = 0;

    await Promise.all(
        sync(`${folder}/*.${fileExtention}`).
        map(async (filePath: string): Promise<void> => {
            try {
                const rl = createInterface({ input: createReadStream(filePath), crlfDelay: Infinity });
                let lineCounter: number = 0;

                for await (const line of rl) {
                    const res = findMatches(line, targets);

                    if (res?.length) {
                        forbiddenCaseCount++;
                        res.forEach((ptrn: string) => {
                            logger(`File ${filePath}:${lineCounter} has the forbidden target "${ptrn}":\n   ${line}`, 'err');
                        });
                    }

                    lineCounter++;
                }
            } catch(_) {
                logger(`Skip ${filePath} because of error during reading this file.`, 'warn');
            }
        })
    );

    return Boolean(forbiddenCaseCount);
}

/**
 * @description load config file
 * @param {String} configPath config file source path
 * @return parsed config data
 */
export async function parseConfigFile(configPath: Options['configSrc']): Promise<Config> {
    try {
        return new Config(await import(resolve() + configPath));
    } catch(err) {
        logger('Config file not found or has invalid JSON format.', 'err'); process.exit(1);
    }
}

/**
 * @description run scanning files by presented options
 * @param {OptionsI} options scan configuration by config files or CLI flags/agruments
 */
export async function scan(options: OptionsI = {}): Promise<void> {
    const { configSrc } = new Options(options);
    const { include, onlyWarnings } = await parseConfigFile(configSrc);

    logger('Start scanning...', 'info');

    const scannedResult: boolean[] = await Promise.all(include.map((rule: SearchRule) => scanRule(rule)));

    !onlyWarnings && scannedResult.some((searchRes: boolean) => searchRes) && process.exit(1);

    logger('Well done!', 'info');
}

if (process.env.NODE_ENV === 'dev') scan();
