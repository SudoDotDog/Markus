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
        equal?: boolean;
    };

export const commandBuilder = (elements: ExecCommandElement[]) => {
    const commands: string[] = [];
    for (let i of elements) {
        if (typeof i === 'string') {
            commands.push(i);
        } else {
            if (i.equal) {
                commands.push(i.name + '=' + i.value);
            } else {
                commands.push(i.name, i.value);
            }
        }
    }
    return commands.join(' ');
};

export const execute = (command: string): Promise<string> => {

    return new Promise<string>((resolve: (result: string) => void, reject: (reason?: any) => void) => {

        (ChildProcess as any).exec(command, (err: Error, stdout: string, stderr: string) => {
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
