/**
 * @author WMXPY
 * @fileoverview Global declare
 * @description Interface
 */

export enum MARKUS_AUTHORIZATION_ROLE {
    MANAGE = 'manage',
    HOST = 'host',
}

export interface IMarkusGlobalEnvironment {
    version: string | undefined;
}
