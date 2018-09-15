/**
 * @author WMXPY
 * @fileoverview Binding
 */

// tslint:disable-next-line
/// <reference path="./declare/global.ts" />

import * as ModuleAlias from 'module-alias';
import * as Path from 'path';

if (!global.Binding) {
    const isTest: boolean = (process.env.NODE_ENV === 'test');
    const route: string[] = [];

    if (!isTest) {
        route.push('..', 'dist');
    }

    const here: string = Path.join(__dirname, ...route);
    ModuleAlias.addAliases({
        "#": here,
        "#icon": Path.join(here, 'plugin', 'icon'),
        "#log": Path.join(here, 'plugin', 'log'),
        "#route": Path.join(here, 'service', 'routes'),
        "#global-interface": Path.join(here, 'interface'),
        "#route-interface": Path.join(here, 'service', 'interface'),
    });
    global.Binding = true;
}
