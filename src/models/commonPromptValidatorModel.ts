export class CommonPromptValidatorModel {
    public retryCount: number;
    public result: string;
    public promptCode: string;
    public status: boolean;
    public intents: Array<string>;
    public maxRetryCount: number;

    constructor(intents: Array<string>, maxRetryCount: number, promptCode:string){
        this.retryCount = 0;
        this.intents = intents;
        this.maxRetryCount = maxRetryCount ?? 4;
        this.promptCode = promptCode;
    }
}