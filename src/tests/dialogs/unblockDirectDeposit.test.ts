import {
  Activity,
  CardFactory,
  ConversationState,
  MemoryStorage,
  MessageFactory,
  TestAdapter,
} from 'botbuilder';
import {
  ChoicePrompt,
  ComponentDialog,
  DialogSet,
  DialogTurnStatus,
  ListStyle,
  TextPrompt,
  WaterfallDialog,
  WaterfallStepContext,
} from 'botbuilder-dialogs';
import { DialogTestClient, DialogTestLogger } from 'botbuilder-testing';
import {
  whatNumbersToFindSchema,
  howToFindNumbersSchema,
  TwoTextBlock,
  TextBlock,
  adaptiveCard,
} from '../../cards';
import { MainDialog } from '../../dialogs/mainDialog';
import i18n from '../../dialogs/locales/i18nConfig';
import assert from 'assert';
import chai from 'chai';
import * as tsSinon from 'ts-sinon';
import {
  UnblockBotDialog,
  UNBLOCK_BOT_DIALOG,
} from '../../dialogs/unblockDialogs/unblockBotDialog';

chai.use(require('sinon-chai'));
import { expect } from 'chai';
import { ConfirmLookIntoStep } from '../../dialogs/unblockDialogs/unblockLookup';
import {
  CONFIRM_DIRECT_DEPOSIT_STEP,
  UnblockDirectDepositStep,
} from '../../dialogs/unblockDialogs/unblockDirectDeposit';

/**
 * An waterfall dialog derived from MainDialog for testing
 */
