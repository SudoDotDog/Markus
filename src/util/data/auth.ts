/**
 * @author WMXPY
 * @fileoverview Data Auth Utils
 */

export const parseBasicAuthorization = (auth: string | undefined): string | null => {
    if (!auth || auth.length <= 6) {
        return null;
    }

    const splited: string[] = auth.split(' ');
    if (splited.length !== 2) {
        return null;
    }

    const type: string = splited[0];

    if (type.toLowerCase() !== 'basic') {
        return null;
    }
    const value: string = splited[1];
    return value;
};
