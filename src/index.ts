import { sync } from 'glob';
import { promises } from 'fs';

import { ConfigDTO, SearchRuleDTO } from './dto';
import { logger } from './utils';

/**
 * @description parsing files by one search rule
 * @param {SearchRuleDTO} param0 one of search rule
 * @return true is scanner has caught forbidden search target
 */
async function scanRule({ folder, fileExtention, targets }: SearchRuleDTO): Promise<boolean> {
    let forbiddenCaseCount: number = 0;

    await Promise.all(
        sync(`${folder}/*.${fileExtention}`).
        map(async (filePath: string): Promise<void> => {
            try {
                const fileData: string = await promises.readFile(filePath, { encoding: 'utf-8' });
                const cases: RegExpMatchArray | null = fileData.match(targets);
                
                if (cases?.length) {
                    cases.forEach((ptrn: string) => {
                        logger.err(`File ${filePath} has forbidden target "${ptrn}".`);

                        forbiddenCaseCount++;
                    })
                }
            } catch(_) {
                logger.warning(`Skip ${filePath} because of error during reading this file.`);
            }
        })
    );

    return Boolean(forbiddenCaseCount);
}

/**
 * @description load config file
 */
async function parseConfigFile(): Promise<ConfigDTO> {
    try {
        const config = await promises.readFile('./beria.config.json', 'utf-8');

        return new ConfigDTO(JSON.parse(config));
    } catch(err) {
        logger.err('Config file not found.'); process.exit(1);
    }
}

/**
 * @description start parsing
 */
async function init(): Promise<void> {
    const { include, onlyWarnings } = await parseConfigFile();

    logger.info('Start scanning...');

    const scannedResult: boolean[] = await Promise.all(include.map((rule: SearchRuleDTO) => scanRule(rule)));

    !onlyWarnings && scannedResult.some((searchRes: boolean) => searchRes) && process.exit(1);
}

init();
