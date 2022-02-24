import { Activity } from "botbuilder";
import { LuisRecognizer } from "botbuilder-ai";
import { DialogTestClient, DialogTestLogger } from "botbuilder-testing";
import chai, { expect } from "chai";
import * as tsSinon from "ts-sinon";
import { ContinueAndFeedbackStep } from "../../../../dialogs/alwaysonbotDialogs/Common/continueAndFeedbackStep";
import { ApplicationStatusStep } from "../../../../dialogs/alwaysonbotDialogs/OASBenefit/applicationStatusStep";
import { CommonChoiceCheckStep } from "../../../../dialogs/alwaysonbotDialogs/UpdateProfile/UpdatePhoneNumber/commonChoiceCheckStep";
import i18n from "../../../../dialogs/locales/i18nConfig";
const assert = require("assert");
chai.use(require("sinon-chai"));

describe("ApplicationStatusStep", () => {
    describe("Should be able to complete applicationStatusStep dialog", () => {
        
        const sut = new ApplicationStatusStep();
        const  mockcontinueandFeedbackDialog= new ContinueAndFeedbackStep();
        sut.addDialog(mockcontinueandFeedbackDialog);
        sut.addDialog(new CommonChoiceCheckStep());
        const promptMsg = i18n.__("oasBenefitCheckProfile");
        const firstmsg = i18n.__("oasBenefitPaymentDue");
        const  secondmsg = i18n.__("oasBenefitShowDeposit");
        const feedbackprompt = i18n.__("continueAndFeedPromptMessage");
        const testCases = [
            {
              utterance: "What is My Application Status",
              name: "initial application status to feedback",
              initialData: {
                locale: "en"
              },
              invokedDialogResponse: "application status dialog invoked mock invoked"
            }
          ];
        afterEach(() => {
            tsSinon.default.restore();
          });
          testCases.map((testData) => {
            it(testData.name, async () => {
                const client = new DialogTestClient("test", sut, testData.initialData, [
                    new DialogTestLogger()
                ]);
                tsSinon.default
                .stub(LuisRecognizer.prototype, "recognize")
                .callsFake(() =>
                    JSON.parse(
                        `{"intents": {"Yes": {"score": 1}}, "entities": {"$instance": {}}}`
                    )
                );
                const updatedActivity: Partial<Activity> = {
                    text: "hi",
                    locale: "en"
                };
                const reply = await client.sendActivity(updatedActivity);
                expect(reply.text).to.be.equal(promptMsg);

                const firstReply = client.getNextReply();
                expect(firstReply.text).to.be.equal(firstmsg);

                const secondReply = client.getNextReply();
                expect(secondReply.text).to.be.equal(secondmsg);

                const reply1 = await client.getNextReply();
                expect(reply1.text).to.be.equal(feedbackprompt);
            });
        });
    });
});