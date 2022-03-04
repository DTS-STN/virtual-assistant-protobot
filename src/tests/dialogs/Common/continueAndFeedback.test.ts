import { LuisRecognizer } from 'botbuilder-ai';
import { DialogTestClient, DialogTestLogger } from 'botbuilder-testing';
import chai from 'chai';
import * as tsSinon from 'ts-sinon';
import { CommonChoiceCheckStep } from '../../../dialogs/common/commonChoiceCheckStep';
import { ContinueAndFeedbackStep } from '../../../dialogs/common/continueAndFeedbackStep';
import { FeedBackStep } from '../../../dialogs/common/feedBackStep';
const assert = require('assert');
chai.use(require('sinon-chai'));


describe('ContinueAndFeed', () => {
    describe('Should be able to initialize ConfinueAndFeed Step Dialog Yes and NO', () => {
        const sut = new ContinueAndFeedbackStep();
        sut.addDialog(new FeedBackStep());
        sut.addDialog(new CommonChoiceCheckStep())
        afterEach(() => {
            tsSinon.default.restore();
        });

        const testCases = require('../../testData/dialogs/Common/continueAndFeedbacktestdata');
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