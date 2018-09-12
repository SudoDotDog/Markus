/**
 * @author WMXPY
 * @description Upgrade
 * @fileoverview 3.6 to 3.7
 */

import * as Fs from 'fs';
import * as Path from 'path';

const writeToPath = () => {
    const path: string = Path.join(__dirname, '..', '..', 'markus.conf');
    const config: string = Fs.readFileSync(path, 'UTF8');
    Fs.writeFileSync(path, getTemplate(config), 'UTF8');
};

const getTemplate = (config: string): string => {
    const conf = JSON.parse(config);
    conf.authorization = {
        manage: [
            'test-manage'
        ],
        host: [
            'test',
        ],
    };
    return JSON.stringify(conf, null, 2);
};

writeToPath();
