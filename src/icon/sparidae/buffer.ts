/**
 * @author WMXPY
 * @description Sparidae
 * @fileoverview Buffer Icon Class
 */

import { EDGE, IPoint } from './point';

export default class Buffer {

    private resultBuffer: string;
    private _text: string;
    private _isAspect: boolean;

    public constructor(text: string) {
        this._isAspect = false;
        this._text = text;
        this.resultBuffer = '';
        this.reset();
    }

    public rect(point1: IPoint, point2: IPoint, point3: IPoint, fill: string): Buffer {
        this.resultBuffer += "<polygon points=\"";
        this.resultBuffer += this.pointBuilder(point1) + " ";
        this.resultBuffer += this.pointBuilder(point2) + " ";
        this.resultBuffer += this.pointBuilder(point3);
        this.resultBuffer += "\" fill=\"" + fill + "\" />";
        return this;
    }

    public text(point: IPoint, fontSize: number): Buffer {
        this.resultBuffer += "<text x=\"";
        this.resultBuffer += point.x + "\" ";
        this.resultBuffer += "y=\"";
        this.resultBuffer += point.y + "\" ";
        this.resultBuffer += "style=\"font-weight:bold;font-size:";
        this.resultBuffer += fontSize + ";text-anchor:end\">";
        this.resultBuffer += this._text;
        this.resultBuffer += "</text>";
        return this;
    }

    public setAspect(aspect: boolean): Buffer {
        this._isAspect = aspect;
        return this;
    }

    public flush(): string {
        let result: string;
        result = this.resultBuffer;
        result += "</svg>";
        this.reset();
        return result;
    }

    public reset(): Buffer {
        this.resultBuffer += `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${EDGE.LENGTH} ${EDGE.LENGTH}" version="1.1" `;
        this.resultBuffer += "preserveAspectRatio=\"" + (this._isAspect ? "true" : "none") + "\" ";
        this.resultBuffer += ">";
        return this;
    }

    private pointBuilder(point: IPoint): string {
        return point.x + "," + point.y;
    }

}
