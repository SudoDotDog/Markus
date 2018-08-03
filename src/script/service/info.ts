/**
 * @author WMXPY
 * @fileoverview Info Service
 */

export const logWhenSoftwareStart = (verbose: boolean, debug: boolean): void => {
    if (debug) {
        console.log('!!! YOU ARE RUNNING THIS APPLICATION IN DEBUG MODE !!!');
        console.log('!!!   MAKE SURE TO CHANGE IT TO PRODUCTION MODE    !!!');
    }

    if (verbose) {
        console.log("My name is Markus; I am one of them; These are your images!");
    }
};
