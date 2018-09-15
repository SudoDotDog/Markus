/**
 * @author WMXPY
 * @description Markus Plugin
 * @fileoverview Internationalization Interface
 */

export type I18N<T> = {
    [P in I18N_LANGUAGE]: T;
};

export enum I18N_LANGUAGE {
    CHINESE = 'zh_cn',
    ENGLISH = 'en_us',
}
