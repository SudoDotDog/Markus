/**
 * @author WMXPY
 * @description Doc
 * @fileoverview Bridge
 */

import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import { IDocTemplateRenderer } from './interface';
import Doc from './pages/doc';

export const renderDocIndex = (cards: IDocTemplateRenderer[]): string => {
    const doc = (<Doc child={cards}></Doc>);
    return ReactDomServer.renderToString(doc);
};
