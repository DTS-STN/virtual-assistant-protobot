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
            ['hi', 'I\'m sorry, but it looks like I can\'t help you today. If you\'d like, I can have a Service Canada representative call to help you with your phone number update.\n\n Would you like me to set up a call?'],
            ['Yes I want to request call', `Ok, is 123-654-0987 still the best phone number to reach you? (1) Yes or (2) No`]
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
            ['hi', 'I\'m sorry, but it looks like I can\'t help you today. If you\'d like, I can have a Service Canada representative call to help you with your phone number update.\n\n Would you like me to set up a call?'],
            ['No Not For Now', 'Is there anything else I can help you with today?']
        ]
    }
];