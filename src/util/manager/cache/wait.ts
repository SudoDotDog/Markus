/**
 * @author WMXPY
 * @description Cache
 * @fileoverview Wait
 */

export const sleep = (time: number): Promise<void> => {
    return new Promise<void>((resolve: () => void) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};
