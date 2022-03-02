import { LuisRecognizer } from "botbuilder-ai";
import { DialogTestClient, DialogTestLogger } from "botbuilder-testing";
import chai from "chai";
import * as tsSinon from "ts-sinon";
import { ContinueAndFeedbackStep } from "../../../../../dialogs/common/continueAndFeedbackStep";
import { ConfirmEmailStep } from "../../../../../dialogs/alwaysOnDialogs/UpdateProfile/UpdateEmail/confirmEmailStep";
import { UpdateMyEmailStep } from "../../../../../dialogs/alwaysOnDialogs/UpdateProfile/UpdateEmail/updateMyEmailStep";
import { CommonChoiceCheckStep } from "../../../../../dialogs/common/commonChoiceCheckStep";

const assert = require("assert");
chai.use(require("sinon-chai"));

describe("UpdateMyEmail", () => {
    describe("Should be able to initialize Update Email address Step Dialog", () => {
        const sut = new UpdateMyEmailStep();

        sut.addDialog(new ConfirmEmailStep());
        sut.addDialog(new ContinueAndFeedbackStep());
        sut.addDialog(new CommonChoiceCheckStep());

        afterEach(() => {
            tsSinon.default.restore();
        });

        const testCases = require("../../../../testdata/dialogs/UpdateProfile/UpdateEmail/updateMyEmaildata");

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