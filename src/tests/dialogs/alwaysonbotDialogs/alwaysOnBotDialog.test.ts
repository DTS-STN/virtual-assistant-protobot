import { LuisRecognizer } from "botbuilder-ai";
import { DialogTestClient, DialogTestLogger } from "botbuilder-testing";
import chai from "chai";
import * as tsSinon from "ts-sinon";
import { AlwaysOnBotDialog } from "../../../dialogs/alwaysOnDialogs/alwaysOnBotDialog";
import { OASBenefitStep } from "../../../dialogs/alwaysOnDialogs/OASBenefit/oASBenefitStep";
import { UpdateAddressStep } from "../../../dialogs/alwaysOnDialogs/UpdateProfile/UpdateAddress/updateAddressStep";
import { CommonChoiceCheckStep } from "../../../dialogs/common/commonChoiceCheckStep";
const assert = require("assert");
chai.use(require("sinon-chai"));


describe("AlwaysOnBotDialog", () => {
    describe("Should be able to initialize Main Dialog and Update profile Dialog", () => {
        const sut = new AlwaysOnBotDialog();

        sut.addDialog(new CommonChoiceCheckStep());
        sut.addDialog(new UpdateAddressStep());
        sut.addDialog(new OASBenefitStep());

        afterEach(() => {
            tsSinon.default.restore();
        });

        const testCases = require("../../testData/dialogs/alwaysOnBotTestdata");

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