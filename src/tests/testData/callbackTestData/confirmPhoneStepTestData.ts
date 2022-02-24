module.exports = [
  {
    expectedResult: {
      masterError: null,
      confirmCallbackStep: true,
      confirmCallbackPhoneNumberStep: null,
      preferredEmail: true,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: true,
      confirmEmailStep: null,
      confirmPhoneStep: true,
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
    expectedStatus: 'complete',
    intent: 'promptConfirmYes',
    initialData: {
      masterError: null,
      confirmCallbackStep: true,
      confirmCallbackPhoneNumberStep: null,
      preferredEmail: true,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: true,
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
    name: 'confirm Yes, this is the correct phone number',
    steps: [
      [
        null,
        `The phone number I have for you is [XXX-XXX-XXXX]. Can this number receive text messages? (1) Yes correct! or (2) No it's not`
      ],
      [
        'Yes, correct',
        `Ok, I'll text your confirmation code to [PHONE NUMBER].`
      ]
    ]
  },
  {
    expectedResult: undefined,
    expectedStatus: 'complete',
    intent: 'promptConfirmNo',
    initialData: {
      masterError: null,
      confirmCallbackStep: true,
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
    name: 'Choose No, not correct phone number',
    steps: [
      [
        null,
        `The phone number I have for you is [XXX-XXX-XXXX]. Can this number receive text messages? (1) Yes correct! or (2) No it's not`
      ],
      [
        'no, not correct',
        `Can you give me a cell phone number where I can send you the text message?`
      ]
    ]
  },

  {
    expectedResult: undefined,
    expectedStatus: 'complete',
    intent: 'None',
    initialData: {
      masterError: null,
      confirmCallbackStep: true,
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
        `The phone number I have for you is [XXX-XXX-XXXX]. Can this number receive text messages? (1) Yes correct! or (2) No it's not`
      ],
      [
        'haha',
        `Hmm, I'm not sure what you meant. Is this the correct phone number? (1) Yes correct! or (2) No it's not`
      ]
    ]
  },
  {
    expectedResult: {
      masterError: true,
      confirmCallbackStep: true,
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
      confirmPhoneStep: -1,
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
        confirmPhoneStep: 3
      }
    },
    intent: 'NONE',
    expectedStatus: 'complete',
    initialData: {
      masterError: null,
      confirmCallbackStep: true,
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
        `The phone number I have for you is [XXX-XXX-XXXX]. Can this number receive text messages? (1) Yes correct! or (2) No it's not`
      ],
      [
        'haha',
        `Hmm, I'm not sure what you meant. Is this the correct phone number? (1) Yes correct! or (2) No it's not`
      ],
      [
        'haha',
        `Hmm, I'm not sure what you meant. Is this the correct phone number? (1) Yes correct! or (2) No it's not`
      ],
      [
        'haha',
        `Hmm, I'm having a hard time understanding you. Sorry about that! Try visiting our Help Center or give us a call at (XXX-XXX-XXXX).`
      ]
    ]
  }
];
