import { LuisRecognizer } from "botbuilder-ai";
const assert = require("assert");
import chai from "chai";
import * as tsSinon from "ts-sinon";
chai.use(require("sinon-chai"));
import { DialogTestClient, DialogTestLogger } from "botbuilder-testing";
import { CommonChoiceCheckStep } from "../../../../dialogs/alwaysonbotDialogs/UpdateProfile/UpdatePhoneNumber/commonChoiceCheckStep";
import { OASBenefitStep } from "../../../../dialogs/alwaysonbotDialogs/OASBenefit/oASBenefitStep";
import { ApplicationStatusStep } from "../../../../dialogs/alwaysonbotDialogs/OASBenefit/applicationStatusStep";

describe("OASBenefitStep", () => {
    describe("Should be able to initialize OAS Step Dialog", () => {
        const sut = new OASBenefitStep();

        sut.addDialog(new CommonChoiceCheckStep());
        sut.addDialog(new ApplicationStatusStep());

        afterEach(() => {
            tsSinon.default.restore();
        });

        const testCases = require("../../../testdata/dialogs/OASBenifit/oASBenifittestdata");

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