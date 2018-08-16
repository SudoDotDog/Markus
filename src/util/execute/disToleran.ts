/**
 * @author WMXPY
 * @fileoverview Disaster Tolerance Util Module
 */

import { commandBuilder, execute } from './command';

export const fixHostForMongoBackup = (host: string): string => {
    if(host === 'mongodb://localhost:27017'){
        return 'localhost';
    }
    return host;
}

export const databaseBackup = async (host: string, name: string, output: string): Promise<string> => {
    const command = commandBuilder([
        'mongodump',
        {
            name: '-h',
            value: fixHostForMongoBackup(host),
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
            value: fixHostForMongoBackup(host),
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
