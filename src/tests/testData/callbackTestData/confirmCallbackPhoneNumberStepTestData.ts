module.exports = [
  {
    expectedResult: {
      masterError: null,
      confirmCallbackPhoneNumberStep: true,
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
    expectedStatus: 'complete',
    intent: 'promptConfirmYes',
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
    name: 'confirm Yes',
    steps: [
      [
        null,
        `Ok, is 123-654-0987 still the best phone number to reach you? (1) Yes or (2) No`
      ],
      [
        'Yes, correct',
        'Great! A Service Canada representative will call you within the next 48 hours, between 9 a.m. and 5 p.m. (EST).'
      ]
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
    name: 'Choose No',
    steps: [
      [
        null,
        `Ok, is 123-654-0987 still the best phone number to reach you? (1) Yes or (2) No`
      ],
      [
        'Yes, correct',
        `No problem , let's update your profile.  What's your new phone number?`
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
        `Ok, is 123-654-0987 still the best phone number to reach you? (1) Yes or (2) No`
      ],
      [
        'haha',
        `Hmm, I'm not sure what you meant. Is 123-654-0987 still the best phone number to reach you? (1) Yes or (2) No`
      ]
    ]
  },
  {
    expectedResult: {
      masterError: true,
      confirmCallbackPhoneNumberStep: -1,
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
        confirmCallbackPhoneNumberStep: 2,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
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
    name: ' Master Error input more than 2 times',
    steps: [
      [
        null,
        `Ok, is 123-654-0987 still the best phone number to reach you? (1) Yes or (2) No`
      ],
      [
        'haha',
        `Hmm, I'm not sure what you meant. Is 123-654-0987 still the best phone number to reach you? (1) Yes or (2) No`
      ],

      [
        'secondError',
        `Hmm, I'm having a hard time understanding you. Sorry about that! Please visit our Help Centre or give us a call at 123-456-7890.`
      ]
    ]
  }
];
