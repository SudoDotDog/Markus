/**
 * @author WMXPY
 * @fileoverview File Manager interface
 */

export interface IFileManager {
    save: () => Promise<void>;
    release: () => void;
}
