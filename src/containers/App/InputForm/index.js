import React, { Component } from 'react';
import { Form, ProgressBar } from 'react-bootstrap';

import BingePeriodForm from './BingePeriodForm';
import BingeThemeForm from './BingeThemeForm';
import PlatformForm from './PlatformForm';

import './InputForm.css';

class InputForm extends Component {
    state = {
        displayBingePeriodForm: true,
        displayPlatformForm: false,
        displayBingeThemeForm: false,
        progress: 1/3,
        dayCount: 0,
        hourCount: 0
    }

    onSubmitBingePeriodForm = () => {
        this.setState({
            displayBingePeriodForm: false,
            displayPlatformForm: true,
            displayBingeThemeForm: false,
            progress: 2/3
        })
    }

    onSubmitPlatformForm = () => {
        this.setState({
            displayBingePeriodForm: false,
            displayPlatformForm: false,
            displayBingeThemeForm: true,
            progress: 3/3
        })
    }

    onSubmitForm = e => {
        e.preventDefault();

        this.setState({
            displayBingePeriodForm: false,
            displayPlatformForm: false,
            displayBingeThemeForm: false
        })
    }

    goBackToBingePeriodForm = () => {
        this.setState({
            displayBingePeriodForm: true,
            displayPlatformForm: false,
            displayBingeThemeForm: false,
            progress: 1/3
        })
    }

    goBackToPlatformForm = () => {
        this.setState({
            displayBingePeriodForm: false,
            displayPlatformForm: true,
            displayBingeThemeForm: false,
            progress: 2/3
        })
    }

    onInputFieldChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        const { displayBingePeriodForm, displayPlatformForm, displayBingeThemeForm, progress } = this.state;
        const { dayCount, hourCount } = this.state;
        return (
            <div className = "InputForm">
                <ProgressBar now = { progress } max = { 1 } />
                <Form onSubmit = { this.onSubmitForm.bind(this) }>
                    { displayBingePeriodForm ? (
                        <BingePeriodForm 
                            dayCount = { dayCount }
                            hourCount = { hourCount }
                            onChange = { this.onInputFieldChange.bind(this) }
                            onSubmit = { this.onSubmitBingePeriodForm.bind(this) }
                        />
                    ) : null }
                    { displayPlatformForm ? (
                        <PlatformForm 
                            onSubmit = { this.onSubmitPlatformForm.bind(this) }
                            goBack = { this.goBackToBingePeriodForm.bind(this) }
                        />
                    ) : null }
                    { displayBingeThemeForm ? (
                        <BingeThemeForm 
                            goBack = { this.goBackToPlatformForm.bind(this) }
                        />
                    ) : null }
                </Form>
            </div>
        )
    }
}

export default InputForm;