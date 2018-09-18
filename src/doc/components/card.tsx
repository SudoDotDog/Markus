/**
 * @author WMXPY
 * @description Doc React
 * @fileoverview Card
 */

import { I18N_LANGUAGE } from "#i18n/interface";
import StaticResource from "#i18n/static";
import * as React from "react";
import { EXPRESS_SPECIAL_MARK, IExpressRoute } from "../../service/interface";
import LanguageTextProcessor from "../../service/language";
import { IStaticResourceDocInformation } from "../interface";

const styles: {
    [key: string]: React.CSSProperties;
} = {
    badge: {
        fontSize: '15px',
        color: 'red',
        fontWeight: 'bold',
    },
    outer: {
        marginTop: '15px',
        marginBottom: '15px',
        overflow: 'hidden',
        padding: '5px',
    },
    inner: {
        display: 'flex',
        alignItems: 'flex-end',
    },
    icon: {
        width: '80px',
    },
    content: {
        flex: 1,
        padding: '6px',
    },
    text: {
        fontSize: '20px',
        fontWeight: 'bold',
    },
    subText: {
        fontSize: '18px',
        color: 'darkgray',
        fontWeight: 'bold',
    },
};

export interface IProps {
    route: IExpressRoute;
    processor: LanguageTextProcessor;

    resource?: StaticResource<IStaticResourceDocInformation>;
}

export default class Card extends React.Component<IProps, {}> {
    private _language: I18N_LANGUAGE;

    public constructor(props: IProps) {
        super(props);

        this._language = I18N_LANGUAGE.ENGLISH;
    }

    public render(): JSX.Element {
        return (<div style={styles.outer} className="card" data-doc={this.props.route.name}>
            <div style={styles.inner}>
                <div style={styles.icon}>
                    <img src={this.icon()} alt="icon" width="80px" height="80px" />
                </div>
                <div style={styles.content} className="card-content">
                    {this.badge()}
                    {this.title()}
                    {this.path()}
                </div>
            </div>
        </div>);
    }

    protected icon(): string {
        return `/a/${this.props.route.name}/?text=@E`;
    }

    protected title(): JSX.Element {
        const route: IExpressRoute = this.props.route;
        const processor: LanguageTextProcessor = this.props.processor;
        let title: string;
        if (this.props.resource) {
            title = this.props.resource.language(this._language).name;
        } else {
            title = route.doc ? processor.from(route.doc.name) : route.name;
        }

        return (<div style={styles.text}>
            {title}
        </div>);
    }

    protected path(): JSX.Element {
        const route: IExpressRoute = this.props.route;

        return (<div style={styles.subText}>
            {route.path}
        </div>);
    }

    protected badge(): JSX.Element {
        const marks: EXPRESS_SPECIAL_MARK[] = this.props.route.specialMark || [];

        return (<div style={styles.badge}>
            {marks.join(',')}
        </div>);
    }
}
