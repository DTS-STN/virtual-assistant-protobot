import { ActivityTypes, ConversationState, MemoryStorage, TestAdapter, TurnContext, UserState } from "botbuilder";
import { DialogSet, DialogTurnStatus } from "botbuilder-dialogs";
import chai from "chai";
import { VirtualassistantAOBot } from "../../bots/VirtualassistantAOBot";
import { AlwaysOnBotDialog } from "../../dialogs/alwaysonbotDialogs/alwaysOnBotDialog";
import i18n from "../../dialogs/locales/i18nconfig";
const assert = require("assert");
chai.use(require("sinon-chai"));


class MockAlwaysOnBotDialog extends AlwaysOnBotDialog {
    

    public async beginDialog(dc, options) {
        await dc.context.sendActivity(`${this.id} mock invoked`);
        return await dc.endDialog();
    }

    public async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }
}

describe("VirtualAssistantAOBot", () => {
    const testAdapter = new TestAdapter();

    async function processActivity(activity, bot){
        const context = new TurnContext(testAdapter, activity);
        await bot.run(context);
    }

    it("Should be able to send welcome message and initialize AlwaysOnBotDialog", async () => {
        const memoryStorage = new MemoryStorage();
        const conversationState = new ConversationState(memoryStorage);
        const userState = new UserState(memoryStorage);
        const alwaysOnBotDialog = new AlwaysOnBotDialog();


        const dialogs = new DialogSet(
            conversationState.createProperty("DialogState")
        );


        dialogs.add(alwaysOnBotDialog);
        const sut = new VirtualassistantAOBot(
            conversationState,
            userState,
            alwaysOnBotDialog
        );

        const conversationUpdateActivity = {
            channelId: "emulator",
            conversation: {
                id: "someId"
            },
            membersAdded: [
                {
                    id: "theUser"
                }
            ],
            recipient: {
                id: "theBot"
            },
            locale: "en",
            type: ActivityTypes.ConversationUpdate
        };

        i18n.setLocale("en");
        await processActivity(conversationUpdateActivity, sut);

        let reply = testAdapter.activityBuffer.shift();
        const expectedMsg = i18n.__("welcomeVirtualAssistantMessage");
        assert.strictEqual(reply.text, expectedMsg);

        reply = testAdapter.activityBuffer.shift();
        const expectedMsg2 = i18n.__("welcomeProfileStatement");
        assert.strictEqual(reply.text, expectedMsg2);

        reply = testAdapter.activityBuffer.shift();
        const expectedMsg3 = i18n.__("AlwaysOnBotPromptMessage");
        assert.strictEqual(reply.text, expectedMsg3);

    });
});