module.exports=[
    {
        intent: 'YesIWantToRequestCall',
        initialData: {
            locale:'',
            retryCount: 0,
            maxRetryCount: 4,
            promptCode: 'ConfirmPhoneNumberCallBack',
            result: ''
        },
        name: ' common call back Yes step',
        steps: [
            ['hi', 'I\'m sorry, but it looks like I can\'t help you today. If you\'d like, I can have a Service Canada representative call you on the phone to help you with your phone number update.\n\n Would you like me to set up a call?'],
            ['Yes i want to request call', 'I see, looks like you need more help than I can provide at the moment.']
        ]
    },
    {
        intent: 'NoNotForNow',
        initialData: {
            locale:'',
            retryCount: 0,
            maxRetryCount: 4,
            promptCode: 'ConfirmPhoneNumberCallBack',
            result: ''
        },
        name: 'Common Call back No step',
        steps: [
            ['hi', 'I\'m sorry, but it looks like I can\'t help you today. If you\'d like, I can have a Service Canada representative call you on the phone to help you with your phone number update.\n\n Would you like me to set up a call?'],
            ['No Not For Now', 'Anything else that I can help you with today?']
        ]
    }
];