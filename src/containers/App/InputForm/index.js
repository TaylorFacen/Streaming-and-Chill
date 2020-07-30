import React, { Component } from 'react';
import { Form, ProgressBar } from 'react-bootstrap';

import BingeGenreForm from './BingeGenreForm';
import BingePeriodForm from './BingePeriodForm';
import BingeSettingsForm from './BingeSettingsForm';
import PlatformForm from './PlatformForm';

import './InputForm.css';

class InputForm extends Component {
    state = {
        displayBingePeriodForm: true,
        displayPlatformForm: false,
        displayBingeGenreForm: false,
        displayBingeSettingsForm: false,
        progress: 0,
        dayCount: 0,
        hourCount: 0,
        badMovieBinge: false,
        genrePreferences: {
            likes: [],
            dislikes: []
        },
        dealbreaker: false,
        hasPlatforms: {
            disney: false,
            hulu: false,
            netflix: false,
            prime: false
        }
    }

    onSubmitBingePeriodForm = () => {
        this.setState({
            displayBingePeriodForm: false,
            displayPlatformForm: true,
            displayBingeGenreForm: false,
            displayBingeSettingsForm: false,
            progress: 1/4
        })
    }

    onSubmitPlatformForm = () => {
        this.setState({
            displayBingePeriodForm: false,
            displayPlatformForm: false,
            displayBingeGenreForm: true,
            displayBingeSettingsForm: false,
            progress: 2/4
        })
    }

    onSubmitBingeGenreForm = () => {
        this.setState({
            displayBingePeriodForm: false,
            displayPlatformForm: false,
            displayBingeGenreForm: false,
            displayBingeSettingsForm: true,
            progress: 3/4
        })
    }

    onSubmitForm = e => {
        e.preventDefault();

        this.setState({
            displayBingePeriodForm: false,
            displayPlatformForm: false,
            displayBingeGenreForm: false,
            displayBingeSettingsForm: false,
            progress: 4/4
        })

        const { dayCount, hourCount, badMovieBinge, genrePreferences, dealbreaker, hasPlatforms} = this.state;

        const data = {
            timeChunks: Array.from(hourCount.toString().repeat(dayCount)).map(num => parseInt(num) * 60),
            badMovieBinge,
            genrePreferences,
            genreDealbreaker: dealbreaker,
            hasPlatforms
        }

        fetch("http://localhost:5000/api/schedule", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    goBackToBingePeriodForm = () => {
        this.setState({
            displayBingePeriodForm: true,
            displayPlatformForm: false,
            displayBingeGenreForm: false,
            displayBingeSettingsForm: false,
            progress: 0
        })
    }

    goBackToPlatformForm = () => {
        this.setState({
            displayBingePeriodForm: false,
            displayPlatformForm: true,
            displayBingeGenreForm: false,
            displayBingeSettingsForm: false,
            progress: 1/4
        })
    }

    goBacktoBingeGenreForm = () => {
        this.setState({
            displayBingePeriodForm: false,
            displayPlatformForm: false,
            displayBingeGenreForm: true,
            displayBingeSettingsForm: false,
            progress: 2/4
        })
    }

    onInputFieldChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onBadMovieToggleChange = value => {
        this.setState({
            badMovieBinge: value
        })
    }

    onDealbreakerToggleChange = value => {
        this.setState({
            dealbreaker: value
        })
    }

    togglePlatform = platform => {
        this.setState(prevState => {
            const { hasPlatforms } = prevState;
            hasPlatforms[platform] = !hasPlatforms[platform];
            return ({ hasPlatforms })
        })
    }

    addPreference = ( genre, prefType ) => {
        this.setState(prevState => {
            const { genrePreferences } = prevState;

            // Reset
            genrePreferences['likes'] = genrePreferences['likes'].filter(g => g !== genre )
            genrePreferences['dislikes'] = genrePreferences['dislikes'].filter(g => g !== genre )

            if ( prefType === 'like' ) {
                genrePreferences['likes'].push(genre)
            } else if ( prefType === 'dislike' ) {
                genrePreferences['dislikes'].push(genre)
            }

            return ({ genrePreferences })
        })
    }

    render(){
        const { displayBingePeriodForm, displayPlatformForm, displayBingeGenreForm, displayBingeSettingsForm, progress } = this.state;
        const { badMovieBinge, dayCount, dealbreaker, genrePreferences, hourCount, hasPlatforms } = this.state;
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
                            hasPlatforms = { hasPlatforms }
                            togglePlatform = { this.togglePlatform.bind(this) }
                        />
                    ) : null }
                    { displayBingeGenreForm ? (
                        <BingeGenreForm 
                            addPreference = { this.addPreference.bind(this) }
                            onSubmit = { this.onSubmitBingeGenreForm.bind(this) }
                            goBack = { this.goBackToPlatformForm.bind(this) }
                            genrePreferences = { genrePreferences }
                            deakbreaker = { dealbreaker }
                            onDealbreakerToggleChange = { this.onDealbreakerToggleChange.bind(this) }
                        />
                    ) : null }
                    { displayBingeSettingsForm ? (
                        <BingeSettingsForm 
                            badMovieBinge = { badMovieBinge }
                            goBack = { this.goBacktoBingeGenreForm.bind(this) }
                            onBadMovieToggleChange = { this.onBadMovieToggleChange.bind(this) }
                        />
                    ) : null }
                </Form>
            </div>
        )
    }
}

export default InputForm;