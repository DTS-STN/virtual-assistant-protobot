import { DialogTestClient, DialogTestLogger } from "botbuilder-testing";

import { CallbackRecognizer } from "../../../dialogs/callbackDialogs/callbackRecognizer";
const assert = require("assert");
import * as tsSinon from "ts-sinon";
import { Activity } from "botbuilder";
import { ConfirmCallbackPhoneNumberStep } from "../../../dialogs/callbackDialogs/confirmCallbackPhoneNumberStep";
import {
  GetUserPhoneNumberStep,
  GET_USER_PHONE_NUMBER_STEP,
} from "../../../dialogs/callbackDialogs/getUserPhoneNumberStep";

describe("ConfirmCallbackPhoneNumberStep", () => {
  const testCases = require("../../testData/callbackTestData/confirmCallbackPhoneNumberStepTestData");
  const sut = new ConfirmCallbackPhoneNumberStep();
  const getUserPhoneNumberStep = new GetUserPhoneNumberStep();
  sut.addDialog(getUserPhoneNumberStep);

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

      // Execute the test case
      console.log(`Test Case: ${testData.name}`);
      console.log(`Dialog Input ${JSON.stringify(testData.initialData)}`);
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
