/**
 * @author WMXPY
 * @fileoverview Crypto Utils
 */

import * as Crypto from 'crypto';
import * as Fs from 'fs';

export const stringToMD5 = (str: string): string => {
    const md5: Crypto.Hash = Crypto.createHash('md5');
    return md5.update(str).digest('hex');
};

export const hashBuffer = (buffer: Buffer): string => {
    const fsHash: Crypto.Hash = Crypto.createHash('md5');
    return fsHash.update(buffer).digest('hex');
};

export const hashImage = (imagePath: string): Promise<string> => {
    const stream: Fs.ReadStream = Fs.createReadStream(imagePath);
    const fsHash: Crypto.Hash = Crypto.createHash('md5');

    return new Promise<string>((resolve: (md5: string) => void, reject: (reason: Error) => void) => {
        stream.on('data', (dataChunk: any) => {
            fsHash.update(dataChunk);
        });

        stream.on('end', () => {
            const md5: string = fsHash.digest('hex');
            resolve(md5);
        });

        stream.on('close', (err: Error) => {
            reject(err);
        });
    });
};
