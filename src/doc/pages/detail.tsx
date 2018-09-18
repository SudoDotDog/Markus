/**
 * @author WMXPY
 * @description Doc React
 * @fileoverview Detail
 */

import { fetchMarkusFormData, htmlMarkusImage, nodeMarkusFormData } from '#/doc/util/code';
import { convertObjectToHTMLFriendlyJson, convertRouteToTemplate } from '#/doc/util/covert';
import LanguageTextProcessor from '#/service/language';
import { Nullable } from '#global-interface';
import { I18N_LANGUAGE } from '#i18n/interface';
import StaticResource from '#i18n/static';
import { EXPRESS_EXAMPLE_CODE, IExpressRoute } from '#route-interface';
import * as React from "react";
import TestDrive from '../components/testDrive';
import { IDocTableElement, IStaticResourceDocInformation } from "../interface";

const styles: {
    [key: string]: React.CSSProperties;
} = {
    badge: {
        fontSize: '18px',
        color: 'red',
        fontWeight: 'bold',
    },
    outer: {
        width: 'auto',
        marginTop: '30px',
        marginBottom: '30px',
        padding: '15px',
    },
    inner: {
        display: 'flex',
        alignItems: 'flex-end',
    },
    imageContainer: {
        width: '100px',
    },
    titleContainer: {
        flex: 1,
        padding: '8px',
    },
    table: {
        border: '1px solid black',
        width: '100%',
        borderCollapse: 'collapse',
    },
    text: {
        fontSize: '26px',
        fontWeight: 'bold',
    },
    leftRow: {
        border: '1px solid black',
        width: '18%',
        padding: '3px',
        paddingRight: '5px',
        fontWeight: 'bold',
        textAlign: 'right',
    },
    rightRow: {
        padding: '3px',
        paddingLeft: '5px',
        border: '1px solid black',
    },
};

export interface IProps {
    route: IExpressRoute;
    processor: LanguageTextProcessor;
    url: string;

    resource?: StaticResource<IStaticResourceDocInformation>;
}

export default class Detail extends React.Component<IProps, {}> {
    private _content: IDocTableElement[];
    private _language: I18N_LANGUAGE;

    public constructor(props: IProps) {
        super(props);

        this._language = I18N_LANGUAGE.ENGLISH;
        const url =
            (this.props.url === 'http://localhost' ?
                this.props.url + ':' + global.Markus.Config.portNumber :
                this.props.url)
            + this.props.route.path;
        this._content = convertRouteToTemplate(
            this.props.route,
            this.props.processor,
            url,
            this.props.resource,
        );
    }

    public render(): JSX.Element {
        return (<div style={styles.outer}>
            <div style={styles.inner}>
                <div style={styles.imageContainer}>
                    <img src={this.icon()} alt="Icon" width="100px" height="100px" />
                </div>
                <div style={styles.titleContainer}>
                    {this.badge()}
                    {this.title()}
                </div>
            </div>
            <table style={styles.table}>
                <tbody>
                    {this._content.map(this.rowHTML)}
                    {this.testDrive()}
                </tbody>
            </table>
        </div>);
    }

    protected testDrive(): JSX.Element | undefined {
        if (this.props.route.testDrive) {
            return this.row({
                name: 'Test Drive',
                value: (<TestDrive route={this.props.route} url={this.props.url} />),
            });
        }
        return undefined;
    }

    protected icon(): string {
        return '/a/' + this.props.route.name + '/?text=@E';
    }

    protected badge(): Nullable<JSX.Element> {
        const route: IExpressRoute = this.props.route;

        if (!route.specialMark) {
            return null;
        }

        return (<div style={styles.badge}>
            {route.specialMark.join(', ')}
        </div>);
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

    protected row(row: IDocTableElement): JSX.Element {
        return (<tr style={styles.rightRow} key={row.name}>
            <td style={styles.leftRow}>
                {row.name}
            </td>
            <td style={styles.rightRow}>
                {row.value}
            </td>
        </tr>);
    }

    protected rowHTML(row: IDocTableElement): JSX.Element {
        let content: string;
        if (typeof row.value === 'string') {
            content = row.value;
        } else {
            content = convertObjectToHTMLFriendlyJson(row.value, 3);
        }

        const keys: any = {};
        if (row.key) {
            keys['data-' + row.key] = "";
        }

        return (<tr style={styles.rightRow} key={row.name}>
            <td style={styles.leftRow} dangerouslySetInnerHTML={{
                __html: row.name,
            }}>
            </td>
            <td style={styles.rightRow} {...keys} dangerouslySetInnerHTML={{
                __html: content,
            }}>
            </td>
        </tr>);
    }

    protected exampleCode(): JSX.Element[] {
        const exampleCode: JSX.Element[] = [];
        if (this.props.route.exampleCode) {
            for (let code of this.props.route.exampleCode) {
                switch (code) {
                    case EXPRESS_EXAMPLE_CODE.FETCH_FORM_DATA:
                        exampleCode.push(this.getFetchCode());
                        break;
                    case EXPRESS_EXAMPLE_CODE.HTML:
                        exampleCode.push(this.getHTMLCode());
                        break;
                    case EXPRESS_EXAMPLE_CODE.NODEJS_FORM_DATA:
                        exampleCode.push(this.getNodeCode());
                        break;
                }
            }
        }
        return exampleCode;
    }

    protected getNodeCode(): JSX.Element {
        return this.rowHTML({
            name: 'NodeJS<br>Request',
            value: `<pre class="prettyprint"><code class="lang-js">${nodeMarkusFormData(this.props.url + this.props.route.path, this.props.route)}</code></pre>`,
        });
    }

    protected getFetchCode(): JSX.Element {
        return this.rowHTML({
            name: 'Browser<br>Fetch API',
            value: `<pre class="prettyprint"><code class="lang-js">${fetchMarkusFormData(this.props.url + this.props.route.path, this.props.route)}</code></pre>`,
        });
    }

    protected getHTMLCode(): JSX.Element {
        return this.rowHTML({
            name: 'HTML',
            value: `<pre class="prettyprint"><code class="lang-js">${htmlMarkusImage(this.props.url + this.props.route.path, this.props.route)}</code></pre>`,
        });
    }
}
