/**
 * @author WMXPY
 * @description Sparidae
 * @fileoverview Buffer Icon Class
 */

import { EDGE, IPoint } from './point';

export default class Buffer {

    private _buffer: string[];
    private _text: string;
    private _isAspect: boolean;
    private _circle: boolean;
    private _thin: boolean;

    public constructor(text: string) {
        this._isAspect = false;
        this._text = text;
        this._buffer = [];
        this._circle = false;
        this._thin = false;
    }

    public setCircle(circle: boolean = true): Buffer {
        this._circle = circle;
        return this;
    }

    public setThin(thin: boolean = true): Buffer {
        this._thin = thin;
        return this;
    }

    public rect(point1: IPoint, point2: IPoint, point3: IPoint, fill: string): Buffer {
        let buffer: string = '';
        buffer += "<polygon points=\"";
        buffer += this.pointBuilder(point1) + " ";
        buffer += this.pointBuilder(point2) + " ";
        buffer += this.pointBuilder(point3);
        buffer += "\" fill=\"" + fill + "\" />";
        this._buffer.push(buffer);
        return this;
    }

    public text(point: IPoint, fontSize: number): Buffer {
        if (!this._text) {
            return this;
        }
        let buffer: string = '';
        buffer += "<text x=\"";
        buffer += point.x + "\" ";
        buffer += "y=\"";
        buffer += point.y + "\" ";
        if (this._thin) {
            buffer += "style=\"font-size:";
        } else {
            buffer += "style=\"font-weight:bold;font-size:";
        }
        buffer += fontSize + ";text-anchor:end\">";
        buffer += this._text;
        buffer += "</text>";
        this._buffer.push(buffer);
        return this;
    }

    public centeredText(point: IPoint, fontSize: number): Buffer {
        if (!this._text) {
            return this;
        }
        let buffer: string = '';
        buffer += "<text x=\"";
        buffer += point.x + "\" ";
        buffer += "y=\"";
        buffer += point.y + "\" ";
        if (this._thin) {
            buffer += "style=\"font-size:";
        } else {
            buffer += "style=\"font-weight:bold;font-size:";
        }
        buffer += fontSize + ";text-anchor:middle;dominant-baseline:middle\">";
        buffer += this._text;
        buffer += "</text>";
        this._buffer.push(buffer);
        return this;
    }

    public setAspect(aspect: boolean): Buffer {
        this._isAspect = aspect;
        return this;
    }

    public flush(): string {
        let result: string;
        result = this.coverStart();
        result += this._buffer.join('');
        result += this.coverEnd();
        this._buffer = [];
        return result;
    }

    protected coverStart(): string {
        let buffer: string = '';
        buffer += `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${EDGE.LENGTH} ${EDGE.LENGTH}" version="1.1" `;
        buffer += "preserveAspectRatio=\"" + (this._isAspect ? "true" : "none") + "\">";
        if (this._circle) {
            buffer += "<g clip-path=\"url(#circle)\">";
        } else {
            buffer += "<g>";
        }
        return buffer;
    }

    protected coverEnd(): string {
        let buffer: string = '';
        buffer += "</g>";
        if (this._circle) {
            buffer += "<defs>";
            buffer += "<clipPath id=\"circle\">";
            buffer += `<circle cx=\"240" cy="240" r="240"/>`;
            buffer += "</clipPath>";
            buffer += "</defs>";
        }
        buffer += "</svg>";
        return buffer;
    }

    private pointBuilder(point: IPoint): string {
        return point.x + "," + point.y;
    }

}
