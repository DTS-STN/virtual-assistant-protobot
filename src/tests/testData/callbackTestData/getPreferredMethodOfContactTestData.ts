module.exports = [
  {
    expectedResult: undefined,
    expectedStatus: 'complete',
    intent: 'promptConfirmChoiceEmail',
    initialData: {
      masterError: null,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: null,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        getUserPhoneNumberStep: 0,
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
    name: 'Choose Email',
    steps: [
      [
        null,
        `Would you like to receive this confirmation code via email, text message, or both?\n\n   1. Email\n   2. Text message\n   3. Both\n   4. No need at all`
      ],
      [
        'Yes, email please',
        `The email address I have for you is [test@test.com]. Is this the correct email address? (1) Yes correct! or (2) No it's not`
      ]
    ]
  },
  {
    expectedResult: undefined,
    intent: 'promptConfirmChoiceText',
    expectedStatus: 'complete',
    initialData: {
      masterError: null,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: null,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        getUserPhoneNumberStep: 0,
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
    name: 'Choose Text',
    steps: [
      [
        null,
        `Would you like to receive this confirmation code via email, text message, or both?\n\n   1. Email\n   2. Text message\n   3. Both\n   4. No need at all`
      ],
      [
        `yes, text message`,
        `The phone number I have for you is [123-456-7890]. Can this number receive text messages? (1) Yes correct! or (2) No it's not`
      ]
    ]
  },
  {
    expectedResult: {
      masterError: null,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: true,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: true,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        getUserPhoneNumberStep: 0,
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
    expectedStatus: 'complete',
    intent: 'promptConfirmChoiceBoth',
    initialData: {
      masterError: null,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: null,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        getUserPhoneNumberStep: 0,
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
    name: 'Choose both Email and Text',
    steps: [
      [
        null,
        `Would you like to receive this confirmation code via email, text message, or both?\n\n   1. Email\n   2. Text message\n   3. Both\n   4. No need at all`
      ],
      ['yes, both email and text', null]
    ]
  },

  {
    expectedResult: {
      masterError: null,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: null,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        getUserPhoneNumberStep: 0,
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
    expectedStatus: 'complete',
    intent: 'promptConfirmChoiceNone',
    initialData: {
      masterError: null,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: null,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        getUserPhoneNumberStep: 0,
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
    name: 'Choose None',
    steps: [
      [
        null,
        `Would you like to receive this confirmation code via email, text message, or both?\n\n   1. Email\n   2. Text message\n   3. Both\n   4. No need at all`
      ],
      ['none', `Ok sounds good, you're all set then!`]
    ]
  },
  {
    expectedResult: undefined,
    expectedStatus: 'complete',
    initialData: {
      masterError: null,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: null,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        getUserPhoneNumberStep: 0,
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
        `Would you like to receive this confirmation code via email, text message, or both?\n\n   1. Email\n   2. Text message\n   3. Both\n   4. No need at all`
      ],
      [
        'haha',
        `Hmm, I'm not sure what you meant. Do you prefer to receive your confirmation code via email, text message, or both?\n\n   1. Email\n   2. Text message\n   3. Both\n   4. No need at all`
      ]
    ]
  },
  {
    expectedResult: {
      masterError: true,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: -1,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        getUserPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 2,
        confirmEmailStep: 0,
        confirmPhoneStep: 0
      }
    },
    intent: 'NONE',
    expectedStatus: 'complete',
    initialData: {
      masterError: null,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: null,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        getUserPhoneNumberStep: 0,
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
    name: 'Error input more than 2 times',
    steps: [
      [
        null,
        `Would you like to receive this confirmation code via email, text message, or both?\n\n   1. Email\n   2. Text message\n   3. Both\n   4. No need at all`
      ],
      [
        `hha`,
        `Hmm, I'm not sure what you meant. Do you prefer to receive your confirmation code via email, text message, or both?\n\n   1. Email\n   2. Text message\n   3. Both\n   4. No need at all`
      ],

      [
        'secondError',
        `Hmm, I'm having a hard time understanding you. Sorry about that! Please visit our Help Centre or give us a call at 123-456-7890.`
      ]
    ]
  }
];
