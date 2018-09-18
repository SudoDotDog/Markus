/**
 * @author WMXPY
 * @description Doc Utils
 * @fileoverview Convert Test
 */

import { expect } from 'chai';
import { htmlMarkusImage } from '../../../src/doc/util/code';
import { IExpressRoute, ExpressAssertionType, EXPRESS_ASSERTION_TYPES_END, EXPRESS_ASSERTION_TYPES_UNION } from '../../../src/service/interface';
import { IMockFsSyncsCB, monkFsSyncs } from '../../mock/mock';
import MockRoute from '../../mock/route';
import { IDocTableElement } from '../../../src/doc/interface';
import { convertRouteToTemplate, convertEndTypeRecursive } from '../../../src/doc/util/covert';
import LanguageTextProcessor from '../../../src/service/language';

export const testDocUtilConvert = () => {
    describe('test convert', (): void => {

        it('convert route to template should return correct result', (): void => {
            const route: IExpressRoute = new MockRoute();
            const processor: LanguageTextProcessor = new LanguageTextProcessor('EN');
            const template: IDocTableElement[] = convertRouteToTemplate(route, processor);

            expect(template).to.be.deep.equal([
                {
                    name: "Description",
                    value: "Mock description",
                },
                {
                    name: "Route",
                    value: "/mock",
                },
                {
                    name: "Mode",
                    key: "mode",
                    value: "GET",
                },
                {
                    name: "Authorization",
                    value: "YES",
                },
                {
                    name: "Authorization Role",
                    value: "Everyone",
                },
                {
                    name: "Query",
                    value: {
                        tagId: "OBJECT_ID",
                    },
                },
            ]);
        });

        it('covert end type recursive should return', (): void => {
            const type: ExpressAssertionType = {
                type: EXPRESS_ASSERTION_TYPES_END.STRING,
            }
            const assertion: IDocTableElement[] = convertEndTypeRecursive(type);

            expect(assertion).to.be.deep.equal('STRING');
        });

        it('covert end type recursive should return - complex', (): void => {
            const type: ExpressAssertionType = {
                type: EXPRESS_ASSERTION_TYPES_UNION.OBJECT,
                child: {
                    hello: {
                        type: EXPRESS_ASSERTION_TYPES_END.STRING,
                    },
                    world: {
                        type: EXPRESS_ASSERTION_TYPES_UNION.ARRAY,
                        child: {
                            type: EXPRESS_ASSERTION_TYPES_END.NUMBER,
                        },
                        optional: true,
                    },
                },
            };

            const assertion: IDocTableElement[] = convertEndTypeRecursive(type);

            expect(assertion).to.be.deep.equal('{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hello:&nbsp;STRING,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;world:&nbsp;[NUMBER]&nbsp;(optional)<br>&nbsp;&nbsp;&nbsp;}');
        });
    });
};
