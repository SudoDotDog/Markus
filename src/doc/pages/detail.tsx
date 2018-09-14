/**
 * @author WMXPY
 * @description Doc React
 * @fileoverview Detail
 */

import { Nullable } from '#global-interface';
import { IExpressRoute } from '#route-interface';
import * as React from "react";

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
};

export interface IProps {
    route: IExpressRoute;
}

export default class Detail extends React.Component<IProps, {}> {

    public constructor(props: IProps) {
        super(props);

        this.icon = this.icon.bind(this);
        this.badge = this.badge.bind(this);
    }

    public render(): JSX.Element {
        return (<div style={styles.outer}>
            <div style={styles.inner}>
                <div style={styles.imageContainer}>
                    <img src={this.icon()} alt="Icon" width="100px" height="100px" />
                </div>
                <div style={styles.titleContainer}>

                </div>
            </div>
        </div>);
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
}
