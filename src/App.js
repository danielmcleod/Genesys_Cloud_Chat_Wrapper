import React, { Component } from 'react';
import './App.css';
import Launcher from "./Components/Launcher";
import Container from "./Components/Container";
import moment from 'moment-timezone';
import Helmet from 'react-helmet';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLaunched: false,
            isChatAvailable: false,
            resumeChat: false,
            settings: null,
            formFields: [],
            chatLoaded: false,
            isCollapsed: false,
            schedule: {},
            theme: {},
            submittedMessage: '',
            submitErrorMessage: '',
            cssUrl: null,
            postUrl: null,
            hasChatEnded: false
        };
    }

    componentDidMount() {
        const defaultHeaderText = 'Chat';
        const defaultChatButtonText = 'Chat with us!';
        const defaultClosedButtonText = 'Leave us a message';
        const defaultResetChatTextSmall = 'Need Additional Help?';
        const defaultResetChatTextLarge = 'START NEW CHAT';
        const defaultQueue = 'Chat';
        // const defaultSkills = [];
        // const defaultPriority = 0;
        const defaultWelcomeMessage = 'Ask us anything. We are here to help.';
        const defaultParams = {};
        const defaultTheme = {background: '#000000', text: '#ffffff'};
        const defaultLogoUrl = "";
        const defaultSubmittedMessage = "Your message has been received. We'll contact you soon.";
        const defaultSubmitErrorMessage = "We were unable to send your message. Please call or email us for further assistance.";
        const defaultChatFormText = "Please provide the following information";
        const defaultChatFormButtonText = "Start Chat";
        const defaultReconnectEnabled = false;
        const defaultReconnectOrigins = [];
        const defaultRegion = "us-east-1";
        const defaultShowSubmitButton = false;

        const settings = window.PureCloudChat || null;
        const config = settings !== null ? settings.config || {} : {};

        const orgId = config.orgId || null;
        const orgName = config.orgName || null;
        const orgGuid = config.orgGuid || null;
        const deploymentKey = config.deploymentKey || null;

        if(orgId !== null && orgName !== null && orgGuid !== null && deploymentKey !== null){
            const headerText = config.headerText || defaultHeaderText;
            const chatButtonText = config.chatButtonText || defaultChatButtonText;
            const closedButtonText = config.closedButtonText || defaultClosedButtonText;
            const queue = config.queue || defaultQueue;
            const resetChatTextSmall = config.resetChatTextSmall || defaultResetChatTextSmall;
            const resetChatTextLarge = config.resetChatTextLarge || defaultResetChatTextLarge;
            // const skills = config.skills || defaultSkills;
            // const priority = config.priority || defaultPriority;
            const welcomeMessage = config.welcomeMessage || defaultWelcomeMessage;
            const params = config.params || defaultParams;
            const logoUrl = config.logoUrl || defaultLogoUrl;
            const bigLogoUrl = config.bigLogoUrl || defaultLogoUrl;
            const submittedMessage = config.submittedMessage || defaultSubmittedMessage;
            const submitErrorMessage = config.submitErrorMessage || defaultSubmitErrorMessage;
            const chatFormText = config.chatFormText || defaultChatFormText;
            const chatFormButtonText = config.chatFormButtonText || defaultChatFormButtonText;
            const reconnectEnabled = config.reconnectEnabled || defaultReconnectEnabled;
            const reconnectOrigins = config.reconnectOrigins || defaultReconnectOrigins;
            const region = config.region || defaultRegion;
            const showSubmitButton = config.showSubmitButton || defaultShowSubmitButton;

            const chatSettings = {
                orgId: orgId,
                orgName: orgName,
                orgGuid: orgGuid,
                deploymentKey: deploymentKey,
                headerText: headerText,
                chatButtonText: chatButtonText,
                closedButtonText: closedButtonText,
                queue: queue,
                resetChatTextSmall: resetChatTextSmall,
                resetChatTextLarge:resetChatTextLarge,
                // skills: skills,
                // priority: priority,
                welcomeMessage: welcomeMessage,
                params: params,
                logoUrl: logoUrl,
                bigLogoUrl: bigLogoUrl,
                chatFormText: chatFormText,
                chatFormButtonText: chatFormButtonText,
                reconnectEnabled: reconnectEnabled,
                reconnectOrigins: reconnectOrigins,
                region: region,
                showSubmitButton: showSubmitButton
            };

            const formFields = settings !== null ? settings.formFields || [] : [];

            const schedule = settings !== null ? settings.schedule || {} : {};

            const theme = settings !== null ? settings.theme || defaultTheme : defaultTheme;
            const cssUrl = settings !== null ? settings.cssUrl || null : null;
            const postUrl = settings !== null ? settings.postUrl || null : null;
            this.setState({
                settings: chatSettings,
                formFields: formFields,
                schedule: schedule,
                theme: theme,
                submittedMessage: submittedMessage,
                submitErrorMessage: submitErrorMessage,
                cssUrl: cssUrl,
                postUrl: postUrl
            }, () => this.checkAvailability());
        }
    }

    checkAvailability(){
        const isChatAvailable = this.state.isChatAvailable;
        const isAvailable = this.checkSchedule();
        console.log("Chat Available: " + isAvailable);
        if(isChatAvailable !== isAvailable){
            this.setState({isChatAvailable: isAvailable});
        }
    }

    checkSchedule() {
        const schedule = this.state.schedule;
        const date = moment().tz("America/New_York"); //todo: timezone hardcoded to Eastern
        console.log("DateTime: " + date);
        const day = date.format('dddd').toLowerCase();
        const todaysSchedule = schedule[day] || null;
        const holidays = schedule['holidays'] || null;
        const formattedDate = date.format("YYYY-MM-DD");

        if(holidays != null){
            const isHoliday = holidays.indexOf(formattedDate) >= 0;
            if(isHoliday){
                return false;
            }
        }

        if(todaysSchedule !== null){
            const open = todaysSchedule['open'] || null;
            const close = todaysSchedule['close'] || null;
            if(open !== null && close !== null){
                const o = parseInt(open.replace(':', ''));
                const c = parseInt(close.replace(':', ''));
                if(!isNaN(o) && !isNaN(c)){
                    const time = parseInt(date.format('Hmm'));
                    if(!isNaN(time) && time >= o && time <= c){
                        return true;
                    }
                }
            }
        }

        return false;
    }

    launch() {
        const isChatAvailable = this.state.isChatAvailable;
        const isAvailable = this.checkSchedule();
        if(isChatAvailable !== isAvailable){
            this.setState({isChatAvailable: isAvailable, isLaunched: true});
        }
        else{
            this.setState({isLaunched: true});
        }
    }

    collapse() {
        const chatLoaded = this.state.chatLoaded;
        if(chatLoaded){
            this.setState({isCollapsed: true});
        } else {
            this.setState({isLaunched: false});
        }
    }

    show() {
        this.setState({isCollapsed: false});
    }

    chatLoaded(){
        this.setState({chatLoaded: true});
    }

    resetChat(){
        this.setState({
            isLaunched: false,
            chatLoaded: false,
            hasChatEnded: false
        });
    }

    restartChat(){
        this.setState({
            isLaunched: false,
            chatLoaded: false,
            hasChatEnded: false
        }, () => this.launch());
    }

      render() {
          const isLaunched = this.state.isLaunched;
          const isChatAvailable = this.state.isChatAvailable;
          const resumeChat = this.state.resumeChat;
          const settings = this.state.settings;
          const formFields = this.state.formFields;
          const isCollapsed = this.state.isCollapsed;
          const theme = this.state.theme;
          const cssUrl = this.state.cssUrl;
          const postUrl = this.state.postUrl;
          const scriptId = this.state.scriptId;
          const queueId = this.state.queueId;
          const submittedMessage = this.state.submittedMessage;
          const submitErrorMessage = this.state.submitErrorMessage;
          const hasChatEnded = this.state.hasChatEnded;

          if(settings === null || !isChatAvailable){
              return null;
          }

          return (
          <div className="gc-chat-app" style={{display: 'none'}}>
              <div id="empty-chat-frame"></div>
              {cssUrl !== null &&
              <Helmet link={[{rel: "stylesheet", href: cssUrl}]} />
              }
              {!isLaunched ? (
                  <Launcher onClick={() => this.launch()} isChatAvailable={isChatAvailable} chatButtonText={settings.chatButtonText} closedButtonText={settings.closedButtonText} theme={theme} />
              ) : (
                <div>
                    <Launcher className={isCollapsed ? 'gc-chat-show' : 'gc-chat-hide'} onClick={() => this.show()} isChatAvailable={isChatAvailable} chatButtonText={settings.chatButtonText} closedButtonText={settings.closedButtonText} theme={theme} />
                    <Container className={isCollapsed ? 'gc-chat-hide' : 'gc-chat-show'} isChatAvailable={isChatAvailable} resumeChat={resumeChat} hasChatEnded={hasChatEnded} chatDisconnected={() => this.setState({hasChatEnded: true})} collapse={() => this.collapse()} settings={settings} formFields={formFields} chatLoaded={() => this.chatLoaded()} theme={theme} postUrl={postUrl} scriptId={scriptId} queueId={queueId} submittedMessage={submittedMessage} submitErrorMessage={submitErrorMessage} resetChat={() => this.resetChat()} restartChat={() => this.restartChat()} />
                </div>
              )}
          </div>
        );
      }
}

export default App;