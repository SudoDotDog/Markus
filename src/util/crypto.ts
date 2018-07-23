/**
 * @author WMXPY
 * @fileoverview Crypto Utils
 */

import * as Crypto from 'crypto';

export const stringToMD5 = (str: string): string => {
    const md5: Crypto.Hash = Crypto.createHash('md5');
    return md5.update(str).digest('hex');
};
