module.exports=[
            {
                intent: 'Test',
                initialData: {
                    locale: 'en',
                    retryCount: 0,
                    intents: ['promptConfirmYes', 'promptConfirmNo'],
                    maxRetryCount: 2,
                    promptCode: 'UpdateMyPhoneNumber',
                    result: ''
                },
                name: 'Ask Phone Number Step',
                steps: [
                    ['hi', 'Ok, what\'s your new phone number? (here’s an example: 123-456-7890)'],
                    ['123-123-1234', 'Perfect! I have updated your phone number to 123-123-1234'],
                    ['', 'Ok, you’re all set then!'],
                    ['', 'Is there anything else I can help you with today?']
                ]
            },
            {
                intent: 'Test',
                initialData: {
                    locale: 'en',
                    retryCount: 0,
                    intents: ['promptConfirmYes', 'promptConfirmNo'],
                    maxRetryCount: 2,
                    promptCode: 'UpdateMyPhoneNumber',
                    result: ''
                },
                name: 'Ask Phone Number with invalid Number',
                steps: [
                    ['hi', 'Ok, what\'s your new phone number? (here’s an example: 123-456-7890)'],
                    ['haha', 'Oops, looks like the phone number you entered isn\'t formatted correctly (here\'s an example: 123-456-7890). Let\'s try again.'],
                    ['haha', 'I\'m sorry, but it looks like I can\'t help you today. If you\'d like, I can have a Service Canada representative call to help you with your phone number update.\n\n Would you like me to set up a call?']

                ]
            }
        ];