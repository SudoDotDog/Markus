/**
 * @author WMXPY
 * @description Doc
 * @fileoverview Bridge
 */

require('../binding');
import Detail from '#/doc/pages/detail';
import LanguageTextProcessor from '#/service/language';
import { IExpressRoute, IText } from '#route-interface';
import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import Card from './components/card';
import Doc from './pages/doc';

export const renderDocIndex = (routes: IExpressRoute[], language: keyof IText): string => {
    const processor: LanguageTextProcessor = new LanguageTextProcessor(language);

    const doc: JSX.Element = (<Doc>
        {routes.map((route: IExpressRoute) => (
            <Card route={route} processor={processor} key={route.name}>
            </Card>
        ))}
    </Doc>);
    return ReactDomServer.renderToStaticMarkup(doc);
};

export const renderDocDetail = (route: IExpressRoute, language: keyof IText, url: string): string => {
    const processor: LanguageTextProcessor = new LanguageTextProcessor(language);

    const detail: JSX.Element = (<Detail
        route={route}
        processor={processor}
        url={url}
    ></Detail >);
    return ReactDomServer.renderToStaticMarkup(detail);
};
