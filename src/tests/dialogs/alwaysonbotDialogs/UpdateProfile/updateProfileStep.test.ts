import { LuisRecognizer } from 'botbuilder-ai';
const assert = require('assert');
import chai from 'chai';
import * as tsSinon from 'ts-sinon';
chai.use(require('sinon-chai'));
import { DialogTestClient, DialogTestLogger } from 'botbuilder-testing';
import { UpdateAddressStep } from '../../../../dialogs/alwaysOnDialogs/UpdateProfile/UpdateAddress/updateAddressStep';
import { UpdateProfileStep } from '../../../../dialogs/alwaysOnDialogs/UpdateProfile/updateProfileStep';
import { UpdateMyEmailStep } from '../../../../dialogs/alwaysOnDialogs/UpdateProfile/UpdateEmail/updateMyEmailStep';
import { UpdateMyPhoneStep } from '../../../../dialogs/alwaysOnDialogs/UpdateProfile/UpdatePhoneNumber/updateMyPhoneStep';
import { CommonChoiceCheckStep } from '../../../../dialogs/common/commonChoiceCheckStep';

describe('UpdateMyProfile', () => {
    describe('Should be able to initialize Update address,Update phoneNumebr,Update Email Step Dialog', () => {
        const sut = new UpdateProfileStep();

        sut.addDialog(new CommonChoiceCheckStep());
        sut.addDialog(new UpdateAddressStep());
        sut.addDialog(new UpdateMyEmailStep());
        sut.addDialog(new UpdateMyPhoneStep());

        afterEach(() => {
            tsSinon.default.restore();
        });

        const testCases = require('../../../testData/dialogs/updatePropfiledata');
        testCases.map((testData) => {
            it(testData.name, async () => {
                const client = new DialogTestClient('test', sut, testData.initialData, [
                    new DialogTestLogger()
                ]);

                tsSinon.default
                    .stub(LuisRecognizer.prototype, 'recognize')
                    .callsFake(() =>
                        JSON.parse(
                            `{"intents": {"${testData.intent}": {"score": 1}}, "entities": {"$instance": {}}}`
                        )
                    );

                for (const step of testData.steps) {
                    const reply = await client.sendActivity(step[0]);
                    assert.strictEqual((reply ? reply.text : null), step[1], `${reply ? reply.text : null} != ${step[1]}`);
                }
            });
        });
    });
});