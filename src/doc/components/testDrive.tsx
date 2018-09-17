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

        this.inputBoxes = this.inputBoxes.bind(this);
    }

    public render(): JSX.Element {
        return (<div>
            {this.inputBoxes()}
        </div>);
    }

    protected inputBoxes() {
        const elements: any[] = [];
        const body: IExpressAssertionJSONType = this.props.route.assertBody || {};
        for(let key of Object.keys(body)){
            elements.push(body[key].type.toString());
        }

        return elements;
    }
}
