/**
 * @author WMXPY
 * @fileoverview Error
 */

export enum ERROR_CODE {
    IMAGE_PATH_IS_NOT_ABSOLUTE = 100,

    IMAGE_GET_FAILED = 200,

    FOUR_O_FOUR_NOT_FOUND = 404,

    UNKNOWN_ERROR_CODE = 900,
}

export const errorList: {
    [key: number]: string;
} = {
    100: 'Image path in config is not a absolute path',
    200: 'Image getting failed',
    404: 'Request URL not found',
    900: 'Unknown error code',
};

/**
 * return new error string object of target error code
 *
 * @param {number} code
 * @returns {Error}
 */
export const error = (code: number): Error => {
    let newError: Error = new Error();
    if (errorList[code]) {
        newError.message = code + ': ' + errorList[code];
        newError.name = errorList[code];
        (newError as any).code = code;
        return newError;
    }
    newError.message = code + ': ' + errorList[900];
    newError.name = errorList[900];
    (newError as any).code = 900;
    return newError;
};
