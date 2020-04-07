import React from 'react';
import Chat from "./Chat";
// import Callback from "./Callback";
import { useMediaQuery } from 'react-responsive'

const Container = (props) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isMobileDevice = useMediaQuery({ maxDeviceWidth: 767 });

    const isChatAvailable = props.isChatAvailable;
    const settings = props.settings;
    const className = props.className;
    const theme = props.theme;
    // const postUrl = props.postUrl;
    // const scriptId = props.scriptId;
    // const queueId = props.queueId;
    // const submittedMessage = props.submittedMessage;
    // const submitErrorMessage = props.submitErrorMessage;

    let style = {};
    let border = {};
    if((theme.background || null) !== null && (theme.text || null) !== null){
        style = {backgroundColor: theme.background, color: theme.text};
        border = {borderColor: theme.background};
    }

    const resetChatStyle = {
        position: 'absolute', top: 40, right: 0, left: 0,
        backgroundColor: '#4caf50',
        padding: 6,
        fontSize: 10,
        fontWeight: 600,
        margin: 'auto',
        width: 110,
        textAlign: 'center',
        cursor: 'pointer',
        opacity: '.85'
    };

    return (
        <div className={(isMobile || isMobileDevice) ? 'gc-chat-mobile ' + className: 'gc-chat-fixed ' + className}>
            <div className="gc-chat-container">
                <div className="gc-chat-header" style={style}>
                    <div className="gc-chat-header-text">
                        {settings.headerText}
                    </div>
                    {props.hasChatEnded &&
                    <div className="gc-chat-restart" onClick={() => props.restartChat()} style={resetChatStyle}><div style={{display:'block',fontSize: 7,marginBottom: 1}}>{settings.resetChatTextSmall}</div>{settings.resetChatTextLarge}</div>
                    }
                    <div className="gc-chat-collapse" onClick={() => props.collapse()} title="Close">
                        &#8211;
                    </div>
                </div>
                <div className="gc-chat-body" style={border}>
                    {isChatAvailable &&
                    <Chat formFields={props.formFields}
                          style={style}
                          settings={settings}
                          chatLoaded={() => props.chatLoaded()}
                          resetChat={() => props.resetChat()}
                          resumeChat={props.resumeChat}
                          chatDisconnected={() => props.chatDisconnected()}
                    />
                    }

                    {/*{isChatAvailable ? (*/}
                    {/*    <Chat formFields={props.formFields} style={style} settings={settings} chatLoaded={() => props.chatLoaded()} resetChat={() => props.resetChat()} resumeChat={props.resumeChat}/>*/}
                    {/*) : (*/}
                    {/*    <Callback style={style} postUrl={postUrl} scriptId={scriptId} queueId={queueId} submittedMessage={submittedMessage} submitErrorMessage={submitErrorMessage} />*/}
                    {/*)}*/}
                </div>
            </div>
        </div>
    );
}

export default Container;