import React, { Component } from 'react';
import 'whatwg-fetch';

class Callback extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoading: false, name: '', email: '', phone: '', message: '', nameIsValid: false, emailIsValid: false, phoneIsValid: false, messageIsValid: false, validationMessage: '', isSubmitted: false, hasError: false};
        this.submitMessage = this.submitMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submit(method, url, requestData, callback){
        let errorMessage = "";

        function checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
                return response
            } else {
                let error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }

        function parseJSON(response) {
            return response.json()
        }

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestData != null ? JSON.stringify(requestData) : undefined
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(function(data) {
                if(data.success){
                    callback(data);
                } else {
                    errorMessage = 'Unsuccessful';
                }
            })
            .catch(function(error) {
                errorMessage = error.message;
            })
            .then(function(e) {
                if(errorMessage.length > 0){
                    this.setState({hasError: true, isLoading: false, isSubmitted: true });
                }
            }.bind(this))
    }

    submitMessage(){
        const url = this.props.postUrl;
        const nameIsValid = this.state.nameIsValid;
        const emailIsValid = this.state.emailIsValid;
        const phoneIsValid = this.state.phoneIsValid;
        const messageIsValid = this.state.messageIsValid;

        let validationMessage = '';

        if(!nameIsValid){
            validationMessage = 'Please enter your Name';
        }
        else if(!phoneIsValid){
            validationMessage = 'Please enter your Phone #';
        }
        else if(!emailIsValid){
            validationMessage = 'Please enter a valid Email';
        }
        else if(!messageIsValid){
            validationMessage = 'Please enter a Message';
        }

        if(validationMessage.length > 0){
            this.setState({validationMessage: validationMessage});
        }
        else {
            const name = this.state.name;
            const email = this.state.email;
            const phone = this.state.phone;
            const message = this.state.message;
            const scriptId = this.props.scriptId;
            const queueId = this.props.queueId;
            const currentUrl = window.location.href;
            const requestData = {name: name, phone: phone,email: email,message: message, url: currentUrl, scriptId: scriptId, queueId: queueId};
            this.setState({isLoading: true}, () => this.submit('POST', url, requestData, this.messageSubmitted.bind(this)));
        }
    }

    messageSubmitted(data){
        this.setState({isLoading: false, hasError: false, isSubmitted: true});
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        let isValid = false;
        if(name === 'email'){
            isValid = this.validateEmail(value);
        }
        else if(name === 'phone'){
            isValid = value.length === 10;
        }
        else {
            isValid = value.length > 0;
        }

        this.setState({[name]: value, [name + 'IsValid']: isValid});
    }

    validateEmail(email){
        const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>().,;\s@"]+\.{0,1})+[^<>().,;:\s@"]{2,})$/;
        return re.exec(email);
    }

    render() {
        const name = this.state.name;
        const email = this.state.email;
        const phone = this.state.phone;
        const message = this.state.message;
        const isLoading = this.state.isLoading;
        const validationMessage = this.state.validationMessage;
        const isSubmitted = this.state.isSubmitted;
        const hasError = this.state.hasError;
        const submittedMessage = this.props.submittedMessage;
        const submitErrorMessage = this.props.submitErrorMessage;
        const style = this.props.style;

        return (
            <div className="gc-chat-callback">
                {isLoading &&
                <div className="gc-chat-loader"></div>
                }
                {!isLoading && !isSubmitted &&
                <div>
                    <label>Name *</label>
                    <input onChange={this.handleChange} name="name" type="text" placeholder="First Last" value={name} />
                    <label>Phone *</label>
                    <input onChange={this.handleChange} name="phone" type="text" maxLength={10} placeholder="10 digit phone #" value={phone} />
                    <label>Email *</label>
                    <input onChange={this.handleChange} name="email" type="email" placeholder="example@domain.com" value={email} />
                    <label>Message *</label>
                    <textarea onChange={this.handleChange} name="message" placeholder="Type your message here..." value={message}></textarea>
                    {validationMessage.length > 0 &&
                    <div className="pc-validation-error">{validationMessage}</div>
                    }
                    <button style={style} onClick={this.submitMessage}>Send Message</button>
                </div>
                }
                {isSubmitted &&
                <div>
                    {hasError ? (
                        <strong>{submitErrorMessage}</strong>
                    ) : (
                        <strong>{submittedMessage}</strong>
                    )}
                </div>
                }
            </div>
        );
    }
}

export default Callback;