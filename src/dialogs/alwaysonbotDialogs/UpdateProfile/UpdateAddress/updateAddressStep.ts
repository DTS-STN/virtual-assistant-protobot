
import { Choice, ChoicePrompt, ComponentDialog, ConfirmPrompt, DialogTurnResult, PromptValidatorContext, WaterfallDialog, WaterfallStepContext } from "botbuilder-dialogs";
import { CommonPromptValidatorModel } from "../../../../models/commonPromptValidatorModel";
import { CONTINUE_AND_FEEDBACK_STEP,ContinueAndFeedbackStep } from "../../Common/continueAndFeedbackStep";
import { FeedBackStep, FEED_BACK_STEP } from "../../Common/feedBackStep";
import { COMMON_CHOICE_CHECK_STEP } from "../UpdatePhoneNumber/commonChoiceCheckStep";
import { AddressDetails } from "./addressDetails";
import { GetAddressesStep, GET_ADDRESS_STEP } from "./getAddressesStep";
import i18n from "../../../locales/i18nconfig";

const CONFIRM_PROMPT = "CONFIRM_PROMPT";
const CHOICE_PROMPT = "CHOICE_PROMPT";
export const UPDATE_ADDRESS_STEP = "UPDATE_ADDRESS_STEP";
const UPDATE_ADDRESS_WATERFALL_STEP = "UPDATE_ADDRESS_WATERFALL_STEP";
// Define the main dialog and its related components.
export class UpdateAddressStep extends ComponentDialog {
    constructor() {
        super(UPDATE_ADDRESS_STEP);
        
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT))
            .addDialog(new ChoicePrompt(CHOICE_PROMPT, this.CustomChoiceValidator))
            .addDialog(new ContinueAndFeedbackStep())
            .addDialog(new GetAddressesStep())
            .addDialog(new WaterfallDialog(UPDATE_ADDRESS_WATERFALL_STEP, [
                this.checkAddressStep.bind(this),
                this.selectionStep.bind(this),
            ]));

        this.initialDialogId = UPDATE_ADDRESS_WATERFALL_STEP;
    }

    private async CustomChoiceValidator(promptContext: PromptValidatorContext<Choice>) {
        return true;
    }
    /**
     * Passing intents list related to UpdateAddress dialog.
     * Passing master error count to common choice dialog.
     * Passing current dialog name to common choice dialog.
     */
    async checkAddressStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {

        let commonPromptValidatorModel = new CommonPromptValidatorModel(
            ["Yes", "No"],
            Number(i18n.__("MaxRetryCount")),
            "UpdateAddress"
        );
        return await stepContext.beginDialog(COMMON_CHOICE_CHECK_STEP, commonPromptValidatorModel);
    }

   /**
   * Selection step in the waterfall.bot chooses the different flows depends on user's input
   * If users selects 'Yes' then bot will navigate to the Get Address workflow
   * If users selects 'No' then bot will navigate to the continue and feedback flow
   */
     async selectionStep(stepContext) {
        const addressDetails = new AddressDetails;
        const commonPromptValidatorModel = stepContext.result as CommonPromptValidatorModel;
        if (commonPromptValidatorModel != null && commonPromptValidatorModel.status) {
            switch (commonPromptValidatorModel.result) {
                case "Yes":
                    return await stepContext.replaceDialog(GET_ADDRESS_STEP, addressDetails);
                case "No":
                    return await stepContext.replaceDialog(CONTINUE_AND_FEEDBACK_STEP, ContinueAndFeedbackStep);
            }
        }
        else {
            return stepContext.replaceDialog(FEED_BACK_STEP, FeedBackStep);
        }
    } 
}

