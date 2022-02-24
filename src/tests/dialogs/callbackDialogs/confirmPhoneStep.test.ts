import { DialogTestClient, DialogTestLogger } from 'botbuilder-testing';

import { CallbackRecognizer } from '../../../dialogs/callbackDialogs/callbackRecognizer';
const assert = require('assert');
import chai from 'chai';
import * as tsSinon from 'ts-sinon';

import { Activity } from 'botbuilder';

import {
  GetUserPhoneNumberStep,
  GET_USER_PHONE_NUMBER_STEP
} from '../../../dialogs/callbackDialogs/getUserPhoneNumberStep';
chai.use(require('sinon-chai'));
import { expect } from 'chai';
import { ConfirmPhoneStep } from '../../../dialogs/callbackDialogs/confirmPhoneStep';
describe('ConfirmUserPhoneStep', () => {
  const testCases = require('../../testData/callbackTestData/confirmPhoneStepTestData');
  const sut = new ConfirmPhoneStep();
  sut.addDialog(new GetUserPhoneNumberStep());
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
