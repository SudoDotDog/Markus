/**
 * @author WMXPY
 * @fileoverview Util Command Builder and executer unit Test
 */

import { expect } from 'chai';
import { mockWriteStream } from '../../mock/mock';

describe('test command utils', (): void => {

    it('execute should get expected stdout', (): void => {
        const testBuffer = Buffer.from('test');
        const execute: () => void = () => {
            manager = new BufferFileManager(
                'testPath',
                () => {
                    releaseCounter++;
                },
                testBuffer,
                'testMime',
            );
        };
        expect(execute).to.be.not.throw();
    });
});
