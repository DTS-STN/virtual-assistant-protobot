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
  import { UnblockRecognizer } from '../../../dialogs/unblockDialogs/unblockRecognizer';
import { UnblockDirectDepositMasterErrorStep } from '../../../dialogs/unblockDialogs/unblockDirectDepositMasterErrorStep';
import { CallbackBotDialog } from '../../../dialogs/callbackDialogs/callbackBotDialog';

  /**
   * The lookup step more or less the same as bot
   * there are some duplicates for testing
   */
  const assertActivityHasCard = (activity) => {
    assert.strictEqual(
      activity.attachments[0].contentType,
      'application/vnd.microsoft.card.adaptive'
    );
  };

    describe('Unblock Direct Deposit Master Error Step', () => {
      afterEach(() => {
        tsSinon.default.restore();
      });
      const testCases = require('../../testData/unblockTestData/unblockDirectDepositMasterErrorStepTestData');
      testCases.map((testData) => {
        it('Should show initial messages when enter this step', async () => {
          const sut = new UnblockDirectDepositMasterErrorStep();
          const client = new DialogTestClient('test', sut, testData.initialData, [
            new DialogTestLogger(console)
          ]);

          tsSinon.default
          .stub(UnblockRecognizer.prototype, 'executeLuisQuery')
          .callsFake(() =>
            JSON.parse(
              `{"intents": {"promptConfirmYes": {"score": 1}}, "entities": {"$instance": {}}}`
            )
          );
          const updatedActivity: Partial<Activity> = {
            text: testData.steps[0][0],
            locale: 'en'
          };
          const expectedInitialMsg = i18n.__('directDepositMasterErrorMsg');
          const reply = await client.sendActivity(updatedActivity);


          assert.strictEqual(
            reply.text,
            expectedInitialMsg  + ` (1) setup a call or (2) nothing to do`
          );
        });

        it('Should go to callback flow if user choose set up a call', async () => {
          const sut = new UnblockDirectDepositMasterErrorStep();
          const client = new DialogTestClient('test', sut, testData.initialData, [
            new DialogTestLogger(console)
          ]);
          sut.addDialog(new UnblockDirectDepositStep());
          sut.addDialog(new  CallbackBotDialog());
          const expectedMsg = i18n.__('botGreatMsg');
          const updatedActivity: Partial<Activity> = {
            text: 'yes I do',
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
          let reply = await client.sendActivity(updatedActivity);


        assert.strictEqual(
          reply.text,
          expectedMsg
        );
      reply =    await client.getNextReply();
      const expectedStandardMsg = i18n.__('callbackBotDialogStepStandardMsg');
          console.log('tesst0000', JSON.stringify(reply))
          assert.strictEqual(
            reply.text,
            expectedStandardMsg + ` (1) Yes please! or (2) No thanks`
          );

        });


        it('Should go to always on bot if user choose nothing for right now option', async () => {
          const sut = new ConfirmLookIntoStep();
          const client = new DialogTestClient('test', sut, testData.initialData, [
            new DialogTestLogger(console)
          ]);

          const updatedActivity: Partial<Activity> = {
            text: 'No',
            locale: 'en'
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

          const expectedManualMsg = i18n.__('unblock_lookup_decline_final_text');

          assert.strictEqual(
            reply.attachments[0].contentType,
            'application/vnd.microsoft.card.adaptive'
          );
          assert.strictEqual(
            reply.attachments[0].contentType,
            'application/vnd.microsoft.card.adaptive'
          );
          assert.strictEqual(
            reply.attachments[0].content.body[0].text,
            expectedManualMsg
          );
          assert.strictEqual(
            reply.attachments[0].content.actions[0].type,
            'Action.OpenUrl'
          );
          assert.strictEqual(
            reply.attachments[0].content.actions[0].title,
            'Apply for Old Age Security pension'
          );
          assert.strictEqual(
            reply.attachments[0].content.actions[0].url,
            'https://canada.ca'
          );
        });


        it('Should provide retry msg when user input something that bot does not understand', async () => {
          const sut = new ConfirmLookIntoStep();
          const client = new DialogTestClient('test', sut, testData.initialData, [
            new DialogTestLogger(console)
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
            locale: 'en'
          };
          await client.sendActivity(updatedActivity);
          const expectedRetryMsg = i18n.__('confirmLookIntoStepRetryMsg');
          await client.getNextReply();
          await client.getNextReply();
          const updatedAct2: Partial<Activity> = {
            text: '12345',
            locale: 'en'
          };
          await client.sendActivity(updatedAct2);
          const updatedAct3: Partial<Activity> = {
            text: 'ssssss',
            locale: 'en'
          };

          const reply = await client.sendActivity(updatedAct3);

          assert.strictEqual(
            reply.text,
            expectedRetryMsg + ` (1) Yes, I do or (2) No, I don't`
          );
        });

        it('Should fail gracefully after 3 gibberish input', async () => {
          const sut = new UnblockDirectDepositMasterErrorStep();
          const client = new DialogTestClient('test', sut, testData.initialData, [
            new DialogTestLogger(console)
          ]);
          tsSinon.default
            .stub(UnblockRecognizer.prototype, 'executeLuisQuery')
            .callsFake(() =>
              JSON.parse(
                `{"intents": {"None": {"score": 1}}, "entities": {"$instance": {}}}`
              )
            );

          let activity: Partial<Activity> = {
            text: testData.steps[0][0],
            locale: 'en'
          };
           await client.sendActivity(activity);

          const steps = [
            [
              'hahahaha',
              i18n.__('directDepositMasterErrorMsg') +
                ` (1) setup a call or (2) nothing to do`
            ],
            [
              'nttttll',
              i18n.__('directDepositMasterErrorMsg') +
                ` (1) setup a call or (2) nothing to do`
            ],
            ['thirdError!', i18n.__('unblockBotDialogMasterErrorMsg')]
          ];

          for (const step of steps) {
            activity = {
              text: step[0],
              locale: 'en'
            };

            const reply = await client.sendActivity(activity);
            if (step[0] !== 'thirdError!') {
              assert.strictEqual(
                reply ? reply.text : null,
                step[1],
                `${reply ? reply.text : null} != ${step[1]}`
              );
            } else {
              assert.strictEqual(
                reply.attachments[0].content.body[0].type,
                'TextBlock'
              );
              assert.strictEqual(
                reply.attachments[0].content.body[0].text,
                step[1]
              );
              assert.strictEqual(reply.attachments.length, 1);
              assert.strictEqual(
                reply.attachments[0].contentType,
                'application/vnd.microsoft.card.adaptive'
              );
            }
          }
        });
      });
    });
