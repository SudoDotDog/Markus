/**
 * @author WMXPY
 * @description Doc React
 * @fileoverview TestDrive
 */

import { IExpressAssertionJSONType, IExpressRoute } from "#route-interface";
import * as React from "react";

const styles: {
    [key: string]: React.CSSProperties;
} = {
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
        return (<div>
            {this.inputBoxes()}
            <button>Send</button>
        </div>);
    }

    protected inputBoxes() {
        const route: IExpressRoute = this.props.route;
        const elements: any[] = [];

        const body: IExpressAssertionJSONType = route.assertBody || {};
        for (let key of Object.keys(body)) {
            elements.push(body[key].type.toString());
        }

        if (route.authorization) {
            elements.push(this.input('AuthKey', 'auth'))
        }

        return elements;
    }

    protected input(name: string, key: string): JSX.Element {
        return (<div key={key}>
            {name}
            <input data-test-drive-key={key}/>
        </div>);
    }
}
