/**
 * @author WMXPY
 * @fileoverview Disaster Tolerance Util Module
 */

import { commandBuilder, execute } from './command';

export const databaseBackup = async (host: string, name: string, output: string): Promise<string> => {
    const command = commandBuilder([
        'mongodump',
        {
            name: '-h',
            value: host,
        },
        {
            name: '-d',
            value: name,
        },
        {
            name: '-o',
            value: output,
        },
    ]);

    const result = await execute(command);
    return result;
};

export const databaseRestore = async (host: string, name: string, from: string): Promise<string> => {
    const command = commandBuilder([
        'mongorestore',
        {
            name: '-h',
            value: host,
        },
        {
            name: '-d',
            value: name,
        },
        from,
    ]);

    const result = await execute(command);
    return result;
};
