import React, { Component } from 'react';
import { Form, ProgressBar, Spinner } from 'react-bootstrap';

import BingeGenreForm from './BingeGenreForm';
import BingePeriodForm from './BingePeriodForm';
import BingeSchedule from './BingeSchedule';
import BingeSettingsForm from './BingeSettingsForm';
import PlatformForm from './PlatformForm';

import './InputForm.css';

class InputForm extends Component {
    state = {
        errorMessage: null,
        displayBingePeriodForm: true,
        displayPlatformForm: false,
        displayBingeGenreForm: false,
        displayBingeSettingsForm: false,
        displayBingeSchedule: false,
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
        },
        schedule: null,
        isLoading: false,
        ageSelections: [{ name: '7+', id: '7+' },{ name: '13+', id: '13+' },{ name: '16+', id: '16+' },{ name: '18+', id: '18+' },{ name: 'all', id: 'all' }],
        countrySelections: [{ name: 'United States', id: 'United States' }],
        languageSelections: [{ name: 'English', id: 'English' }]
        // Test schedule
        // schedule: [[{"Age":"7+","Country":["Romania","United Kingdom"],"Directors":["Tom Barton-Humphreys"],"Disney+":0,"Genres":["Documentary"],"Hulu":0,"IMDb":8.7,"Language":["Romanian","English"],"Netflix":1,"Prime Video":1,"Rotten Tomatoes":null,"Runtime":92,"Title":"Untamed Romania","Type":0, "Year":2018, "_id":1459},{"Age":"18+","Country":["India"],"Directors":["Deepak Gattani","Ym Movies"],"Disney+":0,"Genres":["Documentary","Music"],"Hulu":0,"IMDb":8.7,"Language":[""],"Netflix":1,"Prime Video":0,"Rotten Tomatoes":null,"Runtime":87,"Title":"One Heart: The A.R. Rahman Concert Film","Type":0,"Year":2017,"_id":1980},{"Age":"18+","Country":[""],"Directors":[""],"Disney+":0,"Genres":["Talk-Show"],"Hulu":0,"IMDb":9.3,"Language":[""],"Netflix":1,"Prime Video":0,"Rotten Tomatoes":null,"Runtime":61,"Title":"My Next Guest with David Letterman and Shah Rukh Khan","Type":0,"Year":2019,"_id":1293}],[{"Age":"18+","Country":["United States"],"Directors":["Kevin Booth","David Johndrow"],"Disney+":0,"Genres":["Documentary","Comedy"],"Hulu":0,"IMDb":8.5,"Language":["English"],"Netflix":1,"Prime Video":1,"Rotten Tomatoes":null,"Runtime":81,"Title":"Bill Hicks: Sane Man","Type":0,"Year":1989,"_id":1091},{"Age":"18+","Country":["India","Canada"],"Directors":["Anurag Singh"],"Disney+":0,"Genres":["Drama","Family","History"],"Hulu":0,"IMDb":8.5,"Language":["Punjabi"],"Netflix":1,"Prime Video":0,"Rotten Tomatoes":null,"Runtime":159,"Title":"Punjab 1984","Type":0,"Year":2014,"_id":1156}],[{"Age":"18+","Country":["United States"],"Directors":["Bo Burnham","Christopher Storer"],"Disney+":0,"Genres":["Comedy","Music"],"Hulu":0,"IMDb":8.5,"Language":["English"],"Netflix":1,"Prime Video":0,"Rotten Tomatoes":null,"Runtime":60,"Title":"Bo Burnham: What.","Type":0,"Year":2013,"_id":1043},{"Age":"18+","Country":["United States"],"Directors":["Lisa France"],"Disney+":0,"Genres":["Documentary"],"Hulu":0,"IMDb":8.5,"Language":["English","Arabic"],"Netflix":1,"Prime Video":0,"Rotten Tomatoes":null,"Runtime":90,"Title":"Roll with Me","Type":0,"Year":2017,"_id":2227},{"Age":"7+","Country":["Japan"],"Directors":["Isao Takahata"],"Disney+":0,"Genres":["Animation","Drama","War"],"Hulu":1,"IMDb":8.5,"Language":["Japanese"],"Netflix":0,"Prime Video":0,"Rotten Tomatoes":0.98,"Runtime":89,"Title":"Grave of the Fireflies","Type":0,"Year":1988,"_id":3567}],[{"Age":"13+","Country":["United Kingdom","France","United States"],"Directors":["Asif Kapadia"],"Disney+":0,"Genres":["Documentary","Biography","Sport"],"Hulu":0,"IMDb":8.5,"Language":["English","Portuguese","French","Japanese"],"Netflix":1,"Prime Video":0,"Rotten Tomatoes":0.93,"Runtime":106,"Title":"Senna","Type":0,"Year":2010,"_id":48},{"Age":"18+","Country":["United States"],"Directors":["Stan Lathan"],"Disney+":0,"Genres":["Comedy"],"Hulu":0,"IMDb":8.5,"Language":["English"],"Netflix":1,"Prime Video":0,"Rotten Tomatoes":0.35,"Runtime":65,"Title":"Dave Chappelle: Sticks & Stones","Type":0,"Year":2019,"_id":276},{"Age":"13+","Country":["Argentina"],"Directors":["Raúl Campos","Jan Suter"],"Disney+":0,"Genres":["Comedy"],"Hulu":0,"IMDb":8.6,"Language":["Spanish"],"Netflix":1,"Prime Video":0,"Rotten Tomatoes":null,"Runtime":66,"Title":"Luciano Mellera: Infantiloide","Type":0,"Year":2018,"_id":1539}],[{"Age":"18+","Country":["United States"],"Directors":["Bo Burnham","Christopher Storer"],"Disney+":0,"Genres":["Comedy","Music"],"Hulu":0,"IMDb":8.4,"Language":["English"],"Netflix":1,"Prime Video":0,"Rotten Tomatoes":null,"Runtime":60,"Title":"Bo Burnham: Make Happy","Type":0,"Year":2016,"_id":1018},{"Age":"all","Country":["India"],"Directors":["Paresh Mokashi"],"Disney+":0,"Genres":["Biography","Comedy","Drama"],"Hulu":0,"IMDb":8.4,"Language":["Marathi"],"Netflix":1,"Prime Video":0,"Rotten Tomatoes":null,"Runtime":96,"Title":"Harishchandrachi Factory","Type":0,"Year":2009,"_id":1117},{"Age":"18+","Country":["United States"],"Directors":["Ron Davis"],"Disney+":0,"Genres":["Documentary"],"Hulu":0,"IMDb":8.4,"Language":["English"],"Netflix":1,"Prime Video":0,"Rotten Tomatoes":null,"Runtime":84,"Title":"Life in the Doghouse","Type":0,"Year":2018,"_id":1336}]]
    }

    onSubmitBingePeriodForm = () => {
        const { hourCount, dayCount } = this.state;

        if ( hourCount > 12 ) {
            this.setState({
                errorMessage: "That's way too long to watch TV. You should make some friends and go outside, or you can watch up to 12 hours of TV."
            })
        } else if ( hourCount < 0 || dayCount < 0 ) {
            this.setState({
                errorMessage: "It's currently not possible to go back in time. Try entering in positive numbers."
            })
        } else {
            this.setState({
                displayBingePeriodForm: false,
                displayPlatformForm: true,
                displayBingeGenreForm: false,
                displayBingeSettingsForm: false,
                progress: 1/4,
                errorMessage: null
            })
        }
        
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
            progress: 4/4,
            isLoading: true
        })

        const { dayCount, hourCount, badMovieBinge, genrePreferences, dealbreaker, hasPlatforms, ageSelections, countrySelections, languageSelections} = this.state;

        const data = {
            timeChunks: Array.from(hourCount.toString().repeat(dayCount)).map(num => parseInt(num) * 60),
            badMovieBinge,
            genrePreferences,
            genreDealbreaker: dealbreaker,
            hasPlatforms,
            ageSelections: ageSelections.map(a => a.id),
            countrySelections: countrySelections.map(c => c.id),
            languageSelections: languageSelections.map(l => l.id)
        }

        fetch("/api/schedule", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(data => {
            const { schedule } = data;

            this.setState({
                schedule,
                displayBingeSchedule: true,
                isLoading: false
            })
        })
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

    selectAgeOption(selectedList, selectedItem) {
        this.setState({
            ageSelections: selectedList
        })
    }

    removeAgeOption(selectedList, selectedItem) {
        this.setState({
            ageSelections: selectedList
        })
    }

    selectCountryOption(selectedList, selectedItem) {
        console.log(selectedList)
        this.setState({
            countrySelections: selectedList
        })
    }

    removeCountryOption(selectedList, selectedItem) {
        this.setState({
            countrySelections: selectedList
        })
    }

    selectLanguageOption(selectedList, selectedItem) {
        console.log(selectedList)
        this.setState({
            languageSelections: selectedList
        })
    }

    removeLanguageOption(selectedList, selectedItem) {
        this.setState({
            languageSelections: selectedList
        })
    }

    render(){
        const { displayBingePeriodForm, displayPlatformForm, displayBingeGenreForm, displayBingeSettingsForm, displayBingeSchedule, progress } = this.state;
        const { errorMessage, badMovieBinge, dayCount, dealbreaker, genrePreferences, hourCount, hasPlatforms, schedule, isLoading, ageSelections, countrySelections, languageSelections } = this.state;
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
                            errorMessage = { errorMessage }
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
                            ageSelections = { ageSelections }
                            countrySelections = { countrySelections }
                            languageSelections = { languageSelections }
                            selectAgeOption = { this.selectAgeOption.bind(this) }
                            removeAgeOption = { this.removeAgeOption.bind(this) }
                            selectCountryOption = { this.selectCountryOption.bind(this) }
                            removeCountryOption = { this.removeCountryOption.bind(this) }
                            selectLanguageOption = { this.selectLanguageOption.bind(this) }
                            removeLanguageOption = { this.removeLanguageOption.bind(this) }
                        />
                    ) : null }
                </Form>

                { displayBingeSchedule ? (
                    <BingeSchedule 
                        schedule = { schedule }
                    />
                ) : null }

                { isLoading ? (
                    <div className = "Loading">
                        <Spinner animation="border" variant="danger" /> Fetching Schedule...
                    </div>
                ) : null }
            </div>
        )
    }
}

export default InputForm;