/**
 * @author WMXPY
 * @fileoverview Default Icon generator
 */

import { chaetodon } from './chaetodon/chaetodon';
import { IIconConfig } from './interface';
import Buffer from './sparidae/buffer';
import Color from './sparidae/color';
import Generator from './sparidae/generator';
import Parser from './sparidae/parser';
import Point, { IPoint } from './sparidae/point';

export const Icon = (str: string, options: IIconConfig = {}) => {
    const generator: Generator = new Generator(str);
    const point: Point = new Point();
    const parser: Parser = new Parser(str);
    let buffer: Buffer;
    if (options.display) {
        buffer = new Buffer(options.display);
    } else if (options.display === '') {
        buffer = new Buffer(options.display);
    } else {
        buffer = new Buffer(parser.getTwoDigitResult());
    }
    const color: Color = new Color(chaetodon(generator.splice(27, 30)));

    const points: IPoint[] = [
        point.getPoint(generator.splice(0, 6)),
        point.getPoint(generator.splice(6, 12)),
        point.getPoint(generator.splice(12, 18)),
        point.getPoint(generator.splice(18, 24)),
        point.getPoint(generator.splice(21, 27)),
        point.getPoint(generator.splice(24, 30)),
        point.getPoint(generator.splice(5, 12)),
        point.getPoint(generator.splice(15, 21)),
        point.getPoint(generator.splice(23, 28)),
    ];

    if (options.circle) {
        buffer.setCircle(options.circle);
    }
    if (options.thin) {
        buffer.setThin(options.thin);
    }

    points.push(
        point.getMediumPoint(points[0], points[3], generator.splice(18, 21)),
        point.getMediumPoint(points[1], points[4], generator.splice(21, 24)),
        point.getMediumPoint(points[2], points[5], generator.splice(24, 27)),
        point.getMediumPoint(points[3], points[6], generator.splice(18, 21)),
        point.getMediumPoint(points[4], points[7], generator.splice(21, 24)),
        point.getMediumPoint(points[5], points[8], generator.splice(24, 27)),
        point.getMediumPoint(points[6], points[0], generator.splice(18, 21)),
        point.getMediumPoint(points[7], points[1], generator.splice(21, 24)),
        point.getMediumPoint(points[8], points[2], generator.splice(24, 27)),
    );

    const loop: () => string = color.rgba();

    buffer
        .rect(points[0], points[1], points[2], loop())
        .rect(points[3], points[4], points[5], loop())
        .rect(points[6], points[7], points[8], loop())
        .rect(points[9], points[10], points[11], loop())
        .rect(points[12], points[13], points[14], loop())
        .rect(points[15], points[16], points[17], loop());

    let fontSize: number = point.getFontSize();
    if (options.larger) {
        fontSize = point.getLargerFontSize();
    }

    if (options.center) {
        buffer.centeredText(point.getCenterPoint(), fontSize);
    } else {
        buffer.text(point.getEndPoint(), fontSize);
    }

    return buffer.flush();
};
