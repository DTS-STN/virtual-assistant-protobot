import { DialogTestClient, DialogTestLogger } from 'botbuilder-testing';

import { CallbackRecognizer } from '../../../dialogs/calllbackDialogs/callbackRecognizer';
const assert = require('assert');
import * as tsSinon from 'ts-sinon';
import { Activity } from 'botbuilder';
import { ConfirmEmailStep } from '../../../dialogs/confirmEmailStep';
import { GetUserPhoneNumberStep } from '../../../dialogs/getUserPhoneNumberStep';
import { ConfirmPhoneStep } from '../../../dialogs/confirmPhoneStep';
import { GetUserEmailStep } from '../../../dialogs/getUserEmailStep';
import { GetPreferredMethodOfContactStep } from '../../../dialogs/getPreferredMethodOfContactStep';

describe('GetUserEmailStep', () => {
  const testCases = require('../../testData/getUserEmailStepTestData');
  const sut = new GetUserEmailStep();
  sut.addDialog(new ConfirmEmailStep());
  sut.addDialog(new GetUserPhoneNumberStep());
  sut.addDialog(new ConfirmPhoneStep());
  sut.addDialog(new GetPreferredMethodOfContactStep());
  afterEach(() => {
    tsSinon.default.restore();
  });
  testCases.map((testData) => {
    it(testData.name, async () => {
      const client = new DialogTestClient('test', sut, testData.initialData, [
        new DialogTestLogger(console)
      ]);

      tsSinon.default
        .stub(CallbackRecognizer.prototype, 'executeLuisQuery')
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
          locale: 'en'
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
      if (typeof client.dialogTurnResult.result === 'object') {
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
