/**
 * @author WMXPY
 * @description Markus Plugin
 * @fileoverview i18n Util
 */

import * as Path from 'path';

export const getAssetI18NPath = (): string => {
    return Path.join(getAssetPath(), 'i18n');
};

export const getAssetPath = (): string => {
    return Path.join(__dirname, '..', '..', '..', '..', 'assets');
};
