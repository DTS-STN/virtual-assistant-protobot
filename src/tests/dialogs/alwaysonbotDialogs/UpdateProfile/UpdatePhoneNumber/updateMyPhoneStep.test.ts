import { LuisRecognizer } from "botbuilder-ai";
const assert = require("assert");
import chai from "chai";
import * as tsSinon from "ts-sinon";
chai.use(require("sinon-chai"));
import { DialogTestClient, DialogTestLogger } from "botbuilder-testing";
import { ConfirmPhoneNumberStep } from "../../../../../dialogs/alwaysOnDialogs/UpdateProfile/UpdatePhoneNumber/confirmPhoneNumberStep";
import { ContinueAndFeedbackStep } from "../../../../../dialogs/common/continueAndFeedbackStep";
import { UpdateMyPhoneStep } from "../../../../../dialogs/alwaysOnDialogs/UpdateProfile/UpdatePhoneNumber/updateMyPhoneStep";
import { CommonChoiceCheckStep } from "../../../../../dialogs/common/commonChoiceCheckStep";

describe("UpdateMyPhoneNumber", () => {
    describe("Should be able to initialize Update phone number Step Dialog", () => {
        const sut = new UpdateMyPhoneStep();

        sut.addDialog(new ConfirmPhoneNumberStep());
        sut.addDialog(new ContinueAndFeedbackStep());
        sut.addDialog(new CommonChoiceCheckStep());

        afterEach(() => {
            tsSinon.default.restore();
        });

        const testCases = require("../../../../testdata/dialogs/UpdateProfile/UpdatePhoneNumber/UpdateMyPhoneNumberData");

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