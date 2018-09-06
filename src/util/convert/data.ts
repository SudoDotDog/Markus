/**
 * @author WMXPY
 * @fileoverview Util Convert Data
 */

export const convertBytesNumberToUserFriendlyFormat = (size: number): string => {
    if (size < 1000) {
        return Math.floor(size) + 'b';
    }

    if (size < 1000000) {
        return Math.floor(size / 1000) + 'kb';
    }

    if (size < 1000000000) {
        return Math.floor(size / 1000000) + 'mb';
    }

    if (size < 1000000000000) {
        return Math.floor(size / 1000000000) + 'gb';
    }

    if (size < 1000000000000000) {
        return Math.floor(size / 1000000000000) + 'tb';
    }

    return 'unknown';
};
