import React, { Component } from 'react';
import chatIcon from '../Resources/pc-chat.png';
import msgIcon from '../Resources/pc-message.png';

class Launcher extends Component {
    render() {
        const isChatAvailable = this.props.isChatAvailable;
        const chatButtonText = this.props.chatButtonText;
        const closedButtonText = this.props.closedButtonText;
        const className = this.props.className || '';
        const theme = this.props.theme;
        let style = {};
        if((theme.background || null) !== null && (theme.text || null) !== null){
            style = {backgroundColor: theme.background, color: theme.text};
        }

        return (
            <div className={'gc-chat-fixed ' + className}>
                <div className="gc-chat-launcher" onClick={this.props.onClick} style={style} >
                <span>
                {isChatAvailable ? (
                    <img src={chatIcon} alt=""/>
                ) : (
                    <img src={msgIcon} alt=""/>
                )}
                </span>
                    {isChatAvailable ? (
                        <span>{chatButtonText}</span>
                    ) : (
                        <span>{closedButtonText}</span>
                    )}
                </div>
            </div>
        );
    }
}

export default Launcher;