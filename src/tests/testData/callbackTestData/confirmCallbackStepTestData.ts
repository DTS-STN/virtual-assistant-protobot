module.exports = [
  {
    expectedResult: undefined,
    expectedStatus: 'complete',
    intent: 'InitialDialog',
    initialData: {
      masterError: null,
      confirmCallbackStep: null,
      confirmCallbackPhoneNumberStep: null,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: null,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        confirmCallbackStep: 0,
        getUserPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackPhoneNumberStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
        confirmPhoneStep: 0
      }
    },
    name: 'Initial confirm callback Dialog successful',
    steps: [
      [
        null,
        'I see, looks like you need more help than I can provide at the moment.'
      ],
      [
        null,
        `I can have a Service Canada representative call you on the phone to help you with your missing record of employment. Does that sound good to you? (1) Yes please! or (2) No thanks`
      ],
      [
        'Yes, please!',
        'Ok, is [XXX-XXX-XXXX] still the best phone number to reach you?'
      ]
    ]
  },
  {
    expectedResult: undefined,
    expectedStatus: 'complete',
    intent: 'InitialDialog',
    initialData: {
      masterError: null,
      confirmCallbackStep: null,
      confirmCallbackPhoneNumberStep: null,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: null,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        confirmCallbackStep: 0,
        getUserPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackPhoneNumberStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
        confirmPhoneStep: 0
      }
    },
    name: 'confirm  Callback Yes',
    steps: [
      [
        null,
        'I see, looks like you need more help than I can provide at the moment.'
      ],
      [
        null,
        `I can have a Service Canada representative call you on the phone to help you with your missing record of employment. Does that sound good to you? (1) Yes please! or (2) No thanks`
      ],
      [
        'Yes, please!',
        'Ok, is [XXX-XXX-XXXX] still the best number to reach you?'
      ]
    ]
  },
  {
    expectedResult: undefined,
    expectedStatus: 'complete',
    intent: 'promptConfirmNo',
    initialData: {
      masterError: null,
      confirmCallbackStep: null,
      confirmCallbackPhoneNumberStep: null,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: null,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        confirmCallbackStep: 0,
        getUserPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackPhoneNumberStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
        confirmPhoneStep: 0
      }
    },
    name: 'Choose No Callback',
    steps: [
      [
        null,
        'I see, looks like you need more help than I can provide at the moment.'
      ],
      [
        `I can have a Service Canada representative call you on the phone to help you with your missing record of employment. Does that sound good to you? (1) Yes please! or (2) No thanks`,
        `I can have a Service Canada representative call you on the phone to help you with your missing record of employment. Does that sound good to you? (1) Yes please! or (2) No thanks`
      ],
      ['No, please', `Ok, no problem. I'm here if you need me!`]
    ]
  },

  {
    expectedResult: undefined,
    expectedStatus: 'complete',
    intent: 'None',
    initialData: {
      masterError: null,
      confirmCallbackStep: null,
      confirmCallbackPhoneNumberStep: null,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: null,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        confirmCallbackStep: 0,
        getUserPhoneNumberStep: 0,
        confirmCallbackPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
        confirmPhoneStep: 0
      }
    },
    name: 'Error input once',
    steps: [
      [
        null,
        'I see, looks like you need more help than I can provide at the moment.'
      ],
      [
        `I can have a Service Canada representative call you on the phone to help you with your missing record of employment. Does that sound good to you? (1) Yes please! or (2) No thanks`,
        `I can have a Service Canada representative call you on the phone to help you with your missing record of employment. Does that sound good to you? (1) Yes please! or (2) No thanks`
      ],
      [
        'haha',
        `Hmm, I'm not sure what you meant. Do you want a Service Canada representative to call you about your application? (1) Yes please! or (2) No thanks`
      ]
    ]
  },
  {
    expectedResult: undefined,
    intent: 'None',
    expectedStatus: 'complete',
    initialData: {
      masterError: null,
      confirmCallbackStep: null,
      confirmCallbackPhoneNumberStep: null,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: null,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        confirmCallbackStep: 0,
        getUserPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackPhoneNumberStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
        confirmPhoneStep: 0
      }
    },
    name: 'Error input more than 3 times',
    steps: [
      [
        null,
        'I see, looks like you need more help than I can provide at the moment.'
      ],
      [
        `I can have a Service Canada representative call you on the phone to help you with your missing record of employment. Does that sound good to you? (1) Yes please! or (2) No thanks`,
        `I can have a Service Canada representative call you on the phone to help you with your missing record of employment. Does that sound good to you? (1) Yes please! or (2) No thanks`
      ],
      [
        'haha',
        `Hmm, I'm not sure what you meant. Do you want a Service Canada representative to call you about your application? (1) Yes please! or (2) No thanks`
      ],
      [
        'haha',
        `Hmm, I'm not sure what you meant. Do you want a Service Canada representative to call you about your application? (1) Yes please! or (2) No thanks`
      ],
      [
        'haha',
        `Hmm, I'm having a hard time understanding you. Sorry about that! Please visit our Help Centre or give us a call at [XXX-XXX-XXXX].`
      ]
    ]
  }
];
