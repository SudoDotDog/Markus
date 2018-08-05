/**
 * @author WMXPY
 * @fileoverview Upload Manager Test
 */

import { expect } from 'chai';
import { middleware } from '../../../src/interface';
import { IFileManager } from '../../../src/util/manager/file/import';
import UploadManager from '../../../src/util/manager/upload';
import { IMockFsSyncsCB, monkFsSyncs } from '../../mock/mock';

describe('test upload manager util', (): void => {

    let testContent: UploadManager;

    it('construct upload manager will trigger exist check and make dir', (): void => {
        const restoreSyncs: () => IMockFsSyncsCB = monkFsSyncs();

        testContent = new UploadManager();
        const result: IMockFsSyncsCB = restoreSyncs();

        expect(result.exist).to.be.lengthOf(0);
        expect(result.mkdir).to.be.lengthOf(0);
        expect(result.read).to.be.lengthOf(0);
        expect(result.unlink).to.be.lengthOf(0);
        expect(result.write).to.be.lengthOf(0);
    });

    it('generate engines functions should not throw an error', (): void => {
        // tslint:disable-next-line
        expect(testContent.generateMulterEngine.bind(testContent, 'image')).to.be.not.throw;

        // tslint:disable-next-line
        expect(testContent.generateBase64Engine.bind(testContent)).to.be.not.throw;

        // tslint:disable-next-line
        expect(testContent.generateBufferEngine.bind(testContent)).to.be.not.throw;
    });

    it('generated multer engine should be not null', (): void => {
        const engine: middleware = testContent.generateMulterEngine('image');
        // tslint:disable-next-line
        expect(engine).to.be.not.null;
    });

    it('generated buffer engine should be not null', (): void => {
        const engine: middleware = testContent.generateBufferEngine();
        // tslint:disable-next-line
        expect(engine).to.be.not.null;
    });

    it('generated base64 engine should be not null', (): void => {
        const engine: middleware = testContent.generateBase64Engine();
        // tslint:disable-next-line
        expect(engine).to.be.not.null;
    });

    it('create buffer file should return a buffer manager', async (): Promise<void> => {
        const buffer: Buffer = Buffer.from('test');
        const manager: IFileManager = testContent.createBufferFile(buffer, {
            mimetype: 'image/jpeg;',
        } as any);
        const hash: string = await manager.hash();

        expect(hash).to.be.equal('098f6bcd4621d373cade4e832627b4f6');
        return;
    });

    it('create base64 file should return a base64 manager', async (): Promise<void> => {
        const manager: IFileManager = testContent.createBase64File('image/:jpeg;base64,:something');
        const hash: string = await manager.hash();

        expect(hash).to.be.equal('c779f793354d8f3fc88f7ca79d4a70eb');
        return;
    });

    it('next function should improve count and return a path', async (): Promise<void> => {
        const { filename } = (testContent as any).next('image/jpeg');
        expect(filename.substring(filename.length - 4, filename.length)).to.be.equal('jpeg');
    });
});
