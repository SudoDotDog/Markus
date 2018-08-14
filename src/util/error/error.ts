/**
 * @author WMXPY
 * @description Error Handling
 * @fileoverview Error
 */

import { Response } from "express";
import { RESPONSE } from "../interface";

export enum ERROR_CODE {
    IMAGE_PATH_IS_NOT_ABSOLUTE = 100,
    DEBUG_ONLY_FUNCTION_CALLED_IN_PRODUCTION = 101,

    EDGE_OUT_OF_BOUND = 155,

    IMAGE_GET_FAILED = 200,
    IMAGE_SAVE_FAILED = 201,
    IMAGE_GET_LIST_FAILED = 202,
    IMAGE_ID_NOT_VALID = 203,
    IMAGE_UNLINK_FAILED = 204,
    IMAGE_HAVE_BOTH_DUPLICATE_TAGS = 2091,

    NO_IMAGE_UNDER_TARGET_TAG = 210,
    TAG_NOT_FOUND = 211,

    IMAGE_NOT_FOUND = 220,

    FILE_NOT_FOUND = 230,

    AVATAR_NOT_FOUND = 240,

    SETTING_NOT_FOUND = 250,
    SETTING_NOT_SETTLED = 251,

    PERMISSION_VALID_FAILED = 300,
    IMAGE_NOT_UPLOADED = 301,

    REQUEST_PATTERN_NOT_MATCHED = 401,
    FOUR_O_FOUR_NOT_FOUND = 404,

    COMPRESS_TIME_OUT = 467,
    QUEUE_ELEMENT_NOT_EXIST = 481,
    TARGET_TOOL_NOT_FOUND = 490,

    COLOR_INTERNAL_ERROR = 600,
    POINT_INTERNAL_ERROR = 601,

    UNIQUE_ARRAY_CREATION_FAILED = 810,

    UNKNOWN_ERROR_CODE = 900,
    INTERNAL_ERROR = 901,
    DEFAULT_TEST_ERROR = 902,

    ASSERT_EXIST_ELEMENT_NOT_EXIST = 950,
}

export const errorList: {
    [key: number]: string;
} = {
    100: 'Image path in config is not a absolute path',
    101: 'Debug function should only call in debug environment',
    155: 'Edge out of bound',
    200: 'Image getting failed',
    201: 'Image saving failed',
    202: 'Image list getting failed',
    203: 'Given ID not a valid imageId',
    204: 'Image unlink failed',
    2091: 'Image have both duplicated tags',
    210: 'No image under target tag name',
    211: 'Tag not found',
    220: 'Image not found',
    230: 'File not found',
    240: 'Avatar not found',
    250: 'Setting not found',
    251: 'Setting is not settled yet',
    300: 'Permission valid failed',
    301: 'Image not found in request',
    401: 'Request pattern not matched',
    404: 'Request URL not found',
    467: 'Compress time out',
    481: 'Element is not exist in queue',
    490: 'Target tool is not found',
    600: 'Color internal error',
    601: 'Point internal error',
    810: 'Unique array creation failed',
    900: 'Unknown error code',
    901: 'Internal error, report it at github.com/sudo-dog/markus',
    902: 'Default test error',
    950: 'Assert an element is exist but is not',
};

/**
 * return new error string object of target error code
 *
 * @param {number} code
 * @returns {Error}
 */
export const error = (code: ERROR_CODE): Error => {
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

export const compareError = (base: Error, target: Error): boolean => {
    return (
        base.name === target.name &&
        base.message === target.message &&
        (base as any).code === (target as any).code
    );
};

export const handlerError = (res: Response, err: Error) => {
    if ((err as any).code) {
        res.status(400).send({
            status: RESPONSE.FAILED,
            error: err,
        });
    } else {
        res.status(500).send({
            status: RESPONSE.FAILED,
            error: error(ERROR_CODE.INTERNAL_ERROR),
        });
    }
};
