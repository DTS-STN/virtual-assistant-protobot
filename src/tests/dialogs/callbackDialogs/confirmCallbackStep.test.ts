import { DialogTestClient, DialogTestLogger } from "botbuilder-testing";

import { CallbackRecognizer } from "../../../dialogs/callbackDialogs/callbackRecognizer";
const assert = require("assert");
import chai from "chai";
import * as tsSinon from "ts-sinon";

import { Activity } from "botbuilder";
import { ConfirmCallbackStep } from "../../../dialogs/callbackDialogs/confirmCallbackStep";
chai.use(require("sinon-chai"));
import { expect } from "chai";
describe("ConfirmCallbackStep", () => {
  const testCases = require("../../testData/confirmCallbackStepTestData");
  const sut = new ConfirmCallbackStep();

  afterEach(() => {
    tsSinon.default.restore();
  });
  testCases.map((testData) => {
    it(testData.name, async () => {
      const client = new DialogTestClient("test", sut, testData.initialData, [
        new DialogTestLogger(console),
      ]);

      tsSinon.default
        .stub(CallbackRecognizer.prototype, "executeLuisQuery")
        .callsFake(() =>
          JSON.parse(
            `{"intents": {"${testData.intent}": {"score": 1}}, "entities": {"$instance": {}}}`
          )
        );

      if (testData.intent === "InitialDialog") {
        const updatedActivity: Partial<Activity> = {
          text: testData.steps[0][0],
          locale: "en",
        };
        const replyFirst = await client.sendActivity(updatedActivity);

        const replySecond = client.getNextReply();
        assert.strictEqual(
          replyFirst ? replyFirst.text : null,
          testData.steps[0][1],
          `${replyFirst ? replyFirst.text : null} != ${testData.steps[0][1]}`
        );
        assert.strictEqual(
          replySecond ? replySecond.text : null,
          testData.steps[1][1],
          `${replySecond ? replySecond.text : null} != ${testData.steps[1][1]}`
        );
        const updateAgainActivity: Partial<Activity> = {
          text: testData.steps[2][0],
          locale: "en",
        };
      } else {
        // Execute the test case
        console.log(`Test Case: ${testData.name}`);
        console.log(`Dialog Input ${testData.initialData}`);

        for (const step of testData.steps) {
          const updatedActivity: Partial<Activity> = {
            text: step[0],
            locale: "en",
          };

          const reply = await client.sendActivity(updatedActivity);

          assert.strictEqual(
            reply ? reply.text : null,
            step[1],
            `${reply ? reply.text : null} != ${step[1]}`
          );
        }
      }
      console.log(
        `Dialog result: ${JSON.stringify(client.dialogTurnResult.result)}`
      );
      if (typeof client.dialogTurnResult.result === "object") {
        assert.strictEqual(
          JSON.stringify(client.dialogTurnResult.result),
          JSON.stringify(testData.expectedResult),
          `${JSON.stringify(testData.expectedResult)} != ${JSON.stringify(
            client.dialogTurnResult.result
          )}`
        );
      } else {
        assert.strictEqual(
          client.dialogTurnResult.result,
          testData.expectedResult,
          `${testData.expectedResult} != ${client.dialogTurnResult.result}`
        );
      }
    });
  });
});
