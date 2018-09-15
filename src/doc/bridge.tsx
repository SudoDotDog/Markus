/**
 * @author WMXPY
 * @description Doc
 * @fileoverview Bridge
 */

require('../binding');
import Detail from '#/doc/pages/detail';
import LanguageTextProcessor from '#/service/language';
import Internationalization from '#i18n/i18n';
import StaticResource from '#i18n/static';
import { getAssetI18NPath } from '#i18n/util/util';
import { IExpressRoute, IText } from '#route-interface';
import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import Card from './components/card';
import { IStaticResourceDocInformation } from './interface';
import Doc from './pages/doc';

export const renderDocIndex = (routes: IExpressRoute[], language: keyof IText): string => {
    const processor: LanguageTextProcessor = new LanguageTextProcessor(language);
    const internationalization = new Internationalization(getAssetI18NPath());

    const doc: JSX.Element = (<Doc>
        {routes.map((route: IExpressRoute) => {
            let resource: StaticResource<IStaticResourceDocInformation> | undefined;
            if (route.resource) {
                resource = internationalization.resource<IStaticResourceDocInformation>(route.resource);
            } else {
                resource = undefined;
            }

            return (<Card
                route={route}
                processor={processor}
                resource={resource}
                key={route.name}
            >
            </Card>);
        })}
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
