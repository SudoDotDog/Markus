/**
 * @author PCXPY
 * @description Util
 * @fileoverview File
 */

import * as Path from 'path';

export const resolvePath = (path: string): string => {
    const target: string = Path.join(__dirname, '..', '..', 'dist_script', path);
    return target;
};
