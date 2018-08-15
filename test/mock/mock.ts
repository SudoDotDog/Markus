/**
 * @author WMXPY
 * @fileoverview Mocks
 */

import * as ChildProcess from 'child_process';
import * as fs from 'fs';
import Config, { IConfig } from '../../src/markus';
import { error, ERROR_CODE } from '../../src/util/error/error';

export class MockExpress {
    private result: any[] = [];

    public req(): any {
        return {
            file: 'example.jpg',
        };
    }

    public res(): any {
        return {
            send: (content: any) => {
                this.result.push(content);
            },
        };
    }
}

export const mockConsoleLog = (): () => string[] => {
    const tempConsoleLog: typeof console.log = console.log;
    const logged: string[] = [];

    (console as any).log = (...content: string[]) => {
        logged.push(...content);
    };

    return () => {
        (console as any).log = tempConsoleLog;
        return logged;
    };
};

export interface IMockReadStreamResult {
    triggered: string[];
    onFunc: (data: string) => void;
    onEnd: () => void;
}

export const mockReadStream = (): () => IMockReadStreamResult => {
    const tempReadStream: typeof fs.createReadStream = fs.createReadStream;
    const triggered: string[] = [];

    let onFunc: (data: string) => void;
    let onEnd: () => void;
    (fs as any).createReadStream = (path: string) => {
        return {
            on: (channel: string, func?: (data: string) => void) => {
                if (channel === 'data') {
                    onFunc = (func as (data: string) => void);
                }
                if (channel === 'end') {
                    onEnd = (func as any);
                }
                triggered.push(channel);
            },
        };
    };

    return () => {
        (fs as any).createReadStream = tempReadStream;

        return {
            triggered,
            onFunc,
            onEnd,
        };
    };
};

export const mockConfig = (config: {
    [key in keyof IConfig]?: any;
}): () => void => {
    const configTemp = Config;

    (Config as any) = {...configTemp, ...config};
    return () => {
        (Config as any) = configTemp;
    };
};

export const mockUnlinkSet = (): () => string[] => {
    type UnlinkCB = (err: Error | null) => void;

    const tempUnlink: (path: string, cb: UnlinkCB) => void = fs.unlink;
    const unlinkSet: string[] = [];

    (fs as any).unlink = (path: string, cb: UnlinkCB) => {
        unlinkSet.push(path);
        cb(null);
    };

    return (): string[] => {
        (fs as any).unlink = tempUnlink;
        return unlinkSet;
    };
};

export const mockChildProcessExec = (err?: boolean, stderr?: boolean): () => string[] => {
    const tempExec: typeof ChildProcess.exec = ChildProcess.exec;
    const commandSet: string[] = [];

    (ChildProcess as any).exec = (command: string, cb: (err: Error | null, stdout: string, stderr: string) => void) => {
        commandSet.push(command);
        if (err) {
            cb(error(ERROR_CODE.DEFAULT_TEST_ERROR), 'failed', '');
        } else if (stderr) {
            cb(null, 'failed', error(ERROR_CODE.DEFAULT_TEST_ERROR).message);
        } else {
            cb(null, 'succeed', '');
        }
    };

    return (): string[] => {
        (ChildProcess as any).exec = tempExec;
        return commandSet;
    };
};

export const mockWriteFile = (): () => Array<{
    content: string;
    path: string;
}> => {
    type WriteCB = (err: Error | null) => void;

    const tempWrite: (path: string, cb: WriteCB) => void = fs.unlink;
    const writeSet: Array<{
        content: string;
        path: string;
    }> = [];

    (fs as any).writeFile = (path: string, content: string, cb: WriteCB) => {
        writeSet.push({
            path,
            content,
        });
        cb(null);
    };

    return (): Array<{
        content: string;
        path: string;
    }> => {
        (fs as any).writeFile = tempWrite;
        return writeSet;
    };
};

export const mockWriteStream = (): () => {
    eventList: string[];
    contentList: any[];
} => {
    type eventCB = (...any: any[]) => void;
    const tempWriteStream: (path: string) => void = fs.createWriteStream;

    const eventList: string[] = [];
    const contentList: any[] = [];

    (fs as any).createWriteStream = (path: string) => {
        let finishFunc: eventCB;
        return {
            on: (event: string, cb: eventCB) => {
                if (event === 'finish') {
                    finishFunc = cb;
                }
                eventList.push(event);
            },
            write: (content: any) => {
                contentList.push(content);
            },
            end: () => {
                finishFunc();
            },
        };
    };

    return (): {
        eventList: string[];
        contentList: any[];
    } => {
        (fs as any).createWriteStream = tempWriteStream;
        return {
            eventList,
            contentList,
        };
    };
};

export interface IMockFsSyncsCB {
    unlink: string[];
    read: string[];
    write: string[];
    mkdir: string[];
    exist: string[];
}

export const monkFsSyncs = (tue?: boolean): () => IMockFsSyncsCB => {
    const tempUnlinkSync: typeof fs.unlinkSync = fs.unlinkSync;
    const tempReadFileSync: typeof fs.readFileSync = fs.readFileSync;
    const tempWriteFileSync: typeof fs.writeFileSync = fs.writeFileSync;
    const tempMakeDirSync: typeof fs.mkdirSync = fs.mkdirSync;
    const tempExistSync: typeof fs.existsSync = fs.existsSync;

    const unlinkSet: string[] = [];
    const readSet: string[] = [];
    const writeSet: string[] = [];
    const mkdirSet: string[] = [];
    const existSet: string[] = [];

    (fs as any).unlinkSync = (filePath: string) => {
        unlinkSet.push(filePath);
    };

    (fs as any).readFileSync = (filePath: string) => {
        readSet.push(filePath);
    };

    (fs as any).writeFileSync = (filePath: string) => {
        writeSet.push(filePath);
    };

    (fs as any).mkdirSync = (dirPath: string) => {
        mkdirSet.push(dirPath);
    };

    (fs as any).existsSync = (dirPath: string) => {
        existSet.push(dirPath);
        return tue ? tue : false;
    };

    return (): IMockFsSyncsCB => {
        (fs as any).unlinkSync = tempUnlinkSync;
        (fs as any).readFileSync = tempReadFileSync;
        (fs as any).writeFileSync = tempWriteFileSync;
        (fs as any).mkdirSync = tempMakeDirSync;
        (fs as any).existsSync = tempExistSync;

        return {
            unlink: unlinkSet,
            read: readSet,
            write: writeSet,
            mkdir: mkdirSet,
            exist: existSet,
        };
    };
};
