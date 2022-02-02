import {
    Choice, ChoicePrompt, ComponentDialog, PromptValidatorContext, TextPrompt,
    WaterfallDialog
} from "botbuilder-dialogs";
import { CommonPromptValidatorModel } from "../../../../models/commonPromptValidatorModel";
import { CONTINUE_AND_FEEDBACK_STEP,ContinueAndFeedbackStep } from "../../Common/continueAndFeedbackStep";
import i18n from "../../../locales/i18nconfig";
import { COMMON_CHOICE_CHECK_STEP } from "./commonChoiceCheckStep";
import { CONFIRM_PHONE_NUMBER_STEP,ConfirmPhoneNumberStep } from "./confirmPhoneNumberStep";
import { FeedBackStep, FEED_BACK_STEP } from "../../Common/feedBackStep";

const TEXT_PROMPT = "TEXT_PROMPT";
const CHOICE_PROMPT = "CHOICE_PROMPT";

export const UPDATE_PHONE_NUMBER_STEP = "UPDATE_PHONE_NUMBER_STEP";
const UPDATE_PHONE_NUMBER_WATERFALL_STEP = "UPDATE_PHONE_NUMBER_WATERFALL_STEP";
// Define the main dialog and its related components.
export class UpdateMyPhoneStep extends ComponentDialog {
    constructor() {
        super(UPDATE_PHONE_NUMBER_STEP);

        this.addDialog(new TextPrompt(TEXT_PROMPT))
            .addDialog(new ChoicePrompt(CHOICE_PROMPT, this.CustomChoiceValidator))
            .addDialog(new ConfirmPhoneNumberStep())
            .addDialog(new ContinueAndFeedbackStep())
            .addDialog(new WaterfallDialog(UPDATE_PHONE_NUMBER_WATERFALL_STEP, [
                this.checkPhoneNumberStep.bind(this),
                this.routingStep.bind(this)
            ]));

        this.initialDialogId = UPDATE_PHONE_NUMBER_WATERFALL_STEP;
    }
    private async CustomChoiceValidator(promptContext: PromptValidatorContext<Choice>) {
        return true;
    }
    // First step in the waterfall dialog. Prompts the user for a command.
    async checkPhoneNumberStep(stepContext) {

        let commonPromptValidatorModel = new CommonPromptValidatorModel(
            ["Yes", "No"],
            Number(i18n.__("MaxRetryCount")),
            "UpdateMyPhoneNumber"
        );
        //call dialog
        return await stepContext.beginDialog(COMMON_CHOICE_CHECK_STEP, commonPromptValidatorModel);
        
    }
    /**
    * Selection step in the waterfall.
    * Bot chooses the flows(CONFIRM_PHONE_NUMBER_DIALOG_STEP,CONTINUE_AND_FEEDBACK_DIALOG_STEP) based on user"s input.
    */
    async routingStep(stepContext) {
        const commonPromptValidatorModel = stepContext.result as CommonPromptValidatorModel;
        if (commonPromptValidatorModel != null && commonPromptValidatorModel.status) {
            switch (commonPromptValidatorModel.result) {
                case "Yes":
                    commonPromptValidatorModel.retryCount=0;
                    return await stepContext.beginDialog(CONFIRM_PHONE_NUMBER_STEP, commonPromptValidatorModel);
                case "No":
                    await stepContext.context.sendActivity(i18n.__("NoStatementPhoneNumber"));
                    return stepContext.replaceDialog(CONTINUE_AND_FEEDBACK_STEP, ContinueAndFeedbackStep);
            }
        }
        else
        {
            return stepContext.replaceDialog(FEED_BACK_STEP, FeedBackStep);
        }
        
    }
}