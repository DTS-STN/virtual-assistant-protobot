import {
  Activity,
  CardFactory,
  ConversationState,
  MemoryStorage,
  MessageFactory,
  TestAdapter
} from 'botbuilder';
import {
  ChoicePrompt,
  ComponentDialog,
  DialogSet,
  DialogTurnStatus,
  ListStyle,
  TextPrompt,
  WaterfallDialog,
  WaterfallStepContext
} from 'botbuilder-dialogs';
import { DialogTestClient, DialogTestLogger } from 'botbuilder-testing';
import {
  whatNumbersToFindSchema,
  howToFindNumbersSchema,
  TwoTextBlock,
  TextBlock,
  adaptiveCard
} from '../../../cards';
import { MainDialog } from '../../../dialogs/mainDialog';
import i18n from '../../../dialogs/locales/i18nConfig';
import assert from 'assert';
import chai from 'chai';
import * as tsSinon from 'ts-sinon';
import {
  UnblockBotDialog,
  UNBLOCK_BOT_DIALOG
} from '../../../dialogs/unblockDialogs/unblockBotDialog';

chai.use(require('sinon-chai'));
import { expect } from 'chai';
import { ConfirmLookIntoStep } from '../../../dialogs/unblockDialogs/unblockLookup';
import {
  CONFIRM_DIRECT_DEPOSIT_STEP,
  UnblockDirectDepositStep
} from '../../../dialogs/unblockDialogs/unblockDirectDeposit';
import { UnblockDirectDepositMasterErrorStep } from '../../../dialogs/unblockDialogs/unblockDirectDepositMasterErrorStep';
import { UnblockRecognizer } from '../../../dialogs/unblockDialogs/unblockRecognizer';

/**
 * An waterfall dialog derived from MainDialog for testing
 */
const assertActivityHasCard = (activity) => {
  assert.strictEqual(
    activity.attachments[0].contentType,
    'application/vnd.microsoft.card.adaptive'
  );
};


