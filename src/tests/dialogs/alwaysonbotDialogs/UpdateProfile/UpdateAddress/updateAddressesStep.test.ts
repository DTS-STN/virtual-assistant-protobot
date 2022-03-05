import { LuisRecognizer } from 'botbuilder-ai';
const assert = require('assert');
import chai from 'chai';
import * as tsSinon from 'ts-sinon';
chai.use(require('sinon-chai'));
import { DialogTestClient, DialogTestLogger } from 'botbuilder-testing';
import { UpdateAddressStep } from '../../../../../dialogs/alwaysOnDialogs/UpdateProfile/UpdateAddress/updateAddressStep';
import { GetAddressesStep } from '../../../../../dialogs/alwaysOnDialogs/UpdateProfile/UpdateAddress/getAddressesStep';
import { ContinueAndFeedbackStep } from '../../../../../dialogs/common/continueAndFeedbackStep';
import { CommonChoiceCheckStep } from '../../../../../dialogs/common/commonChoiceCheckStep';

describe('UpdateAddress', () => {
    describe('Should be able to initialize Update Address Step Dialog', () => {
        const sut = new UpdateAddressStep();

        sut.addDialog(new CommonChoiceCheckStep());
        sut.addDialog(new GetAddressesStep());
        sut.addDialog(new ContinueAndFeedbackStep());

        afterEach(() => {
            tsSinon.default.restore();
        });

        const testCases = require('../../../../testData/dialogs/UpdateProfile/UpdateAddress/updateAddressdata')

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