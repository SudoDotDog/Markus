/**
 * @author WMXPY
 * @description Error Handling
 * @fileoverview Error
 */

// tslint:disable-next-line
/// <reference path="../../declare/global.ts" />

import { Response } from "express";
import Log from "../../plugin/log/log";
import { RESPONSE } from "../interface";

export enum ERROR_CODE {
    IMAGE_PATH_IS_NOT_ABSOLUTE = 100,
    DEBUG_ONLY_FUNCTION_CALLED_IN_PRODUCTION = 101,

    MARKUS_CONFIG_FILE_SYNTAX_NOT_CORRECT = 130,

    EDGE_OUT_OF_BOUND = 155,

    IMAGE_GET_FAILED = 200,
    IMAGE_SAVE_FAILED = 201,
    IMAGE_GET_LIST_FAILED = 202,
    IMAGE_ID_NOT_VALID = 203,
    IMAGE_UNLINK_FAILED = 204,
    IMAGE_HAVE_BOTH_DUPLICATE_TAGS = 209,

    NO_IMAGE_UNDER_TARGET_TAG = 210,
    TAG_NOT_FOUND = 211,
    TAG_NAME_ALREADY_EXIST = 212,

    IMAGE_NOT_FOUND = 220,

    FILE_NOT_FOUND = 230,

    AVATAR_NOT_FOUND = 240,

    SETTING_NOT_FOUND = 250,
    SETTING_NOT_SETTLED = 251,

    DIRECT_NOT_FOUND = 260,

    PERMISSION_VALID_FAILED = 300,
    IMAGE_NOT_UPLOADED = 301,
    PERMISSION_CONFIG_NOT_CORRECT = 302,

    REQUEST_PATTERN_NOT_MATCHED = 401,
    REQUEST_APPLICATION_JSON_CANNOT_PARSE = 402,
    FOUR_O_FOUR_NOT_FOUND = 404,

    COMPRESS_TIME_OUT = 467,
    QUEUE_ELEMENT_NOT_EXIST = 481,
    TARGET_TOOL_NOT_FOUND = 490,

    COLOR_INTERNAL_ERROR = 600,
    POINT_INTERNAL_ERROR = 601,

    UNIQUE_ARRAY_CREATION_FAILED = 810,

    LOG_STREAM_NOT_WRITABLE = 840,

    UNKNOWN_ERROR_CODE = 900,
    INTERNAL_ERROR = 901,
    DEFAULT_TEST_ERROR = 902,
    INTERNAL_RESPONSE_AGENT_CAN_ONLY_SEND_TEXT_OR_FILE = 903,
    INTERNAL_RESPONSE_ALREADY_FAILED = 904,
    INTERNAL_EXPRESS_AGENT = 905,
    INTERNAL_RESPONSE_CAN_ONLY_SEND_ONE_FILE = 906,
    INTERNAL_EXPRESS_BUILDER_ROUTE_CANT_BE_SAME = 907,
    INTERNAL_COMPRESS_TARGET_FILE_NOT_FOUND = 908,
    INTERNAL_EXPRESS_BUILDER_EXTENSION_NAME_CANT_BE_SAME = 909,
    INTERNAL_EXPRESS_BUILDER_PRE_MOUNT_CONFLICT = 910,

    AMAZON_S3_CONFIG_NOT_FOUND = 930,
    CONFIG_NOT_AVAILABLE = 931,

    ASSERT_EXIST_ELEMENT_NOT_EXIST = 950,
    ASSERT_TYPE_NOT_MATCHED = 951,
    ASSERT_BOOLEAN_OPPOSITE = 952,

    INTERNAL_DOC_BUILDER_ROUTE_CANT_BE_SAME = 980,
    INTERNAL_DOC_CONSTRUCTOR_NOT_FULFILLED = 981,
}

export const errorList: {
    [key: number]: string;
} = {
    100: 'Image path in config is not a absolute path',
    101: 'Debug function should only call in debug environment',
    120: 'Syntax of markus config file is not correct',
    155: 'Edge out of bound',
    200: 'Image getting failed',
    201: 'Image saving failed',
    202: 'Image list getting failed',
    203: 'Given ID not a valid imageId',
    204: 'Image unlink failed',
    209: 'Image have both duplicated tags',
    210: 'No image under target tag name',
    211: 'Tag not found',
    212: 'Tag name already exist',
    220: 'Image not found',
    230: 'File not found',
    240: 'Avatar not found',
    250: 'Setting not found',
    251: 'Setting is not settled yet',
    260: 'Direct not found',
    300: 'Permission valid failed',
    301: 'Image not found in request',
    302: 'Permission config not correct',
    401: 'Request pattern not matched',
    402: 'Request application json cannot parse',
    404: 'Request URL not found',
    467: 'Compress time out',
    481: 'Element is not exist in queue',
    490: 'Target tool is not found',
    600: 'Color internal error',
    601: 'Point internal error',
    810: 'Unique array creation failed',
    840: 'Log stream not write able',
    900: 'Unknown error code',
    901: 'Internal error, report it at github.com/sudo-dog/markus',
    902: 'Default test error',
    903: 'Internal error, response agent can only send file or text',
    904: 'Internal error, response already failed',
    905: 'Internal error, express builder',
    906: 'Internal error, response can only send one file',
    907: 'Internal error, express builder route can not be same',
    908: 'Internal error, compress target file not found',
    909: 'Internal error, express builder extension name can not be same',
    910: 'Internal error, express builder pre mount conflict',
    930: 'Amazon S3 config is required',
    931: 'Config file is not available',
    950: 'Assert an element is exist but is not',
    951: 'Type of target element is not matched',
    952: 'Assert an opposite boolean',
    980: 'Doc service error, builder route can not be same',
    981: 'Internal error, constructor must be filled out of doc mode',
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

    if ((newError as any).code > 900) {
        console.log(newError);
    }

    return newError;
};

export const compareError = (base: Error, target: Error): boolean => {
    return (
        base.name === target.name &&
        base.message === target.message &&
        (base as any).code === (target as any).code
    );
};

export const secureError = (err: Error, log?: Log): Error => {
    if (log) {
        log.error(`securing ${err.message}`);
    }

    if (global.Markus.Config.isDebug) {
        return err;
    } else {
        if ((err as any).code) {
            return err;
        } else {
            return error(ERROR_CODE.UNKNOWN_ERROR_CODE);
        }
    }
};

export const handlerError = (res: Response, err: Error, log?: Log) => {
    if (log) {
        log.error(`handling ${err.message}`);
    }

    if ((err as any).code) {
        const errorCode: number = (err as any).code;
        if (errorCode >= 900) {
            res.status(500).send({
                status: RESPONSE.FAILED,
                error: err,
            });
        } else {
            res.status(400).send({
                status: RESPONSE.FAILED,
                error: err,
            });
        }
    } else {
        res.status(500).send({
            status: RESPONSE.FAILED,
            error: error(ERROR_CODE.INTERNAL_ERROR),
        });
    }
};
