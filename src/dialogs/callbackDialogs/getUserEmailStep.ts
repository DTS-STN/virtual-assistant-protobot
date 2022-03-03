import { LuisRecognizer } from 'botbuilder-ai';
import {
  TextPrompt,
  ComponentDialog,
  WaterfallDialog,
  WaterfallStepContext,
  ChoiceFactory,
  ChoicePrompt,
  ListStyle
} from 'botbuilder-dialogs';

import { CallbackBotDetails } from './callbackBotDetails';
import { CallbackRecognizer } from './callbackRecognizer';
import { GET_PREFERRED_METHOD_OF_CONTACT_STEP } from './getPreferredMethodOfContactStep';
import i18n from '../locales/i18nConfig';
const CHOICE_PROMPT = "CHOICE_PROMPT";
const TEXT_PROMPT = 'TEXT_PROMPT';
export const GET_USER_EMAIL_STEP = 'GET_USER_EMAIL_STEP';
const GET_USER_EMAIL_WATERFALL_STEP = 'GET_USER_EMAIL_WATERFALL_STEP';
import { MAX_ERROR_COUNT}  from '../../utils'
import { CommonPromptValidatorModel } from '../../models/commonPromptValidatorModel';
import { AlwaysOnBotDialog, ALWAYS_ON_BOT_DIALOG } from '../alwaysOnDialogs/alwaysOnBotDialog';

export class GetUserEmailStep extends ComponentDialog {
  constructor() {
    super(GET_USER_EMAIL_STEP);

    // Add a text prompt to the dialog stack
    this.addDialog(new TextPrompt(TEXT_PROMPT));
    this.addDialog(new ChoicePrompt(CHOICE_PROMPT))
    // this.addDialog(new AlwaysOnBotDialog());
    this.addDialog(
      new WaterfallDialog(GET_USER_EMAIL_WATERFALL_STEP, [
        this.initialStep.bind(this),
        this.finalStep.bind(this)
      ])
    );

    this.initialDialogId = GET_USER_EMAIL_WATERFALL_STEP;
  }
  /**
   * Kick off the dialog by asking for an email address
   *
   */
  async initialStep(stepContext: WaterfallStepContext) {
    // Get the user details / state machine
    const callbackBotDetails = stepContext.options as CallbackBotDetails;

    // Set the text for the prompt
    const standardMsg = i18n.__('getUserEmailStepStandardMsg');

    // Set the text for the retry prompt
    const retryMsg = i18n.__('getUserEmailFormatErrorMsg');

    // Check if the error count is greater than the max threshold
    if (callbackBotDetails.errorCount.getUserEmailStep >= MAX_ERROR_COUNT) {
      // Throw the master error flag
      const errorMsg = i18n.__('emailFormatMaxErrorMsg');

      const promptOptions = i18n.__('confirmEmailStepErrorPromptOptions');

      const promptDetails = {
        prompt: ChoiceFactory.forChannel(
          stepContext.context,
          promptOptions,
          errorMsg
        )
      };


      return await stepContext.prompt(CHOICE_PROMPT, {
        prompt: errorMsg,
        choices: ChoiceFactory.toChoices(promptOptions),
        style: ListStyle.suggestedAction
    });

    }
    // Check the user state to see if unblockBotDetails.getAndSendEmailStep is set to null or -1
    // If it is in the error state (-1) or or is set to null prompt the user
    // If it is false the user does not want to proceed
    else if (
      (callbackBotDetails.getUserEmailStep === null ||
        callbackBotDetails.getUserEmailStep === -1) &&
      typeof callbackBotDetails.confirmEmailStep === 'boolean' &&
      callbackBotDetails.confirmEmailStep === false
    ) {
      // Setup the prompt message
      let promptMsg = '';

      // The current step is an error state
      if (callbackBotDetails.getUserEmailStep === -1) {
        promptMsg = retryMsg;
      } else {
        promptMsg = standardMsg;
      }
      return await stepContext.prompt(TEXT_PROMPT, promptMsg);
    }
    return await stepContext.next(false);
  }

  /**
   *
   *
   */
  async finalStep(stepContext: WaterfallStepContext) {
    // Get the user details / state machine
    const callbackBotDetails = stepContext.options as CallbackBotDetails;
    let luisRecognizer;
    let lang = 'en';

    // Then change LUIZ appID
    if (
      stepContext.context.activity.locale.toLowerCase() === 'fr-ca' ||
      stepContext.context.activity.locale.toLowerCase() === 'fr-fr'
    ) {
      lang = 'fr';
    }

    // LUIZ Recogniser processing
    luisRecognizer = new CallbackRecognizer(lang);

    // Call prompts recognizer
    const recognizerResult = await luisRecognizer.executeLuisQuery(
      stepContext.context
    );

    // Top intent tell us which cognitive service to use.
    const intent = LuisRecognizer.topIntent(recognizerResult, 'None', 0.5);

    switch (intent) {
      // Proceed
      case 'promptConfirmSendEmailYes':
      case 'promptConfirmNotifyYes':
      case 'promptConfirmYes':
      case 'promptTryAgainYes':
        console.log('INTENT: ', intent);
        callbackBotDetails.getPreferredMethodOfContactStep = null;
        callbackBotDetails.confirmEmailStep = null;
        callbackBotDetails.preferredEmailAndText = null;
        callbackBotDetails.preferredEmail = null;
        callbackBotDetails.getUserEmailStep = null;
        callbackBotDetails.errorCount.getUserEmailStep = 0;
        return await stepContext.replaceDialog(
          GET_PREFERRED_METHOD_OF_CONTACT_STEP,
          callbackBotDetails
        );

      // Don't Proceed
      case 'promptConfirmEmailNo':
      case 'promptConfirmNo':
      case 'NoNotForNow':
       const commonPromptValidatorModel = new CommonPromptValidatorModel();
      //call dialog
      return await stepContext.beginDialog(ALWAYS_ON_BOT_DIALOG, commonPromptValidatorModel);

      // Could not understand / None intent
      default: {
        // Catch all
        console.log('NONE INTENT');
        // Result has come through
        const results = stepContext.result;
        if (results) {
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          // Email validation
          if (re.test(String(results).toLowerCase())) {
            callbackBotDetails.confirmEmailStep = true;
            callbackBotDetails.getUserEmailStep = true;

            const confirmMsg = i18n.__('getUserEmailStepConfirmMsg');

            await stepContext.context.sendActivity(confirmMsg);
            return await stepContext.endDialog(callbackBotDetails);
          } else {
            callbackBotDetails.getUserEmailStep = -1;
            callbackBotDetails.errorCount.getUserEmailStep++;
          }
        }
        return await stepContext.replaceDialog(
          GET_USER_EMAIL_STEP,
          callbackBotDetails
        );
      }
    }
  }
}
