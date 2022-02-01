import { LuisRecognizer } from "botbuilder-ai";
import {
    Choice, ChoiceFactory, ChoicePrompt, ComponentDialog,
    ConfirmPrompt, DialogTurnResult, ListStyle, PromptValidatorContext, TextPrompt,
    WaterfallDialog,
    WaterfallStepContext
} from "botbuilder-dialogs";
import { CommonPromptValidatorModel } from "../../../../models/commonPromptValidatorModel";
import { LUISAOSetup } from "../../../../utils/luisAppSetup";
import { FeedBackStep, FEED_BACK_STEP } from "../../Common/feedBackStep";
import { ContinueAndFeedbackStep, CONTINUE_AND_FEEDBACK_STEP } from "../../Common/continueAndFeedbackStep";
import i18n from "../../../locales/i18nconfig";
import { CALL_BACK_STEP,CallBackStep } from "../UpdateAddress/callBackStep";

const CONFIRM_PROMPT = "CONFIRM_PROMPT";
const TEXT_PROMPT = "TEXT_PROMPT";
const CHOICE_PROMPT = "CHOICE_PROMPT";

export const CONFIRM_PHONE_NUMBER_STEP = "CONFIRM_PHONE_NUMBER_STEP";
const CONFIRM_PHONE_NUMBER_WATERFALL_STEP = "CONFIRM_PHONE_NUMBER_WATERFALL_STEP";

// Define the main dialog and its related components.
export class ConfirmPhoneNumberStep extends ComponentDialog {
    constructor() {
        super(CONFIRM_PHONE_NUMBER_STEP);

        this.addDialog(new TextPrompt(TEXT_PROMPT))
            .addDialog(new ChoicePrompt(CHOICE_PROMPT, this.CustomChoiceValidator))
            .addDialog(new ContinueAndFeedbackStep())
            .addDialog(new ConfirmPrompt(CONFIRM_PROMPT))
            .addDialog(new CallBackStep())
            .addDialog(new WaterfallDialog(CONFIRM_PHONE_NUMBER_WATERFALL_STEP, [
                this.askPhoneNumberStep.bind(this),
                this.updatedStep.bind(this)
            ]));

        this.initialDialogId = CONFIRM_PHONE_NUMBER_WATERFALL_STEP;
    }
    private async CustomChoiceValidator(promptContext: PromptValidatorContext<Choice>) {
        return true;
    }
    /**
    *  Initial step in the waterfall. This will kick off the confirmPhoneNumberStep
    *  prompt user to enter the phone number and covers the case where user enters invalid phone number
    */
    async askPhoneNumberStep(stepContext:WaterfallStepContext): Promise<DialogTurnResult>{
        const details= stepContext.options as CommonPromptValidatorModel;
        if(details.retryCount === 0)
        {
            return await stepContext.prompt(TEXT_PROMPT, i18n.__("AskPhoneNUmber"))
        }
        else if(details.retryCount<=details.maxRetryCount)
        {
            return await stepContext.prompt(TEXT_PROMPT, i18n.__("ConfirmPhoneNumberRetryPromptMessage"))
        }
        else if(details.retryCount>details.maxRetryCount){
            const exceededRetryMessage = i18n.__("ConfirmPhoneNumberRetryExceededMessage");
            return stepContext.replaceDialog(CALL_BACK_STEP, CallBackStep);

        }
    }
    // confirm the users intent to proceed with the step
    async updatedStep(stepContext:WaterfallStepContext): Promise<DialogTurnResult> {
        let details=stepContext.options as CommonPromptValidatorModel ;
        const recognizer = LUISAOSetup(stepContext);
        const recognizerResult = await recognizer.recognize(stepContext.context);
        const intent = LuisRecognizer.topIntent(recognizerResult, "None", 0.5);
        if(stepContext.result.value){
            switch(intent)
            {
                case "Yes":
                    return await stepContext.cancelAllDialogs();
                case "No":
                    return await stepContext.replaceDialog(CONTINUE_AND_FEEDBACK_STEP,ContinueAndFeedbackStep);
            }
        }
        // ask the user to confirm the phone number and save it to the system
        else
        {
            const PhoneNumber = stepContext.result;
            let validPhoneNumber:boolean;
            let updatedStatement = i18n.__("PhoneNumberConfirmStep")
            validPhoneNumber = this.validatePhoneNumber(PhoneNumber);
            if(validPhoneNumber){
                updatedStatement = updatedStatement.replace("@phoneNumber",PhoneNumber);
                await stepContext.context.sendActivity(updatedStatement);
                await stepContext.context.sendActivity(i18n.__("SetStep"));
                return stepContext.replaceDialog(CONTINUE_AND_FEEDBACK_STEP,ContinueAndFeedbackStep);
            }
            else{
                details.retryCount = details.retryCount+1;
                return stepContext.replaceDialog(CONFIRM_PHONE_NUMBER_STEP,details);
            }
        }
    }
    private validatePhoneNumber(response:string)
    {
        let reg = /[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]/
        let validPhone:boolean = false;
        reg = new RegExp(reg);
        if(response.match(reg))
        {
            validPhone = true;
        }
        
        return validPhone;
    }
}