
import {
    Choice,
    ChoicePrompt, ComponentDialog, DialogTurnResult, PromptValidatorContext, TextPrompt, WaterfallDialog, WaterfallStepContext
} from "botbuilder-dialogs";
import { CommonPromptValidatorModel } from "../../../../models/commonPromptValidatorModel";
import { CONTINUE_AND_FEEDBACK_STEP,ContinueAndFeedbackStep } from "../../Common/continueAndFeedbackStep";
import { FeedBackStep, FEED_BACK_STEP } from  "../../Common/feedBackStep";
import { COMMON_CHOICE_CHECK_STEP } from "../UpdatePhoneNumber/commonChoiceCheckStep";
import i18n from "../../../locales/i18nconfig";
const CHOICE_PROMPT = "CHOICE_PROMPT";
const TEXT_PROMPT = "TEXT_PROMPT";

export const CALL_BACK_STEP = "CALL_BACK_STEP";
const CALL_BACK_STEP_WATERFALL_STEP = "CALL_BACK_STEP_WATERFALL_STEP";

// Define the main dialog and its related components.
export class CallBackStep extends ComponentDialog {
    constructor() {
        super(CALL_BACK_STEP);

        this.addDialog(new TextPrompt(TEXT_PROMPT))
            .addDialog(new ChoicePrompt(CHOICE_PROMPT))
            .addDialog(new ContinueAndFeedbackStep())
            .addDialog(new FeedBackStep())
            .addDialog(new WaterfallDialog(CALL_BACK_STEP_WATERFALL_STEP, [
                this.continueStep.bind(this),
                this.selectionStep.bind(this)
               
            ]));

        this.initialDialogId = CALL_BACK_STEP_WATERFALL_STEP;
    }

     private async CustomChoiceValidator(promptContext: PromptValidatorContext<Choice>) {
        return true;
    }

     /**
     * Passing intents list related to ServiceRepresentative(callBackStep) dialog.
     * Passing master error count to common choice dialog.
     * Passing current dialog name to common choice dialog.
     */
    async continueStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {

        let commonPromptValidatorModel = new CommonPromptValidatorModel(
            ["YesIWantToRequestCall", "NoNotForNow"],
            Number(i18n.__("MaxRetryCount")),
            "ServiceRepresentative"
        );
        //call dialog
        return await stepContext.beginDialog(COMMON_CHOICE_CHECK_STEP, commonPromptValidatorModel);
    }
    /**
    * User selection step in the waterfall.
    * User selects the "Yes I Want To Request Call" prompt to navigate to the users"s call back flow.
    * User selects the "No, Not For Now" prompt to navigate to continue and feedback flow.
    */

     private async selectionStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        const commonPromptValidatorModel = stepContext.result as CommonPromptValidatorModel;

        if (commonPromptValidatorModel != null && commonPromptValidatorModel.status)
        {
            switch (commonPromptValidatorModel.result) {
                case "YesIWantToRequestCall": 
                    return await stepContext.endDialog(this.id);
                case "NoNotForNow":
                    return await stepContext.replaceDialog(CONTINUE_AND_FEEDBACK_STEP, ContinueAndFeedbackStep);
            }
        }
        else
        {
            return stepContext.replaceDialog(FEED_BACK_STEP, FeedBackStep);
        }
    }
}