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
            ['Yes I want to request call', `Ok, is [123-456-7890] still the best phone number to reach you? (1) Yes, correct or (2) No, it's not`]
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