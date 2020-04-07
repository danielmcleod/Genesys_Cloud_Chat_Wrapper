import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {formValues: {}, validFields: [], validationMessage: ''};
    }

    startChat(){
        const formValues = this.state.formValues;
        const validFields = this.state.validFields;
        const formFields = this.props.formFields;
        let validationMessage = '';

        let isValid = true;
        for (let i in formFields) {
            if(formFields[i].isRequired){
                const f = formFields[i];
                const valid = validFields.indexOf(f.name) !== -1;
                if(!valid){
                    validationMessage += f.validationMessage || '';
                    isValid = false;
                }
            }
        }

        if(!isValid){
            this.setState({validationMessage})
        }
        else {
            this.props.startChat(formValues);
        }
    }

    handleChange(e, length, label, isRequired) {
        let {formValues,validFields,validationMessage} = this.state;

        const name = e.target.name;
        const value = e.target.value;
        let isValid = true;
        if(isRequired || value.length > 0){
            if(name === 'email'){
                isValid = this.validateEmail(value);
            }
            else if(name === 'phone'){
                isValid = value.length === 10;
            }
            else if(length > 0){
                isValid = value.length === length;
            }
            else {
                isValid = value.length > 0;
            }
        }

        formValues[name] = {value,label};
        const arrIndex = validFields.indexOf(name);
        if(isValid){
            validationMessage = '';
            if(arrIndex === -1){
                validFields.push(name);
            }
        } else {
            if(arrIndex !== -1){
                validFields.splice(arrIndex, 1)
            }
        }

        this.setState({formValues, validFields, validationMessage});
    }

    handleSelectChange(e, label, isRequired){
        let {formValues,validFields,validationMessage} = this.state;

        const name = e.target.name;
        const value = e.target.value;
        let isValid = true;
        if(isRequired || value.length > 0){
            isValid = value.length > 0;
        }

        formValues[name] = {value,label};
        const arrIndex = validFields.indexOf(name);
        if(isValid){
            validationMessage = '';
            if(arrIndex === -1){
                validFields.push(name);
            }
        } else {
            if(arrIndex !== -1){
                validFields.splice(arrIndex, 1)
            }
        }

        this.setState({formValues, validFields, validationMessage});
    }

    validateEmail(email){
        const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>().,;\s@"]+\.)+[^<>().,;:\s@"]{2,})$/;
        return re.exec(email);
    }

    render() {
        const {formValues, validationMessage} = this.state;
        const {style,settings,formFields} = this.props;

        return (
            <div className="gc-chat-form">
                <strong>{settings.chatFormText}</strong>
                <br/>
                <br/>

                <div>
                    {(formFields || null) !== null &&
                    formFields.map((item,index) =>
                        <div key={'form-field-'+index}>
                            <label>{item.label} {item.isRequired ? '*' : ''}</label>
                            {item.type === 'select' ? (
                                <select name={item.name} onChange={(e) => this.handleSelectChange(e,item.label,item.isRequired)}>
                                    <option value="">-- SELECT ONE --</option>
                                    {item.options.map((option,i) =>
                                    <option key={'form-option-' + item.name + '-' + i} value={option}>{option}</option>
                                    )}
                                </select>
                            ) : (
                                <input onChange={(e) => this.handleChange(e,item.length||0,item.label,item.isRequired)} name={item.name} type={item.type} maxLength={item.length || 250} placeholder={item.placeholder} value={(formValues[item.name] || null) !== null ? formValues[item.name].value : ''} />
                            )}
                        </div>
                    )}
                </div>

                {validationMessage.length > 0 &&
                <div className="pc-validation-error">{validationMessage}</div>
                }
                <button style={style} onClick={() => this.startChat()}>{settings.chatFormButtonText}</button>
            </div>
        );
    }
}

export default Form;