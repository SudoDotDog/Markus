/**
 * @author WMXPY
 * @description Util
 * @fileoverview Resource Decorators
 */

import { EXPRESS_SPECIAL_MARK, IExpressResourcePath } from "#route-interface";

// Decorator
export const resource = (path: string, key?: string) => {
    return <T extends { new(...args: any[]): {} }>(target: T) => {
        // tslint:disable-next-line
        return class extends target {
            public resource: IExpressResourcePath = {
                path,
                key,
            };
        };
    };
};

// Decorator
export const ignoreDoc = () => {
    return <T extends { new(...args: any[]): {} }>(target: T) => {
        // tslint:disable-next-line
        return class extends target {
            public ignoreInDoc: boolean = true;
        };
    };
};

// Decorator
export const marks = (...markList: EXPRESS_SPECIAL_MARK[]) => {
    return <T extends { new(...args: any[]): {} }>(target: T) => {
        // tslint:disable-next-line
        return class extends target {
            public specialMark: EXPRESS_SPECIAL_MARK[] = markList;
        };
    };
};

// Decorator
export const testDrive = () => {
    return <T extends { new(...args: any[]): {} }>(target: T) => {
        // tslint:disable-next-line
        return class extends target {
            public testDrive: boolean = true;
        };
    };
};

// Decorator
export const preMount = () => {
    return <T extends { new(...args: any[]): {} }>(target: T) => {
        // tslint:disable-next-line
        return class extends target {
            public preMount: boolean = true;
        };
    };
};

// Decorator
export const infoLog = () => {
    return <T extends { new(...args: any[]): {} }>(target: T) => {
        // tslint:disable-next-line
        return class extends target {
            public infoLog: boolean = true;
        };
    };
};

