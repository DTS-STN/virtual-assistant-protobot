module.exports = [
  {
    expectedResult: {
      masterError: null,
      preferredEmail: true,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: true,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: true,
      confirmCallbackPhoneNumberStep: true,
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
    intent: 'None',
    initialData: {
      masterError: null,
      preferredEmail: true,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: true,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: false,
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
    name: 'Initial the getUserEmail dialog successful',
    steps: [
      [
        null,
        `No problem, let's update your profile. What's your new email address?`
      ],
      ['test@test1.com', `Ok, I'll email your confirmation code to [EMAIL].`]
    ]
  },
  {
    expectedResult: undefined,
    intent: 'None',
    expectedStatus: 'complete',
    initialData: {
      masterError: null,
      preferredEmail: true,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: true,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: false,
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
    name: 'Input wrong format email address',
    steps: [
      [
        null,
        `No problem, let's update your profile. What's your new email address?`
      ],
      [
        'testtest1.com',
        `Oops, looks like the email address you entered isn’t formatted correctly (here’s an example: name@mail.com). Let’s try again.`
      ]
    ]
  },

  {
    expectedResult: {
      masterError: null,
      preferredEmail: true,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: true,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: true,
      confirmCallbackPhoneNumberStep: true,
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
    intent: 'None',
    initialData: {
      masterError: null,
      preferredEmail: true,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: true,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: false,
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
    name: 'enter correct user email address',
    steps: [
      [
        null,
        `No problem, let's update your profile. What's your new email address?`
      ],
      ['test@test1.com', `Ok, I'll email your confirmation code to [EMAIL].`]
    ]
  },
  {
    expectedResult: undefined,
    expectedStatus: 'complete',
    intent: 'None',
    initialData: {
      masterError: null,
      preferredEmail: true,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: true,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: false,
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
    name: 'input invalid user email address once',
    steps: [
      [
        null,
        `No problem, let's update your profile. What's your new email address?`
      ],
      [
        'testtest1.com',
        `Oops, looks like the email address you entered isn’t formatted correctly (here’s an example: name@mail.com). Let’s try again.`
      ]
    ]
  },
  {
    expectedResult: undefined,
    intent: 'NONE',
    expectedStatus: 'complete',
    initialData: {
      masterError: null,
      preferredEmail: true,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: true,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: false,
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
    name: 'input invalid email address more than 2 times',
    steps: [
      [
        null,
        `No problem, let's update your profile. What's your new email address?`
      ],

      [
        `hha`,
        `Oops, looks like the email address you entered isn’t formatted correctly (here’s an example: name@mail.com). Let’s try again.`
      ],
      [
        `hahaha`,
        `Looks like the email addresses you've entered aren't the correct format. Please double check your email before continuing. Do you want to try again? (1) Yes please! or (2) No thanks`
      ]
    ]
  }
];
