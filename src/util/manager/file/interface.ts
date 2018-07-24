/**
 * @author WMXPY
 * @fileoverview File Manager interface
 */

export interface IFileManager {
    save: () => Promise<string>;
    hash: () => Promise<string>;
    mime: () => string;
    release: () => void;
}
