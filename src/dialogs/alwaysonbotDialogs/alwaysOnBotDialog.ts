import { StatePropertyAccessor, TurnContext } from "botbuilder";
import {
    ChoicePrompt, ComponentDialog,
    DialogSet,
    DialogState,
    DialogTurnResult,
    DialogTurnStatus, PromptValidatorContext, TextPrompt,
    WaterfallDialog,
    WaterfallStepContext
} from "botbuilder-dialogs";
import { Choice } from "../../../node_modules/botbuilder-dialogs/src/choices/findChoices";
import { CommonPromptValidatorModel } from "../../models/commonPromptValidatorModel";
import { FeedBackStep, FEED_BACK_STEP } from "./Common/feedBackStep";

import { OASBenefitStep, OAS_BENEFIT_STEP } from "./OASBenefit/oASBenefitStep";
import { CommonChoiceCheckStep, COMMON_CHOICE_CHECK_STEP } from "./UpdateProfile/UpdatePhoneNumber/commonChoiceCheckStep";
import { UpdateProfileStep, UPDATE_PROFILE_STEP } from "./UpdateProfile/updateProfileStep";
import i18n from "../locales/i18nconfig";


const CHOICE_PROMPT = "CHOICE_PROMPT";

export const ALWAYS_ON_BOT_DIALOG_STEP = "ALWAYS_ON_BOT_DIALOG_STEP";
//const ALWAYS_ON_BOT_DIALOG_WATERFALL_STEP = "ALWAYS_ON_BOT_DIALOG_WATERFALL_STEP";
//const WATERFALL_DIALOG = "waterfallDialog";

export class AlwaysOnBotDialog extends ComponentDialog {

    constructor() {
        super(ALWAYS_ON_BOT_DIALOG_STEP);

        if (!UpdateProfileStep) throw new Error("[MainDialog]: Missing parameter \"updateProfileDialog\" is required");

        // Define the main dialog and its related components.
        // This is a sample "book a flight" dialog.
        this.addDialog(new TextPrompt("TEXT_PROMPT"))
            .addDialog(new UpdateProfileStep())
            .addDialog(new FeedBackStep())
            .addDialog(new CommonChoiceCheckStep())
            .addDialog(new OASBenefitStep())
            .addDialog(new ChoicePrompt(CHOICE_PROMPT,this.CustomChoiceValidator))
            .addDialog(new WaterfallDialog(ALWAYS_ON_BOT_DIALOG_STEP, [
                this.introStep.bind(this),
                this.actStep.bind(this)
            ]));

        this.initialDialogId = ALWAYS_ON_BOT_DIALOG_STEP;
    }

    /**
     * The run method handles the incoming activity (in the form of a DialogContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {TurnContext} context
     */
    public async run(context: TurnContext, accessor: StatePropertyAccessor<DialogState>) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);
        const dialogContext = await dialogSet.createContext(context);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }

    /**
     * First step in the waterfall dialog. Prompts the user for a command.
     */

    // validates all the prompts
     private async CustomChoiceValidator(promptContext: PromptValidatorContext<Choice>) {
        return true;
    }

    /**
     * Passing intents list related to main dialog.
     * Passing master error count to common choice dialog.
     * Passing current dialog name to common choice dialog.
     */
    private async introStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        
       let commonPromptValidatorModel = new CommonPromptValidatorModel(
        ["IWantToUpdateMyPersonalInformation", "IHaveQuestionAboutOASPension"],
        Number(i18n.__("MaxRetryCount")),
        "AlwaysOnBot"
    );
    //call dialog
    return await stepContext.beginDialog(COMMON_CHOICE_CHECK_STEP, commonPromptValidatorModel); 
    }
    /**
    * This is the final step in waterfall.bot displays the main workflow prompt suggestions to the user.(I Want To Update My Personal Information and I Have a Question About OASPension)
    */
    private async actStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        const commonPromptValidatorModel = stepContext.result as CommonPromptValidatorModel;

        if (commonPromptValidatorModel != null && commonPromptValidatorModel.status)
        {
            switch (commonPromptValidatorModel.result) {
                case "IWantToUpdateMyPersonalInformation":
                    return await stepContext.replaceDialog(UPDATE_PROFILE_STEP, UpdateProfileStep);
                case "IHaveQuestionAboutOASPension":
                    return await stepContext.replaceDialog(OAS_BENEFIT_STEP,OASBenefitStep); 
            }
        }
        else
        {
            return stepContext.replaceDialog(FEED_BACK_STEP, FeedBackStep);
        }
    }
}
   


