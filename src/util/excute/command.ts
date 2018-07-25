/**
 * @author WMXPY
 * @fileoverview Command Builder Util Module
 */

import * as ChildProcess from 'child_process';

export type ExecCommandElement =
    string |
    {
        name: string;
        value: string;
    };

export const commandBuilder = (elements: ExecCommandElement[]) => {
    let command: string = '';
    for (let i of elements) {
        if (typeof i === 'string') {
            command += i;
        } else {
            command += i.name + '=' + i.value;
        }
        command += ' ';
    }
    return command;
};

export const execute = (command: string): Promise<string> => {

    return new Promise<string>((resolve: (result: string) => void, reject: (reason?: any) => void) => {

        ChildProcess.exec(command, (err: Error, stdout: string, stderr: string) => {
            if (err) {
                reject(err);
                return;
            }
            if (stderr) {
                reject(stderr);
                return;
            }

            resolve(stdout);
        });
    });
};
