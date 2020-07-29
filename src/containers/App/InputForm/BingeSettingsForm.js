import React from 'react';
import { Button } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

export default ({ badMovieBinge, goBack, onBadMovieToggleChange }) => (
    <div className = "BingeSettingsForm">
        <Button onClick = { goBack } variant = "link">Back</Button>
        <div className = "bad-movie-binge-section">
            <h2>Bad Movie Binge</h2>
            <span>Would you prefer to watch bad movies?</span>
            <BootstrapSwitchButton
                checked = { badMovieBinge }
                onlabel = 'Yes'
                offlabel = 'No'
                onChange = { onBadMovieToggleChange }
                onstyle = "success"
            />
        </div>
        {/* <div>
            <h2>Age Restrictions</h2>
        </div> */}
        <Button type = "submit">Submit</Button>
    </div>
)