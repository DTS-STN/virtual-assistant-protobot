import { LuisRecognizer } from "botbuilder-ai";
import { DialogTestClient, DialogTestLogger } from "botbuilder-testing";
import chai, { expect } from "chai";
import * as tsSinon from "ts-sinon";
import { ChoiceCheckUpdateAddressStep } from "../../../../../dialogs/alwaysonbotDialogs/UpdateProfile/UpdateAddress/choiceCheckUpdateAddressStep";
const assert = require("assert");
chai.use(require("sinon-chai"));

describe("ChoiceCheckUpdateAddressStep", () => {
    describe("should be able to initialise choice check update address step", () => {
        const sut = new ChoiceCheckUpdateAddressStep();

        afterEach(() => {
            tsSinon.default.restore();
        });

        const testCases = require("../../../../testdata/dialogs/UpdateProfile/UpdateAddress/choicecheckUpdateAddressdata")

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
                    let reply;
                    if(step[0])
                    {
                        reply = await client.sendActivity(step[0]);
                    }
                    else
                    {
                        reply = await client.getNextReply();
                    }

                    if (step[1])
                    {
                        assert.strictEqual((reply ? reply.text : null), step[1], '${reply ? reply.text : null} != ${step[1]}');
                    }
                    else
                    {
                        expect(reply).to.be.undefined;
                    }
                }
            });
        });

    });
});
