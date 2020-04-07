

const schedule = {
    'monday': {open: '08:00', close: '16:30'},
    'tuesday': {open: '08:00', close: '16:30'},
    'wednesday': {open: '08:00', close: '16:30'},
    'thursday': {open: '08:00', close: '16:30'},
    'friday': {open: '08:00', close: '16:30'},
    // 'saturday': {open: '07:00', close: '23:30'},
    // 'sunday': {open: '07:00', close: '23:30'},
    'holidays': [
        // '2017-07-04','2017-09-04','2017-11-23','2017-12-25','2017-12-26','2018-01-01'
    ]
};

window.PureCloudChat = {
    config: {
        //org info
        orgId: 12345, //todo: replace with your orgId
        orgName: 'acme', //todo: replace with your orgName
        orgGuid: '00000000-0000-0000-0000-000000000000', //todo: replace with your orgGuid
        deploymentKey: '00000000-0000-0000-0000-000000000000', //todo: replace with your chat deployment key
        //configurable config changes start here
        queue: 'Chat',
        headerText: 'Chat with us',
        chatButtonText: 'Need Help? Chat Now',
        welcomeMessage: 'Chat with the Upward team!',
        submittedMessage: '',
        submitErrorMessage: '',
        logoUrl: 'URL to a small logo', //todo: update this URL
        reconnectEnabled: true,
        showSubmitButton: true
    },
    theme: {
        background: '#1a5b43',
        text: '#ffffff'
    },
    schedule: schedule,
    // postUrl: 'API action URL to create callback - not currently supported',
    // cssUrl: 'built CSS file URL', // todo: replace with deployed CSS file URL
    formFields: [
        {
            isRequired: true,
            name: 'name',
            label: 'Name',
            placeholder: 'full name..',
            type: 'text',
            validationMessage: 'Please provide your name.'
        },
        {
            isRequired: true,
            name: 'email',
            label: 'Email',
            placeholder: 'email address..',
            type: 'email',
            validationMessage: 'Please enter a valid email address.'
        }
        // ,{
        //   isRequired: false,
        //   name: 'phone',
        //   label: 'Phone',
        //   placeholder: '10 digit phone #..',
        //   type: 'text',
        //   length: 10,
        //   validationMessage: 'Please enter your 10 digit phone #.'
        // },
        // {
        //   isRequired: false,
        //   name: 'customField1',
        //   label: 'Account #',
        //   placeholder: '11 digit account #..',
        //   type: 'text',
        //   length: 11
        // },
        // {
        //   isRequired: true,
        //   name: 'customField2',
        //   label: 'What do you need help with?',
        //   type: 'select',
        //   options: [
        //     'General Questions',
        //     'Team Registration',
        //     'Password Reset'
        //   ],
        //   validationMessage: 'Please let us know what you need help with.'
        // }
    ]
};

const src = 'built JS file URL'; //todo: replace with deployed JS file URL
let scriptTag = document.createElement('script');
scriptTag.setAttribute("type", 'text/javascript');
scriptTag.setAttribute("src", src);
scriptTag.onload = () => console.log('Chat Loaded..');
(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);
