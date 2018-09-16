/**
 * @author WMXPY
 * @description Util
 * @fileoverview Resource Decorators
 */

import { IExpressResourcePath } from "#route-interface";

// Decorator
export const resource = (path: string, key?: string) => {
    return <T extends { new(...args: any[]): {} }>(target: T) => {
        return class extends target {
            public resource: IExpressResourcePath = {
                path,
                key,
            };
        };
    };
};
