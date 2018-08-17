/**
 * @author WMXPY
 * @fileoverview Avatar Controller tests
 */

import { expect } from 'chai';
import * as Controller from '../../../src/database/controller/import';
import { INTERNAL_SETTING } from '../../../src/database/interface/setting';
import { ISettingModel } from '../../../src/database/model/setting';
import { compareError, error, ERROR_CODE } from '../../../src/util/error/error';

export const testSettingController = (): void => {
    describe('settings controller test', (): void => {
        const testSetting: any = "test_setting";
        const testValue: any = "test_value";

        let tempInternalSetting: ISettingModel;
        let tempExternalSetting: ISettingModel;

        it('set internal setting should create a setting when is not exist', async (): Promise<void> => {
            const setting: ISettingModel = await Controller.Setting.setInternalSetting(testSetting, testValue);
            expect(setting.name).to.be.equal(testSetting);
            tempInternalSetting = setting;
        }).timeout(3200);

        it('set internal setting should update same setting when is already exist', async (): Promise<void> => {
            const setting: ISettingModel = await Controller.Setting.setInternalSetting(testSetting, testValue);
            expect(setting.name).to.be.equal(testSetting);
            expect(setting._id.toString()).to.be.equal(tempInternalSetting._id.toString());
        }).timeout(3200);

        it('set external setting should create a setting when is not exist', async (): Promise<void> => {
            const setting: ISettingModel = await Controller.Setting.setExternalSetting(testSetting, testValue);
            expect(setting.name).to.be.equal(testSetting);
            tempExternalSetting = setting;
        }).timeout(3200);

        it('set external setting should update same setting when is already exist', async (): Promise<void> => {
            const setting: ISettingModel = await Controller.Setting.setExternalSetting(testSetting, testValue);
            expect(setting.name).to.be.equal(testSetting);
            expect(setting._id.toString()).to.be.equal(tempExternalSetting._id.toString());
        }).timeout(3200);

        it('get external setting by name should return correct setting', async (): Promise<void> => {
            const value: any = await Controller.Setting.getExternalSettingByName(testSetting);
            expect(value).to.be.equal(testValue);
        }).timeout(3200);

        it('get external setting by name should throw if setting is not exist', async (): Promise<void> => {
            let compareResult: boolean = false;
            try {
                await Controller.Setting.getExternalSettingByName('nothing' as INTERNAL_SETTING);
            } catch (err) {
                compareResult = compareError(error(ERROR_CODE.SETTING_NOT_FOUND), err);
            }
            // tslint:disable-next-line
            expect(compareResult).to.be.true;
        }).timeout(3200);

        it('get internal setting by name should return correct setting', async (): Promise<void> => {
            const value: any = await Controller.Setting.getInternalSettingByName(testSetting);
            expect(value).to.be.equal(testValue);
        }).timeout(3200);

        it('get internal setting by name should throw if setting is not exist', async (): Promise<void> => {
            let compareResult: boolean = false;
            try {
                await Controller.Setting.getInternalSettingByName('nothing' as INTERNAL_SETTING);
            } catch (err) {
                compareResult = compareError(error(ERROR_CODE.SETTING_NOT_FOUND), err);
            }
            // tslint:disable-next-line
            expect(compareResult).to.be.true;
        }).timeout(3200);

        it('get all internal setting should return list of internal settings', async (): Promise<void> => {
            const settings: ISettingModel[] = await Controller.Setting.getAllInternalSetting();
            expect(settings).to.be.lengthOf(1);
        }).timeout(3200);
    });
};
