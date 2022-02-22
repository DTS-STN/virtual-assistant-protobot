import { LuisRecognizer } from "botbuilder-ai";
const assert = require("assert");
import chai, { expect } from "chai";
import * as tsSinon from "ts-sinon";
chai.use(require("sinon-chai"));
import { DialogTestClient, DialogTestLogger } from "botbuilder-testing";
import { CommonChoiceCheckStep } from "../../../../dialogs/alwaysonbotDialogs/UpdateProfile/UpdatePhoneNumber/commonChoiceCheckStep";
import { CommonCallBackStep } from "../../../../dialogs/alwaysonbotDialogs/UpdateProfile/commonCallBackStep";
import { FeedBackStep } from "../../../../dialogs/alwaysonbotDialogs/Common/feedBackStep";

describe("CommonCallBack", () => {
    describe("Should be able to initialize Common Call back Step Dialog", () => {
        const sut = new CommonCallBackStep();

        sut.addDialog(new CommonChoiceCheckStep());
        sut.addDialog(new FeedBackStep());

        afterEach(() => {
            tsSinon.default.restore();
        });

        const testCases = require("../../../testdata/dialogs/commonCallbackdata");

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
                            assert.strictEqual((reply ? reply.text : null), step[1], `${reply ? reply.text : null} != ${step[1]}`);
                        }
                        else
                        {
                            //assertNull(reply, null);
                            expect(reply).to.be.undefined;
                        }
                    }


            });
        });
    });
});