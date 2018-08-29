/**
 * @author WMXPY
 * @description Doc
 * @fileoverview Parser
 */

import { IExpressRoute } from "../../service/interface";
import { IMarkusRouteInformation } from "../interface";

export const convertExpressRouteToRouteInformation = (route: IExpressRoute): IMarkusRouteInformation => {
    return {
        name: route.name,
        path: route.path,
        mode: route.mode,
        prepare: route.prepare,
        authorization: route.authorization,
        after: route.after,
        assertBody: route.assertBody,
        assertQuery: route.assertQuery,
        doc: route.doc,
    };
};
