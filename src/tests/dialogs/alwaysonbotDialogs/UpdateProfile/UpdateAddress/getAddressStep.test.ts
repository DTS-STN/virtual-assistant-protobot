import { LuisRecognizer } from "botbuilder-ai";
import { DialogTestClient, DialogTestLogger } from "botbuilder-testing";
import chai, { expect } from "chai";
import * as tsSinon from "ts-sinon";
import { ContinueAndFeedbackStep } from "../../../../../dialogs/common/continueAndFeedbackStep";
import { CommonCallBackStep } from "../../../../../dialogs/alwaysOnDialogs/UpdateProfile/commonCallBackStep";
import { ChoiceCheckUpdateAddressStep } from "../../../../../dialogs/alwaysOnDialogs/UpdateProfile/UpdateAddress/choiceCheckUpdateAddressStep";
import { GetAddressesStep } from "../../../../../dialogs/alwaysOnDialogs/UpdateProfile/UpdateAddress/getAddressesStep";
import { AddressAPI } from "../../../../../utils/addressAPI";
import { CommonChoiceCheckStep } from "../../../../../dialogs/common/commonChoiceCheckStep";
const assert = require("assert");
chai.use(require("sinon-chai"));

describe("GetAddressStep", () => {
    describe("should be able to initialize get address step with excat postal code", () => {
        const sut = new GetAddressesStep();

        sut.addDialog(new ChoiceCheckUpdateAddressStep());
        sut.addDialog(new CommonCallBackStep());
        sut.addDialog(new ContinueAndFeedbackStep());
        sut.addDialog(new CommonChoiceCheckStep());

        afterEach(() => {
            tsSinon.default.restore();
        });

        const apiTestData = require("../../../../testdata/dialogs/UpdateProfile/UpdateAddress/getaddresstestdataT2T");
        const testCases = require("../../../../testdata/dialogs/UpdateProfile/UpdateAddress/getAddressdataT2T");
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
                    tsSinon.default
                    .stub(AddressAPI.prototype, "getAddress")
                    .returns(
                            apiTestData
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
    describe("should be able to initialize get address step with found 3 address with postal code", () => {
        const sut = new GetAddressesStep();

        sut.addDialog(new ChoiceCheckUpdateAddressStep());
        sut.addDialog(new CommonCallBackStep());
        sut.addDialog(new ContinueAndFeedbackStep());
        sut.addDialog(new CommonChoiceCheckStep());

        afterEach(() => {
            tsSinon.default.restore();
        });

        const apiTestData = require("../../../../testdata/dialogs/UpdateProfile/UpdateAddress/getaddresstestdataL4H");
        const testCases = require("../../../../testdata/dialogs/UpdateProfile/UpdateAddress/getAddressdataL4H");
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
                    tsSinon.default
                    .stub(AddressAPI.prototype, "getAddress")
                    .returns(
                            apiTestData
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
                            if (step[2])
                            {
                                assert.strictEqual((reply ? reply.attachments[0].content.text : null), step[2], `${reply ? reply.attachments[0].content.text : null} != ${step[2]}`);
                            }
                            else
                            {
                                expect(reply).to.be.undefined;
                            }
                        }
                    }
            });
        });
    });
    describe("should be able to initialize get address step with found greater than 5  address with postal code", () => {
        const sut = new GetAddressesStep();

        sut.addDialog(new ChoiceCheckUpdateAddressStep());
        sut.addDialog(new CommonCallBackStep());
        sut.addDialog(new ContinueAndFeedbackStep());
        sut.addDialog(new CommonChoiceCheckStep());

        afterEach(() => {
            tsSinon.default.restore();
        });

        const apiTestData = require("../../../../testdata/dialogs/UpdateProfile/UpdateAddress/getaddresstestdataX0E");
        const testCases = require("../../../../testdata/dialogs/UpdateProfile/UpdateAddress/getAddressdataX0E");
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
                    tsSinon.default
                    .stub(AddressAPI.prototype, "getAddress")
                    .returns(
                            apiTestData
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
    describe("should be able to initialize get address step with Postal Box", () => {
        const sut = new GetAddressesStep();

        sut.addDialog(new ChoiceCheckUpdateAddressStep());
        sut.addDialog(new CommonCallBackStep());
        sut.addDialog(new ContinueAndFeedbackStep());
        sut.addDialog(new CommonChoiceCheckStep());

        afterEach(() => {
            tsSinon.default.restore();
        });

        const apiTestData = require("../../../../testdata/dialogs/UpdateProfile/UpdateAddress/getaddresstestdataT7S");
        const testCases = require("../../../../testdata/dialogs/UpdateProfile/UpdateAddress/getAddressdataT7S");
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
                    tsSinon.default
                    .stub(AddressAPI.prototype, "getAddress")
                    .returns(
                            apiTestData
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
