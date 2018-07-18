/**
 * @author WMXPY
 * @fileoverview Error
 */

export enum ERROR_CODE {
    IMAGE_PATH_IS_NOT_ABSOLUTE = 100,
    DEBUG_ONLY_FUNCTION_CALLED_IN_PRODUCTION = 101,

    IMAGE_GET_FAILED = 200,
    IMAGE_SAVE_FAILED = 201,
    IMAGE_GET_LIST_FAILED = 202,
    IMAGE_ID_NOT_VALID = 203,

    PERMISSION_VALID_FAILED = 300,

    FOUR_O_FOUR_NOT_FOUND = 404,

    UNKNOWN_ERROR_CODE = 900,
}

export const errorList: {
    [key: number]: string;
} = {
    100: 'Image path in config is not a absolute path',
    101: 'Debug function should only call in debug environment',
    200: 'Image getting failed',
    201: 'Image saving failed',
    202: 'Image list getting failed',
    203: 'Given ID not a valid imageId',
    300: 'Permission valid failed',
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
    const newError: Error = new Error();
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
