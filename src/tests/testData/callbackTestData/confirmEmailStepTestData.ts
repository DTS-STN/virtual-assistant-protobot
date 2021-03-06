module.exports = [
  {
    expectedResult: {
      masterError: null,
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
      confirmEmailStep: true,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
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
    name: 'confirm Yes, this is the correct email address',
    steps: [
      [
        null,
        `The email address I have for you is test@test.com. Is this the correct email address? (1) Yes or (2) No`
      ],
      ['Yes, correct', `Ok, I'll email your confirmation code to [EMAIL].`]
    ]
  },
  {
    expectedResult: undefined,
    expectedStatus: 'complete',
    intent: 'promptConfirmNo',
    initialData: {
      masterError: null,
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
    name: 'Choose No, not correct email',
    steps: [
      [
        null,
        `The email address I have for you is test@test.com. Is this the correct email address? (1) Yes or (2) No`
      ],
      [
        'no, not correct',
        `No problem, let's update your profile. What's your new email address?`
      ]
    ]
  },

  {
    expectedResult: undefined,
    expectedStatus: 'complete',
    intent: 'None',
    initialData: {
      masterError: null,
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
        `The email address I have for you is test@test.com. Is this the correct email address? (1) Yes or (2) No`
      ],
      [
        'haha',
        `Hmm, I'm not sure what you meant. Is this the correct email address? (1) Yes or (2) No`
      ]
    ]
  },
  {
    expectedResult: {
      masterError: true,
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
      confirmEmailStep: -1,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        getUserPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackPhoneNumberStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 2,
        confirmPhoneStep: 0
      }
    },
    intent: 'NONE',
    expectedStatus: 'complete',
    initialData: {
      masterError: null,
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
    name: 'Master Error input more than 2 times',
    steps: [
      [
        null,
        `The email address I have for you is test@test.com. Is this the correct email address? (1) Yes or (2) No`
      ],
      [
        'haha',
        `Hmm, I'm not sure what you meant. Is this the correct email address? (1) Yes or (2) No`
      ],

      [
        'secondError',
        `Hmm, I'm having a hard time understanding you. Sorry about that! Please visit our Help Centre or give us a call at 123-456-7890.`
      ]
    ]
  }
];
