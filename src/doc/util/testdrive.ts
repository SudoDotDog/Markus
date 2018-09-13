/**
 * @author WMXPY
 * @description Doc Util
 * @fileoverview Test Drive
 */

import { IExpressRoute } from "../../service/interface";

export const buildTestDriveTemplateByRoute = (route: IExpressRoute): string => {
    const result: string[] = [
        `<div>`,
        `<button>123</button>`,
        `</div>`,
    ];
    return result.join('');
};