const assertActivityHasCard = (activity) => {
  assert.strictEqual(
    activity.attachments[0].contentType,
    'application/vnd.microsoft.card.adaptive',
  );
};
describe('Unblock Direct Deposit Step', () => {
  describe('Should show the Direct Deposit welcome messages', () => {
    const testCases = require('../testData/UnblockDirectDepositTestData');
    testCases.map((testData) => {
      it('should display an adaptive card', async () => {
        const sut = new UnblockDirectDepositStep();
        const client = new DialogTestClient('test', sut, testData.initialData, [
          new DialogTestLogger(console),
        ]);

        const updatedActivity: Partial<Activity> = {
          text: testData.steps[0][0],
          locale: 'en',
        };
        const expectedDDMsg = i18n.__('unblock_direct_deposit_msg');
        const replyFirst = await client.sendActivity(updatedActivity);
        assert.strictEqual(replyFirst.attachments.length, 1);
        assert.strictEqual(
          replyFirst.attachments[0].contentType,
          'application/vnd.microsoft.card.adaptive',
        );
        assert.strictEqual(
          replyFirst.attachments[0].content.body[0].text,
          expectedDDMsg,
        );
        const expectedTransitMsg = i18n.__(
          'unblock_direct_deposit_transit_name',
        );
        const expectedAccountMsg = i18n.__(
          'unblock_direct_deposit_account_name',
        );
        const expectedInstitutionMsg = i18n.__(
          'unblock_direct_deposit_institution_name',
        );
        assert.strictEqual(
          replyFirst.attachments[0].content.body[1].type,
          'FactSet',
        );
        assert.strictEqual(
          replyFirst.attachments[0].content.body[1].facts[0].value,
          expectedTransitMsg,
        );
        assert.strictEqual(
          replyFirst.attachments[0].content.body[1].facts[1].value,
          expectedInstitutionMsg,
        );
        assert.strictEqual(
          replyFirst.attachments[0].content.body[1].facts[2].value,
          expectedAccountMsg,
        );

        const replySec = await client.getNextReply();
        const expectedChequeMsg = i18n.__(
          'unblock_direct_deposit_how_to_cheques',
        );
        const expectedBankMsg = i18n.__('unblock_direct_deposit_how_to_bank');
        const expectedAltImgMsg = i18n.__(
          'unblock_direct_deposit_cheque_altText',
        );
        assert.strictEqual(replySec.attachments.length, 1);
        assert.strictEqual(
          replySec.attachments[0].contentType,
          'application/vnd.microsoft.card.adaptive',
        );
        assert.strictEqual(
          replySec.attachments[0].content.body[0].type,
          'TextBlock',
        );
        assert.strictEqual(
          replySec.attachments[0].content.body[2].type,
          'Image',
        );
        assert.strictEqual(
          replySec.attachments[0].content.body[0].text,
          expectedChequeMsg,
        );
        assert.strictEqual(
          replySec.attachments[0].content.body[1].text,
          expectedBankMsg,
        );
        assert.strictEqual(
          replySec.attachments[0].content.body[2].altText,
          expectedAltImgMsg,
        );
      });

      it('Should ask for their transit number', async () => {
        const sut = new UnblockDirectDepositStep();
        const client = new DialogTestClient('test', sut, testData.initialData, [
          new DialogTestLogger(console),
        ]);
        const expectedTransitMsg = i18n.__('unblock_direct_deposit_transit');
        const updatedActivity: Partial<Activity> = {
          text: testData.steps[0][0],
          locale: 'en',
        };
         await client.sendActivity(updatedActivity);

        await client.getNextReply();
        const replyThird = await client.getNextReply();


        assert.strictEqual(replyThird.text, expectedTransitMsg);
      });

      it('Should ask for their institution number', async () => {
        const sut = new UnblockDirectDepositStep();
        const client = new DialogTestClient('test', sut, testData.initialData, [
          new DialogTestLogger(console),
        ]);

        const updatedActivity: Partial<Activity> = {
          text: '12345',
          locale: 'en',
        };
        await client.sendActivity(updatedActivity);
        const expectedInstitutionMsg = i18n.__(
          'unblock_direct_deposit_institute',
        );
        await client.getNextReply();
         await client.getNextReply();
        const reply = await client.sendActivity(updatedActivity);
        assert.strictEqual(reply.text, expectedInstitutionMsg);
      });

      it('Should ask for their bank account number', async () => {
        const sut = new UnblockDirectDepositStep();
        const client = new DialogTestClient('test', sut, testData.initialData, [
          new DialogTestLogger(console),
        ]);

        const updatedActivity: Partial<Activity> = {
          text: '',
          locale: 'en',
        };
        await client.sendActivity(updatedActivity);
        const expectedAccountMsg = i18n.__('unblock_direct_deposit_account');
        await client.getNextReply();
        await client.getNextReply();
        const updatedAct2: Partial<Activity> = {
          text: '12345',
          locale: 'en',
        };
        await client.sendActivity(updatedAct2);
        const updatedAct3: Partial<Activity> = {
          text: '123',
          locale: 'en',
        };
        // TODO not sure why here need to send twice activity to bot will get the bank account msg
        await client.sendActivity(updatedAct3);

        const reply = await client.sendActivity(updatedAct3);

        assert.strictEqual(reply.text, expectedAccountMsg);
      });
      it('Should fail gracefully after 3 errors', async () => {
        const sut = new UnblockDirectDepositStep();
        const client = new DialogTestClient('test', sut, testData.initialData, [
          new DialogTestLogger(console),
        ]);

        const steps = [
          [null, i18n.__('unblock_direct_deposit_transit')],
          [i18n.__('unblock_direct_deposit_transit_retry'), `hhh`],
          ['hhh!', ''],
        ];
        const activity: Partial<Activity> = {
          text: testData.steps[0][0],
          locale: 'en',
        };
        await client.sendActivity(activity);

        await client.getNextReply();
        const reply = await client.getNextReply();
        console.log('test22333', reply)
        for (const step of steps) {
          const updatedActivity: Partial<Activity> = {
            text: step[0],
            locale: 'en',
          };

          const reply = await client.sendActivity(updatedActivity);

          assert.strictEqual(
            reply ? reply.text : null,
            step[1],
            `${reply ? reply.text : null} != ${step[1]}`,
          );
        }
      });
    });
  });
});
