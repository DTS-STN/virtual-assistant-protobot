import { LuisRecognizer } from "botbuilder-ai";
const assert = require("assert");
import chai from "chai";
import * as tsSinon from "ts-sinon";
chai.use(require("sinon-chai"));
import { DialogTestClient, DialogTestLogger } from "botbuilder-testing";
import { FeedBackStep } from "../../../dialogs/common/feedBackStep";

describe("FeedbackStep", () => {
    describe("Should be able to initialize Feedback Step End Dialog", () => {
        const sut = new FeedBackStep();
        afterEach(() => {
            tsSinon.default.restore();
        });

        const testCases = require("../../testData/dialogs/Common/feedbacktestdata");
        testCases.map((testData) => {
            it(testData.name, async () => {
                const client = new DialogTestClient("test", sut, testData.initialData, [
                    new DialogTestLogger()
                ]);

                tsSinon.default
                    .stub(LuisRecognizer.prototype, "recognize")
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