describe('Direct Deposit Happy Path', () => {

  const testCases = require('../../testData/unblockTestData/UnblockDirectDepositTestData');
  testCases.map((testData) => {
    it('should display an adaptive card', async () => {

      const sut = new UnblockDirectDepositStep();
      const client = new DialogTestClient('test', sut, testData.initialData, [
        new DialogTestLogger(console)
      ]);

      const updatedActivity: Partial<Activity> = {
        text: 'testData',
        locale: 'en'
      };
      const expectedDDMsg = i18n.__('unblock_direct_deposit_msg');
      const replyFirst = await client.sendActivity(updatedActivity);
      assert.strictEqual(replyFirst.attachments.length, 1);
      assert.strictEqual(
        replyFirst.attachments[0].contentType,
        'application/vnd.microsoft.card.adaptive'
      );
      assert.strictEqual(
        replyFirst.attachments[0].content.body[0].text,
        expectedDDMsg
      );
      const expectedTransitMsg = i18n.__(
        'unblock_direct_deposit_transit_name'
      );
      const expectedAccountMsg = i18n.__(
        'unblock_direct_deposit_account_name'
      );
      const expectedInstitutionMsg = i18n.__(
        'unblock_direct_deposit_institution_name'
      );
      assert.strictEqual(
        replyFirst.attachments[0].content.body[1].type,
        'FactSet'
      );
      assert.strictEqual(
        replyFirst.attachments[0].content.body[1].facts[0].value,
        expectedTransitMsg
      );
      assert.strictEqual(
        replyFirst.attachments[0].content.body[1].facts[1].value,
        expectedInstitutionMsg
      );
      assert.strictEqual(
        replyFirst.attachments[0].content.body[1].facts[2].value,
        expectedAccountMsg
      );

      const replySec = await client.getNextReply();
      const expectedChequeMsg = i18n.__(
        'unblock_direct_deposit_how_to_cheques'
      );
      const expectedBankMsg = i18n.__('unblock_direct_deposit_how_to_bank');
      const expectedAltImgMsg = i18n.__(
        'unblock_direct_deposit_cheque_altText'
      );
      assert.strictEqual(replySec.attachments.length, 1);
      assert.strictEqual(
        replySec.attachments[0].contentType,
        'application/vnd.microsoft.card.adaptive'
      );
      assert.strictEqual(
        replySec.attachments[0].content.body[0].type,
        'TextBlock'
      );
      assert.strictEqual(
        replySec.attachments[0].content.body[2].type,
        'Image'
      );
      assert.strictEqual(
        replySec.attachments[0].content.body[0].text,
        expectedChequeMsg
      );
      assert.strictEqual(
        replySec.attachments[0].content.body[1].text,
        expectedBankMsg
      );
      assert.strictEqual(
        replySec.attachments[0].content.body[2].altText,
        expectedAltImgMsg
      );
    });
    it('Should show the final msg if the user input all three part correctly ', async () => {
      const sut = new UnblockDirectDepositStep();

      const client = new DialogTestClient('test', sut, testData.initialData, [
        new DialogTestLogger(console)
      ]);
      sut.addDialog(new UnblockDirectDepositMasterErrorStep());
      let updatedActivity: Partial<Activity> = {
        text: '',
        locale: 'en'
      };
      await client.sendActivity(updatedActivity);

       await client.getNextReply();
       await client.getNextReply();

       updatedActivity = {
        text: '12345',
        locale: 'en'
      };
      await client.sendActivity(updatedActivity);

      updatedActivity = {
        text: '123',
        locale: 'en'
      };
      await client.sendActivity(updatedActivity);

      updatedActivity = {
        text: '1234567',
        locale: 'en'
      };
      const reply = await client.sendActivity(updatedActivity);


   const expectedBankValidMsg = i18n.__('unblock_direct_deposit_valid_msg');
   const expectedValidTipMsg = i18n.__('unblock_direct_deposit_valid_tip');
      assert.strictEqual(
        reply.attachments[0].contentType,
        'application/vnd.microsoft.card.adaptive'
      );
      assert.strictEqual(
        reply.attachments[0].content.body[0].text,
        expectedBankValidMsg
      );
      assert.strictEqual(
        reply.attachments[0].content.body[1].text,
        expectedValidTipMsg
      );

        const continueReply = await client.getNextReply();
        const expectedReminderMsg = i18n.__('unblock_direct_deposit_valid_reminder');
        assert.strictEqual(
          continueReply.attachments[0].contentType,
          'application/vnd.microsoft.card.adaptive'
        );
        assert.strictEqual(
          continueReply.attachments[0].content.body[0].text,
          expectedReminderMsg
        );
        const finalReply = await client.getNextReply();
        const expectedCompleteMsg = i18n.__('unblock_direct_deposit_complete');
        assert.strictEqual(
          finalReply.attachments[0].contentType,
          'application/vnd.microsoft.card.adaptive'
        );
        assert.strictEqual(
          finalReply.attachments[0].content.body[0].text,
          expectedCompleteMsg
        );
    });
    it('Should ask for their transit number', async () => {
      const sut = new UnblockDirectDepositStep();
      const client = new DialogTestClient('test', sut, testData.initialData, [
        new DialogTestLogger(console)
      ]);
      const expectedTransitMsg = i18n.__('unblock_direct_deposit_transit');
      const updatedActivity: Partial<Activity> = {
        text: '',
        locale: 'en'
      };
      await client.sendActivity(updatedActivity);

      await client.getNextReply();
      const reply = await client.getNextReply();

      assert.strictEqual(reply.text, expectedTransitMsg);
    });

    it('Should ask for their institution number', async () => {
      const sut = new UnblockDirectDepositStep();

      const client = new DialogTestClient('test', sut, testData.initialData, [
        new DialogTestLogger(console)
      ]);

      const updatedActivity: Partial<Activity> = {
        text: '12345',
        locale: 'en'
      };
      await client.sendActivity(updatedActivity);
      const expectedInstitutionMsg = i18n.__(
        'unblock_direct_deposit_institute'
      );
      await client.getNextReply();
      await client.getNextReply();
      const reply = await client.sendActivity(updatedActivity);
      assert.strictEqual(reply.text, expectedInstitutionMsg);
    });

    it('Should ask for their bank account number', async () => {
      const sut = new UnblockDirectDepositStep();

      const client = new DialogTestClient('test', sut, testData.initialData, [
        new DialogTestLogger(console)
      ]);

      let updatedActivity: Partial<Activity> = {
        text: '',
        locale: 'en'
      };
      await client.sendActivity(updatedActivity);

      const expectedAccountMsg = i18n.__('unblock_direct_deposit_account');
      await client.getNextReply();
      await client.getNextReply();
      updatedActivity = {
        text: '12345',
        locale: 'en'
      };
      await client.sendActivity(updatedActivity);

      updatedActivity = {
        text: '123',
        locale: 'en'
      };
      // TODO not sure why here need to send twice activity to bot will get the bank account msg
      await client.sendActivity(updatedActivity);

      const reply = await client.sendActivity(updatedActivity);

      assert.strictEqual(reply.text, expectedAccountMsg);
      updatedActivity = {
        text: '1234567',
        locale: 'en'
      };

      await client.sendActivity(updatedActivity);

    });


  });
});
describe('Unblock Direct Deposit Step Error', () => {
  afterEach(() => {
    tsSinon.default.restore();

  });
  const testCases = require('../../testData/unblockTestData/UnblockDirectDepositTestData');
  testCases.map((testData) => {
   it('Should go to direct deposit master error step after 3 gibberish input', async () => {

    const sut = new UnblockDirectDepositStep();
    const client = new DialogTestClient('test', sut, testData.initialData, [
      new DialogTestLogger(console)
    ]);
    sut.addDialog(new UnblockDirectDepositMasterErrorStep());
    const expectedTransitMsg = i18n.__('unblock_direct_deposit_transit');
    let updatedActivity: Partial<Activity> = {
      text: 'ok',
      locale: 'en'
    };

    tsSinon.default
    .stub(UnblockRecognizer.prototype, 'executeLuisQuery')
    .callsFake(() =>
      JSON.parse(
        `{"intents": {"promptConfirmYes": {"score": 1}}, "entities": {"$instance": {}}}`
      )
    );
    await client.sendActivity(updatedActivity);

    await client.getNextReply();
    const replyThird = await client.getNextReply();

    assert.strictEqual(replyThird.text, expectedTransitMsg);

    const steps = [
      ['hahaha',i18n.__('unblock_direct_deposit_transit_retry')],
      [ 'dddddddd', i18n.__('unblock_direct_deposit_transit_retry')],
      [ `hhh`, i18n.__('directDepositMasterErrorMsg')]
    ];

    updatedActivity = {
        text: steps[0][0],
        locale: 'en'
      };

      const reply = await client.sendActivity(updatedActivity);
      assert.strictEqual(
        reply ? reply.attachments[0].content.body[0].text : null,
        steps[0][1],
        `${reply ?reply.attachments[0].content.body[0].text  : null} != ${steps[0][1]}`
      );
      let replyMsg = client.getNextReply();
      assert.strictEqual(replyMsg.text, expectedTransitMsg);
      updatedActivity= {
        text: steps[1][0],
        locale: 'en'
      };
     const replySecond =  await client.sendActivity(updatedActivity);

      assert.strictEqual(
        replySecond ? replySecond.attachments[0].content.body[0].text : null,
        steps[0][1],
        `${replySecond ?replySecond.attachments[0].content.body[0].text  : null} != ${steps[0][1]}`
      );
      replyMsg = client.getNextReply();
      assert.strictEqual(replyMsg.text, expectedTransitMsg);
      updatedActivity= {
        text: steps[2][0],
        locale: 'en'
      };
      const replyLast = await client.sendActivity(updatedActivity);
      assert.strictEqual(
        replyLast ? replyLast.text : null,
        steps[2][1] + ` (1) setup a call or (2) nothing to do`,
        `${replyLast ?replyLast.text  : null} != ${steps[2][1]}`
      );


  });
  it('Should prompt retry msg after user input wrong format of bank account number', async () => {
    const sut = new UnblockDirectDepositStep();

    const client = new DialogTestClient('testAccount', sut, testData.initialData, [
      new DialogTestLogger(console)
    ]);
    sut.addDialog(new UnblockDirectDepositMasterErrorStep());
    let updatedActivity: Partial<Activity> = {
      text: '',
      locale: 'en'
    };

    await client.sendActivity(updatedActivity);
    const expectedAccountMsg = i18n.__('unblock_direct_deposit_account');
    await client.getNextReply();
    await client.getNextReply();


    updatedActivity = {
      text: '12345',
      locale: 'en'
    };
     await client.sendActivity(updatedActivity);

     updatedActivity = {
      text: '123',
      locale: 'en'
    };
      await client.sendActivity(updatedActivity);
    updatedActivity = {
      text: '12334444444444',
      locale: 'en'
    };
    const reply = await client.sendActivity(updatedActivity);
    const expectedAccountRetryMsg = i18n.__('unblock_direct_deposit_account_retry');
    assert.strictEqual(
      reply ? reply.attachments[0].content.body[0].text : null,
      expectedAccountRetryMsg,
      `${reply ?reply.attachments[0].content.body[0].text  : null} != ${expectedAccountRetryMsg}`
    );
    assert.strictEqual(
      reply.attachments[0].contentType,
      'application/vnd.microsoft.card.adaptive'
    );
    const nextReply = await client.getNextReply();
    assert.strictEqual(nextReply.text, expectedAccountMsg);

    updatedActivity = {
      text: '1234567',
      locale: 'en'
    };
     await client.sendActivity(updatedActivity);
  });
  it('Should prompt retry msg after user input wrong format of transit number', async () => {

    const sut = new UnblockDirectDepositStep();
    const client = new DialogTestClient('testTransit', sut, testData.initialData, [
      new DialogTestLogger(console)
    ]);

    let updatedActivity: Partial<Activity> = {
      text: '',
      locale: 'en'
    };

    await client.sendActivity(updatedActivity);
    const expectedTransitMsg = i18n.__('unblock_direct_deposit_transit');
    await client.getNextReply();
    await client.getNextReply();

    updatedActivity = {
      text: '1234333888',
      locale: 'en'
    };
   const retryReply = await client.sendActivity(updatedActivity);
   const expectedTransitRetryMsg = i18n.__('unblock_direct_deposit_transit_retry');

   assert.strictEqual(
    retryReply ? retryReply.attachments[0].content.body[0].text : null,
    expectedTransitRetryMsg,
    `${retryReply ?retryReply.attachments[0].content.body[0].text  : null} != ${expectedTransitRetryMsg}`
  );

    const reply = await client.getNextReply();

    assert.strictEqual(reply.text, expectedTransitMsg);
  });
  it('Should prompt retry msg after user input wrong format of financial institution number', async () => {
    const sut = new UnblockDirectDepositStep();

    const client = new DialogTestClient('testInstitution', sut, testData.initialData, [
      new DialogTestLogger(console)
    ]);
    sut.addDialog(new UnblockDirectDepositMasterErrorStep());
    let updatedActivity: Partial<Activity> = {
      text: '',
      locale: 'en'
    };

    await client.sendActivity(updatedActivity);
    const expectedInstituteMsg = i18n.__('unblock_direct_deposit_institute');
    await client.getNextReply();
     await client.getNextReply();


    updatedActivity = {
      text: '12345',
      locale: 'en'
    };
      await client.sendActivity(updatedActivity);
    updatedActivity = {
      text: '12345',
      locale: 'en'
    };

     const reply  = await client.sendActivity(updatedActivity);
    const expectedInstituteRetryMsg = i18n.__('unblock_direct_deposit_institute_retry');
    assert.strictEqual(
      reply ? reply.attachments[0].content.body[0].text : null,
      expectedInstituteRetryMsg,
      `${reply ?reply.attachments[0].content.body[0].text  : null} != ${expectedInstituteRetryMsg}`
    );

    const replyNext = await client.getNextReply();

    assert.strictEqual(replyNext.text, expectedInstituteMsg);
  });
});
});
