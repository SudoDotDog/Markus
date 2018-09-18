/**
 * @author WMXPY
 * @description Doc React
 * @fileoverview TestDrive
 */

import { IExpressAssertionJSONType, IExpressRoute, EXPRESS_ASSERTION_TYPES_END } from "#route-interface";
import * as React from "react";

const styles: {
    [key: string]: React.CSSProperties;
} = {
    box: {
        display: 'flex',
        padding: '3px',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    label: {
        width: '28%',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'right',
        padding: '5px',
    },
    input: {
        flex: 1,
        padding: '5px',
    },
    send: {
        marginTop: '5px',
        fontWeight: 'bold',
        width: '100%',
        padding: '5px',
        border: '0',
        cursor: 'pointer',
    },
};

export interface IProps {
    url: string;
    route: IExpressRoute;
}

export default class TestDrive extends React.Component<IProps, {}> {
    public constructor(props: IProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (<div id="test-drive">
            {this.inputBoxes()}
            <button
                className="hover-button"
                style={styles.send}
                id="markus-send"
            >
                Send
            </button>
        </div>);
    }

    protected inputBoxes() {
        const route: IExpressRoute = this.props.route;
        const elements: any[] = [];

        const body: IExpressAssertionJSONType = route.assertBody || {};
        for (let key of Object.keys(body)) {
            if (body[key].type === EXPRESS_ASSERTION_TYPES_END.STRING) {
                elements.push(this.input(key, key));
            }
        }

        if (route.authorization) {
            elements.push(this.input('Authorization', 'key'));
        }

        return elements;
    }

    protected input(name: string, key: string): JSX.Element {
        return (<div key={key} style={styles.box}>
            <div style={styles.label}>
                {name}
            </div>
            <input
                data-test-drive-input={key}
                style={styles.input}
                placeholder={name}
            />
        </div>);
    }
}
