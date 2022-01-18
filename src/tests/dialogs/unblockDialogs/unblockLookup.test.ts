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
  } from '../../../cards';
  import { MainDialog } from '../../../dialogs/mainDialog';
  import i18n from '../../../dialogs/locales/i18nConfig';
  import assert from 'assert';
  import chai from 'chai';
  import * as tsSinon from 'ts-sinon';
  import {
    UnblockBotDialog,
    UNBLOCK_BOT_DIALOG,
  } from '../../../dialogs/unblockDialogs/unblockBotDialog';

  chai.use(require('sinon-chai'));
  import { expect } from 'chai';
  import { ConfirmLookIntoStep } from '../../../dialogs/unblockDialogs/unblockLookup';
  import {
    CONFIRM_DIRECT_DEPOSIT_STEP,
    UnblockDirectDepositStep,
  } from '../../../dialogs/unblockDialogs/unblockDirectDeposit';
import { UnblockRecognizer } from '../../../dialogs/unblockDialogs/unblockRecognizer';

  /**
   * The lookup step more or less the same as bot
   * there are some duplicates for testing
   */
  const assertActivityHasCard = (activity) => {
    assert.strictEqual(
      activity.attachments[0].contentType,
      'application/vnd.microsoft.card.adaptive',
    );
  };
  describe('Unblock LookUp Step', () => {
    describe('Should show Lookup messages', () => {

      afterEach(() => {
        tsSinon.default.restore();
      });
      const testCases = require('../testData/UnblockDirectDepositTestData');
      testCases.map((testData) => {
        it('should display an adaptive card', async () => {
          const sut = new ConfirmLookIntoStep();
          const client = new DialogTestClient('test', sut, testData.initialData, [
            new DialogTestLogger(console),
          ]);


          const updatedActivity: Partial<Activity> = {
            text: testData.steps[0][0],
            locale: 'en',
          };
          const expectedLookupMsg = i18n.__('unblock_lookup_update_msg');
          const replyFirst = await client.sendActivity(updatedActivity);

          assert.strictEqual(replyFirst.attachments.length, 1);
          assert.strictEqual(
            replyFirst.attachments[0].contentType,
            'application/vnd.microsoft.card.adaptive',
          );
          assert.strictEqual(
            replyFirst.attachments[0].content.body[0].text,
            expectedLookupMsg,
          );
          const replySecond = await client.getNextReply();
          const expectedLookUpUpdateMsg = i18n.__(
            'unblock_lookup_update_reason',
          );
          const expectedLookUpQueryMsg = i18n.__(
            'unblock_lookup_update_prompt_msg',
          );

          assert.strictEqual(
            replySecond.attachments[0].content.body[0].type,
            'TextBlock',
          );
          assert.strictEqual(
            replySecond.attachments[0].content.body[0].text,
            expectedLookUpUpdateMsg,
          );
          const replyThird = await client.getNextReply();

          assert.strictEqual(
            replyThird.text,
            expectedLookUpQueryMsg+` (1) Yes, I do or (2) No, I don't`,
          );
        });

        it('Should go to direct deposit if user say they do have a canadian bank account', async () => {
          const sut = new ConfirmLookIntoStep();
          const client = new DialogTestClient('test', sut, testData.initialData, [
            new DialogTestLogger(console),
          ]);
          sut.addDialog(new UnblockDirectDepositStep());

          const expectedDDMsg = i18n.__('unblock_direct_deposit_msg');
          const updatedActivity: Partial<Activity> = {
            text: 'yes I do',
            locale: 'en',
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
          await client.getNextReply();
          const replyThird = await client.sendActivity(updatedActivity);

          assert.strictEqual(
            replyThird.attachments[0].contentType,
            'application/vnd.microsoft.card.adaptive',
          );
          assert.strictEqual(
            replyThird.attachments[0].content.body[0].text,
            expectedDDMsg,
          );


        });
        it('Should display warning if user say they do not have a canadian bank account', async () => {
          const sut = new ConfirmLookIntoStep();
          const client = new DialogTestClient('test', sut, testData.initialData, [
            new DialogTestLogger(console),
          ]);


          const expectedMsg = i18n.__('unblock_lookup_prompt_confirm_msg');
          const updatedActivity: Partial<Activity> = {
            text: 'No',
            locale: 'en',
          };

          tsSinon.default
          .stub(UnblockRecognizer.prototype, 'executeLuisQuery')
          .callsFake(() =>
            JSON.parse(
              `{"intents": {"promptConfirmNo": {"score": 1}}, "entities": {"$instance": {}}}`
            )
          );
           await client.sendActivity(updatedActivity);
          await client.getNextReply();
          await client.getNextReply();
          const reply = await client.sendActivity(updatedActivity);

          assert.strictEqual(reply.text,
            expectedMsg + ` (1) Yes or (2) No`,
          );

        });

        it('Should display OAS button if user say they want to apply OAS by themselves ', async () => {
          const sut = new ConfirmLookIntoStep();
          const client = new DialogTestClient('test', sut, testData.initialData, [
            new DialogTestLogger(console),
          ]);


          const expectedMsg = i18n.__('unblock_lookup_prompt_confirm_msg');
          const updatedActivity: Partial<Activity> = {
            text: 'No',
            locale: 'en',
          };

          tsSinon.default
          .stub(UnblockRecognizer.prototype, 'executeLuisQuery')
          .callsFake(() =>
            JSON.parse(
              `{"intents": {"promptConfirmNo": {"score": 1}}, "entities": {"$instance": {}}}`
            )
          );
           await client.sendActivity(updatedActivity);
          await client.getNextReply();
          await client.getNextReply();
          const reply = await client.sendActivity(updatedActivity);

          assert.strictEqual(reply.text,
            expectedMsg + ` (1) Yes or (2) No`,
          );
          tsSinon.default.restore();
          tsSinon.default
          .stub(UnblockRecognizer.prototype, 'executeLuisQuery')
          .callsFake(() =>
            JSON.parse(
              `{"intents": {"promptConfirmYes": {"score": 1}}, "entities": {"$instance": {}}}`
            )
          );
          const confirmActivity: Partial<Activity> = {
            text: 'Yes',
            locale: 'en',
          };
          const lastReply = await client.sendActivity(updatedActivity);
          const expectedManualMsg =i18n.__('unblock_lookup_decline_final_text');

          assert.strictEqual(
            lastReply.attachments[0].contentType,
            'application/vnd.microsoft.card.adaptive',
          );
          assert.strictEqual(
            lastReply.attachments[0].contentType,
            'application/vnd.microsoft.card.adaptive',
          );
          assert.strictEqual(
            lastReply.attachments[0].content.body[0].text,
            expectedManualMsg,
          );
          assert.strictEqual(
            lastReply.attachments[0].content.actions[0].type,
            'Action.OpenUrl',
          );
          assert.strictEqual(
            lastReply.attachments[0].content.actions[0].title,
            'Apply for Old Age Security pension',
          );
          assert.strictEqual(
            lastReply.attachments[0].content.actions[0].url,
            'https://canada.ca',
          );
        });
        it('Should go DD step if user say they do not want to apply OAS by themselves ', async () => {
          const sut = new ConfirmLookIntoStep();
          const client = new DialogTestClient('test', sut, testData.initialData, [
            new DialogTestLogger(console),
          ]);
          sut.addDialog(new UnblockDirectDepositStep());
          const expectedDDMsg = i18n.__('unblock_direct_deposit_msg');
          const expectedMsg = i18n.__('unblock_lookup_prompt_confirm_msg');
          const updatedActivity: Partial<Activity> = {
            text: 'No',
            locale: 'en',
          };

          tsSinon.default
          .stub(UnblockRecognizer.prototype, 'executeLuisQuery')
          .callsFake(() =>
            JSON.parse(
              `{"intents": {"promptConfirmNo": {"score": 1}}, "entities": {"$instance": {}}}`
            )
          );
           await client.sendActivity(updatedActivity);
          await client.getNextReply();
          await client.getNextReply();
          const reply = await client.sendActivity(updatedActivity);

          assert.strictEqual(reply.text,
            expectedMsg + ` (1) Yes or (2) No`,
          );
          const lastReply = await client.sendActivity(updatedActivity);
          assert.strictEqual(
            lastReply.attachments[0].contentType,
            'application/vnd.microsoft.card.adaptive',
          );
          assert.strictEqual(
            lastReply.attachments[0].content.body[0].text,
            expectedDDMsg,
          );


        });

        it('Should provide retry msg when user input something that bot does not understand in User does not have canadian account scenario ', async () => {
          const sut = new ConfirmLookIntoStep();
          const client = new DialogTestClient('test', sut, testData.initialData, [
            new DialogTestLogger(console),
          ]);
          tsSinon.default
          .stub(UnblockRecognizer.prototype, 'executeLuisQuery')
          .callsFake(() =>
            JSON.parse(
              `{"intents": {"promptConfirmNo": {"score": 1}}, "entities": {"$instance": {}}}`
            )
          );
          const updatedActivity: Partial<Activity> = {
            text: '',
            locale: 'en',
          };
          await client.sendActivity(updatedActivity);
          const expectedRetryMsg = i18n.__('confirmLookIntoStepRetryMsg');
          await client.getNextReply();
          await client.getNextReply();
          const updatedAct2: Partial<Activity> = {
            text: '12345',
            locale: 'en',
          };
          await client.sendActivity(updatedAct2);
          const updatedAct3: Partial<Activity> = {
            text: 'ssssss',
            locale: 'en',
          };

          const reply = await client.sendActivity(updatedAct3);

          assert.strictEqual(reply.text, expectedRetryMsg+ ` (1) Yes, I do or (2) No, I don't`);
        });
        it('Should provide retry msg when user input something that bot does not understand', async () => {
          const sut = new ConfirmLookIntoStep();
          const client = new DialogTestClient('test', sut, testData.initialData, [
            new DialogTestLogger(console),
          ]);
          tsSinon.default
          .stub(UnblockRecognizer.prototype, 'executeLuisQuery')
          .callsFake(() =>
            JSON.parse(
              `{"intents": {"None": {"score": 1}}, "entities": {"$instance": {}}}`
            )
          );
          const updatedActivity: Partial<Activity> = {
            text: '',
            locale: 'en',
          };
          await client.sendActivity(updatedActivity);
          const expectedRetryMsg = i18n.__('confirmLookIntoStepRetryMsg');
          await client.getNextReply();
          await client.getNextReply();
          const updatedAct2: Partial<Activity> = {
            text: '12345',
            locale: 'en',
          };
          await client.sendActivity(updatedAct2);
          const updatedAct3: Partial<Activity> = {
            text: 'ssssss',
            locale: 'en',
          };

          const reply = await client.sendActivity(updatedAct3);

          assert.strictEqual(reply.text, expectedRetryMsg+ ` (1) Yes, I do or (2) No, I don't`);
        });

        it('Should fail gracefully after 3 errors', async () => {
          const sut = new ConfirmLookIntoStep();
          const client = new DialogTestClient('test', sut, testData.initialData, [
            new DialogTestLogger(console),
          ]);
          tsSinon.default
          .stub(UnblockRecognizer.prototype, 'executeLuisQuery')
          .callsFake(() =>
            JSON.parse(
              `{"intents": {"None": {"score": 1}}, "entities": {"$instance": {}}}`
            )
          );

          const activity: Partial<Activity> = {
            text: testData.steps[0][0],
            locale: 'en',
          };
          await client.sendActivity(activity);

          await client.getNextReply();
          const steps = [
            ['hahahaha', i18n.__('unblock_lookup_update_prompt_msg')+ ` (1) Yes, I do or (2) No, I don't`],
            ['nttttll', i18n.__('confirmLookIntoStepRetryMsg')+ ` (1) Yes, I do or (2) No, I don't`],
            [`hhh`, i18n.__('confirmLookIntoStepRetryMsg')+ ` (1) Yes, I do or (2) No, I don't` ],
            ['thirdError!', i18n.__('unblockBotDialogMasterErrorMsg')],
          ];

          for (const step of steps) {

            const updatedActivity: Partial<Activity> = {
              text: step[0],
              locale: 'en',
            };

            const reply = await client.sendActivity(updatedActivity);
            console.log('test 1111', reply)
            if(step[0] !== 'thirdError!') {
              assert.strictEqual(
                reply ? reply.text : null,
                step[1],
                `${reply ? reply.text : null} != ${step[1]}`,
              );
            } else{
              assert.strictEqual(
                reply.attachments[0].content.body[0].type,
                'TextBlock',
              );
              assert.strictEqual(
                reply.attachments[0].content.body[0].text,
                step[1],
              );
              assert.strictEqual(reply.attachments.length, 1);
              assert.strictEqual(
                reply.attachments[0].contentType,
                'application/vnd.microsoft.card.adaptive',
              );
            }

          }
        });
      });
    });
  });
