/**
 * @author WMXPY
 * @fileoverview Data Path Utils
 */

import * as Path from 'path';
import Config from '../../markus';

export const pathBuilder = (folder: string, imagePath?: string): string => {
    if (imagePath) {
        return Path.join(imagePath, folder);
    } else {
        return Path.join(Config.imagePath, folder);
    }
};

export const fileBuilder = (folder: string, fileName: string, imagePath?: string): string => {
    if (imagePath) {
        return Path.join(imagePath, folder, fileName);
    } else {
        return Path.join(Config.imagePath, folder, fileName);
    }
};
