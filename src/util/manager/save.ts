/**
 * @author WMXPY
 * @fileoverview Management Utils Save
 */

import * as AWS from 'aws-sdk';
import * as Fs from 'fs';
import { MODE } from '../../interface';
import Config from '../../markus';
import { mkPathDir } from '../data/file';
import { fileBuilder, pathBuilder } from '../data/path';
import { error, ERROR_CODE } from '../error/error';
import { s3ExternalFileKeyBuilder } from '../external/s3';
import { IFileLink } from './file/interface';

export type ImageSaveFunction = (folder: string, filename: string, buffer: Buffer) => Promise<IFileLink>;

export const getSaveImageByBufferFunction = () => {
    if (Config.mode === MODE.AMAZON_S3) {
        return generateSaveS3ImageByBuffer();
    }
    return saveImageByBuffer;
};

export const saveImageByBuffer: ImageSaveFunction = (folder: string, filename: string, buffer: Buffer): Promise<IFileLink> => {
    return new Promise<IFileLink>((resolve: (link: IFileLink) => void, reject: (error: Error) => void) => {
        mkPathDir(pathBuilder(folder));
        const filepath: string = fileBuilder(folder, filename);
        Fs.writeFile(filepath, buffer, (err: Error) => {
            if (err) {
                reject(error(ERROR_CODE.IMAGE_SAVE_FAILED));
            }
            resolve({
                folder,
                filename,
            });
        });
    });
};

export const generateSaveS3ImageByBuffer: () => ImageSaveFunction = () => {
    const S3: AWS.S3 = new AWS.S3();
    if (!Config.S3) {
        throw error(ERROR_CODE.AMAZON_S3_CONFIG_NOT_FOUND);
    }

    S3.config.update({
        accessKeyId: Config.S3.accessKeyId,
        secretAccessKey: Config.S3.secretAccessKey,
    });
    const saveS3ImageByBuffer: ImageSaveFunction = (folder: string, filename: string, buffer: Buffer): Promise<IFileLink> => {
        return new Promise<IFileLink>((resolve: (link: IFileLink) => void, reject: (error: Error) => void) => {
            if (!Config.S3) {
                throw error(ERROR_CODE.AMAZON_S3_CONFIG_NOT_FOUND);
            }

            S3.putObject({
                Bucket: Config.S3.bucket,
                Key: s3ExternalFileKeyBuilder(folder, filename),
                Body: buffer,
                ACL: 'public-read',
            }, (err: AWS.AWSError, data: AWS.S3.PutObjectOutput) => {
                if (err) {
                    reject(err);
                }

                resolve({
                    folder,
                    filename,
                });
            });
        });
    };
    return saveS3ImageByBuffer;
};
