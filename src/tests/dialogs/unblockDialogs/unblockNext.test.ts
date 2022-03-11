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
import { UnblockNextOptionStep } from '../../../dialogs/unblockDialogs/unblockNext';
import { AlwaysOnBotDialog } from '../../../dialogs/alwaysOnDialogs/alwaysOnBotDialog';

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

    describe('Unblock Next Option Step', () => {
      afterEach(() => {
        tsSinon.default.restore();
      });
      const testCases = require('../../testData/unblockTestData/unblockNextTestData');
      testCases.map((testData) => {
        it('Should show initial messages when enter this step', async () => {
          const sut = new UnblockNextOptionStep();
         // sut.addDialog( new AlwaysOnBotDialog());
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
            text: '',
            locale: 'en'
          };
          const expectedInitialMsg = i18n.__('unblockToAlwaysOnBotOrCallbackBotQueryMsg');
          const reply = await client.sendActivity(updatedActivity);
          assert.strictEqual(
            reply.text,
            expectedInitialMsg  + ` (1) Yes or (2) No`
          );
        });

        it('Should go to end of flow if user choose no', async () => {
          const sut = new UnblockNextOptionStep();
          sut.addDialog( new AlwaysOnBotDialog());
          sut.addDialog( new MainDialog());
          const client = new DialogTestClient('test', sut, testData.initialData, [
            new DialogTestLogger(console)
          ]);
          const expectedMsg = i18n.__('mainDialogFeedbackMsg');
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

          const reply = await client.sendActivity(updatedActivity);


       assert.strictEqual(
          client.dialogTurnResult.result.nextOptionStep,
          false
        );
        assert.strictEqual(
            reply,
           undefined
          );
        });


        it('Should go to always on bot if user choose yes  option', async () => {
            const sut = new UnblockNextOptionStep();
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
                `{"intents": {"promptConfirmYes": {"score": 1}}, "entities": {"$instance": {}}}`
              )
            );
          await client.sendActivity(updatedActivity);

          const reply = await client.sendActivity(updatedActivity);

          const expectedManualMsg = i18n.__('AlwaysOnBotPromptMessage');

          assert.strictEqual(
            reply.text,
            expectedManualMsg
          );
          assert.strictEqual(
            reply.suggestedActions.actions[0].title,
            'I want to update my personal information'
          );
          assert.strictEqual(
            reply.suggestedActions.actions[1].title,
            'I have a question about my Old Age Security pension'

          );

        });


        it('Should provide retry msg when user input something that bot does not understand', async () => {
            const sut = new UnblockNextOptionStep();
            sut.addDialog( new AlwaysOnBotDialog());
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
          let updatedActivity: Partial<Activity> = {
            text: '',
            locale: 'en'
          };
          await client.sendActivity(updatedActivity);
          const expectedRetryMsg = i18n.__('unblockToAlwaysOnBotOrCallbackBotQueryRetryMsg');
          await client.getNextReply();
          await client.getNextReply();
          updatedActivity = {
            text: '12345',
            locale: 'en'
          };
         const replyOne =  await client.sendActivity(updatedActivity);


          assert.strictEqual(
            replyOne.text,
            expectedRetryMsg + ` (1) Yes or (2) No`
          );
        });

        it('Should fail gracefully after 2 gibberish input', async () => {
            const sut = new UnblockNextOptionStep();
            sut.addDialog( new AlwaysOnBotDialog());
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
              i18n.__('unblockToAlwaysOnBotOrCallbackBotQueryRetryMsg') +
                ` (1) Yes or (2) No`
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
