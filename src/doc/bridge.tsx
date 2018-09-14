/**
 * @author WMXPY
 * @description Doc
 * @fileoverview Bridge
 */

import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import { IExpressRoute, IText } from '../service/interface';
import LanguageTextProcessor from '../service/language';
import Card from './components/card';
import Doc from './pages/doc';

export const renderDocIndex = (routes: IExpressRoute[], language: keyof IText): string => {
    const processor: LanguageTextProcessor = new LanguageTextProcessor(language);

    const doc = (<Doc>
        {routes.map((route: IExpressRoute) => (
            <Card route={route} processor={processor}>
            </Card>
        ))}
    </Doc>);
    return ReactDomServer.renderToString(doc);
};
