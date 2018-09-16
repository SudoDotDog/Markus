/**
 * @author WMXPY
 * @description Util
 * @fileoverview Resource Decorators
 */

export function resource(constructor: any, value: any) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
