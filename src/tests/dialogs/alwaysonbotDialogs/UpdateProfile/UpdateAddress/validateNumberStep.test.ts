import { LuisRecognizer } from "botbuilder-ai";
import { DialogTestClient, DialogTestLogger } from "botbuilder-testing";
import chai from "chai";
import * as tsSinon from "ts-sinon";
import { ContinueAndFeedbackStep } from "../../../../../dialogs/alwaysonbotDialogs/Common/continueAndFeedbackStep";
import { CommonCallBackStep } from "../../../../../dialogs/alwaysonbotDialogs/UpdateProfile/commonCallBackStep";
import { ValidateNumberStep } from "../../../../../dialogs/alwaysonbotDialogs/UpdateProfile/UpdateAddress/validateNumberStep";
import { ConfirmEmailStep } from "../../../../../dialogs/alwaysonbotDialogs/UpdateProfile/UpdateEmail/confirmEmailStep";
import { UpdateMyEmailStep } from "../../../../../dialogs/alwaysonbotDialogs/UpdateProfile/UpdateEmail/updateMyEmailStep";
import { CommonChoiceCheckStep } from "../../../../../dialogs/alwaysonbotDialogs/UpdateProfile/UpdatePhoneNumber/commonChoiceCheckStep";

const assert = require("assert");
chai.use(require("sinon-chai"));

describe("ValidateNumberStep", () => {
    describe("Should be able to initialize Validate Number Step Dialog", () => {
        const sut = new ValidateNumberStep();

        sut.addDialog(new ContinueAndFeedbackStep());
        sut.addDialog(new CommonCallBackStep());

        afterEach(() => {
            tsSinon.default.restore();
        });

        const testCases = require("../../../../testdata/dialogs/UpdateProfile/UpdateAddress/validateNumberData");

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