import { LuisRecognizer } from 'botbuilder-ai';
import { DialogTestClient, DialogTestLogger } from 'botbuilder-testing';
import chai from 'chai';
import * as tsSinon from 'ts-sinon';
import { ContinueAndFeedbackStep } from '../../../../../dialogs/common/continueAndFeedbackStep';
import { FeedBackStep } from '../../../../../dialogs/common/feedBackStep';
import { CommonCallBackStep } from '../../../../../dialogs/alwaysOnDialogs/UpdateProfile/commonCallBackStep';
import { ConfirmPhoneNumberStep } from '../../../../../dialogs/alwaysOnDialogs/UpdateProfile/UpdatePhoneNumber/confirmPhoneNumberStep';
import { CommonChoiceCheckStep } from '../../../../../dialogs/common/commonChoiceCheckStep';
const assert = require('assert');
chai.use(require('sinon-chai'));

describe('ConfirmPhoneNumber', () => {
    describe('Should be able to initialize confirm phone number step', () => {
        const sut = new ConfirmPhoneNumberStep();

        sut.addDialog(new CommonCallBackStep());
        sut.addDialog(new ContinueAndFeedbackStep());
        sut.addDialog(new ConfirmPhoneNumberStep());
        sut.addDialog(new FeedBackStep());
        sut.addDialog(new CommonChoiceCheckStep());

        afterEach(() => {
            tsSinon.default.restore();
        });

        const testCases = require('../../../../testdata/dialogs/UpdateProfile/UpdatePhoneNumber/confirmPhoneNumberdata');

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
                        let reply;
                        if(step[0])
                        {
                            reply = await client.sendActivity(step[0]);
                        }
                        else
                        {
                            reply = await client.getNextReply();
                        }
                        assert.strictEqual((reply ? reply.text : null), step[1], `${reply ? reply.text : null} != ${step[1]}`);
                    }
            });
        });
    });
});
