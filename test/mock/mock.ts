/**
 * @author WMXPY
 * @fileoverview Mocks
 */

import * as fs from 'fs';

export class MockExpress {
    private result = [];

    public req() {
        return {
            file: 'example.jpg',
        };
    }

    public res() {
        return {
            send: (content) => {
                this.result.push(content);
            },
        };
    }
}

export const monkFsSyncs = (func: () => any) => {
    const tempUnlinkSync = fs.unlinkSync;
    const tempReadFileSync = fs.readFileSync;
    const tempWriteFileSync = fs.writeFileSync;
    const tempMakeDirSync = fs.mkdirSync;

    const unlinkSet = [];
    const readSet = [];
    const writeSet = [];
    const mkdirSet = [];
    (fs as any).unlinkSync = (filePath) => {
        unlinkSet.push(filePath);
    };

    (fs as any).readFileSync = (filePath) => {
        readSet.push(filePath);
    };

    (fs as any).writeFileSync = (filePath) => {
        writeSet.push(filePath);
    };

    (fs as any).mkdirSync = (dirPath) => {
        mkdirSet.push(dirPath);
    };

    func();

    (fs as any).unlinkSync = tempUnlinkSync;
    (fs as any).readFileSync = tempReadFileSync;
    (fs as any).writeFileSync = tempWriteFileSync;
    (fs as any).mkdirSync = tempMakeDirSync;

    return {
        unlink: unlinkSet,
        read: readSet,
        write: writeSet,
        mkdir: mkdirSet,
    };
};
