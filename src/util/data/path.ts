/**
 * @author WMXPY
 * @fileoverview Data Path Utils
 */

import * as Path from 'path';
import Config from '../../markus';

export const pathBuilder = (folder: string): string => {
    return Path.join(Config.imagePath, folder);
};

export const fileBuilder = (folder: string, fileName: string): string => {
    return Path.join(Config.imagePath, folder, fileName);
};
