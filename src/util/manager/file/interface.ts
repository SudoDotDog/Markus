/**
 * @author WMXPY
 * @fileoverview File Manager interface
 */

export interface IFileManager {
    save: () => Promise<IFileLink>;
    hash: () => Promise<string>;
    mime: () => string;
    release: () => void;
}

export interface IFileLink {
    folder: string;
    filename: string;
}
