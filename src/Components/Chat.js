/*global ININ*/
import React, { Component } from 'react';
import Form from './Form';
import {getChatConfig, loadChatIfNotLoaded} from '../util'

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoading: true, showForm: false, formData: null};
    }

    componentDidMount() {
        this.loadChat(false);
    }

    startChat(data){
        const d = data || {};
        let formData = {};
        if((d.name || null) !== null){
            const nameArr = d.name.value.split(" ");
            formData['firstName'] = nameArr[0] || ""
            formData['lastName'] = nameArr[1] || ""
        }
        if((d.phone || null) !== null){
            formData['phoneNumber'] = d.phone.value
        }
        if((d.email || null) !== null){
            formData['email'] = d.email.value
        }
        if((d.customField1 || null) !== null){
            formData['customField1'] = d.customField1.value
            formData['customField1Label'] = d.customField1.label
        }
        if((d.customField2 || null) !== null){
            formData['customField2'] = d.customField2.value
            formData['customField2Label'] = d.customField2.label
        }
        if((d.customField3 || null) !== null){
            formData['customField3'] = d.customField3.value
            formData['customField3Label'] = d.customField3.label
        }

        this.setState({isLoading: true, showForm: false, formData: formData}, () => this.loadChat(true));
    }

    loadChat(loadNewChat){
        // loadChatIfNotLoaded(this.chatCode.bind(this), this.props.settings)
        loadChatIfNotLoaded(() => this.chatCode(loadNewChat), this.props.settings)
    }

    chatCode(loadNewChat){
        const settings = this.props.settings;
        const data = this.state.formData;
        const chatConfig = getChatConfig(settings,data);
        let showForm = this.state.showForm;

        window.PURECLOUD_WEBCHAT_FRAME_CONFIG = {
            containerEl: 'PureCloudChatContainer'
        };
        ININ.webchat.create(chatConfig)
            .then(function (webchat) {

            if (webchat.isAutoJoined()) {
                console.log("existing chat..")
                showForm = false;
            }
            else {
                // Render to frame
                if(loadNewChat){
                    console.log("new chat..")
                    webchat.renderFrame({
                        containerEl: 'PureCloudChatContainer'
                    });
                } else{
                    showForm = true;
                }
            }

            // webchat.chatStarted = function () {
            //     //Code to run when the chat is started
            //     console.log("chat started..")
            // };
            //
            // webchat.chatConnectedToAgent = function () {
            //     //Code to run when the chat is connected to an agent
            //     console.log("chat connected..")
            // };
            //
            webchat.chatEnded = () => this.props.chatDisconnected();

            this.setState({isLoading: false, showForm},() => this.props.chatLoaded());
        }.bind(this))
        .catch(function (err){
            console.log(err);
        });
    }

    resetChat(){
        this.setState({isLoading: false, showForm: true, formData: null},() => this.props.resetChat());
    }

    render() {
        const isLoading = this.state.isLoading;
        const showForm = this.state.showForm;
        const style = this.props.style;
        const settings = this.props.settings;
        const formFields = this.props.formFields;

        return (
            <div className="gc-chat-wrapper">
                {isLoading &&
                <div className="gc-chat-loader"></div>
                }
                {/*{showForm ? (*/}
                    {/*<Form style={style} formFields={formFields} startChat={(data) => this.startChat(data)} settings={settings} resetChat={() => this.resetChat()} />*/}
                {/*) : (*/}
                    {/*<div id="PureCloudChatContainer"></div>*/}
                {/*)}*/}
                {showForm &&
                <Form style={style} formFields={formFields} startChat={(data) => this.startChat(data)}
                      settings={settings} resetChat={() => this.resetChat()}/>
                }
                <div id="PureCloudChatContainer"></div>
            </div>
        );
    }
}

export default Chat;