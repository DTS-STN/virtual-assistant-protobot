module.exports=[
    {
        intent: 'Test',
        initialData: {
            locale: 'en',
            retryCount: 0,
            intents: ['promptConfirmYes', 'promptConfirmNo'],
            maxRetryCount: 2,
            promptCode: 'UpdateMyEmail',
            result: ''
        },
        name: 'AskEmail Address Step',
        steps: [
            ['hi', 'Ok, what\'s your new email address? (here’s an example: name@mail.com)'],
            ['testuser@domain.com', 'Perfect! I have updated your email address to testuser@domain.com'],
            ['', 'Ok, you’re all set then!'],
            ['', 'Is there anything else I can help you with today?']
        ]
    },
    {
        intent: 'Test',
        initialData: {
            locale: 'en',
            retryCount: 0,
            intents: ['Yes', 'No'],
            maxRetryCount: 2,
            promptCode: 'UpdateMyEmail',
            result: ''
        },
        name: 'Ask Email Address with invalid emailId',
        steps: [
            ['hi', 'Ok, what\'s your new email address? (here’s an example: name@mail.com)'],
            ['haha', 'Oops, looks like the email address you entered isn’t formatted correctly (here’s an example: name@mail.com). Let’s try again.'],
            ['haha', 'I\'m sorry, but it looks like I can\'t help you today. If you\'d like, I can have a Service Canada representative call to help you with your email address update.\n\n Would you like me to set up a call?']
        ]
    }
];
