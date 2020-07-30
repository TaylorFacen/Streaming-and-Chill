import React from 'react';
import { Button, Table, Tooltip, OverlayTrigger } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { IoIosInformationCircleOutline, IoIosThumbsUp, IoIosThumbsDown } from 'react-icons/io'
import { GiShrug } from 'react-icons/gi'

export default ({ addPreference, dealbreaker, onDealbreakerToggleChange, genrePreferences, goBack, onSubmit }) => {
    const genres = [
        'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Drama', 'Family', 'Horror', 'Music', 'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western'
    ]

    return (
        <div className = "BingeGenreForm">
            <Button onClick = { goBack } variant = "link">Back</Button>
            <h2>Genre Preferences</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Genre</th>
                        <th>Like</th>
                        <th>Dislike</th>
                        <th>No Preference</th>
                    </tr>
                </thead>
                <tbody>
                    { genres.map(genre => (
                        <tr key = { genre }>
                            <td>{ genre }</td>
                            <td>
                                <Button 
                                    className = "preference-btn" 
                                    variant = { genrePreferences.likes.includes(genre) ? "success" : "outline-success"}
                                    onClick = { () => addPreference(genre, 'like') }
                                >
                                    <IoIosThumbsUp />
                                </Button>
                            </td>
                            <td>
                                <Button 
                                    className = "preference-btn" 
                                    variant = { genrePreferences.dislikes.includes(genre) ? "danger" : "outline-danger"}
                                    onClick = { () => addPreference(genre, 'dislike') }
                                >
                                    <IoIosThumbsDown />
                                </Button>
                            </td>
                            <td>
                                <Button 
                                    className = "preference-btn" 
                                    variant = { !genrePreferences.likes.concat(genrePreferences.dislikes).includes(genre) ? "secondary" : "outline-secondary"}
                                    onClick = { () => addPreference(genre, 'np') }
                                >
                                    <GiShrug />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className = "deakbreaker-section">
                <span>Is this a dealbreaker?</span>
                <OverlayTrigger
                    placement = "top"
                    overlay = {
                        <Tooltip>
                            If yes, you'll only receive recommendations from genres you like and/or won't receive recommendations for genres you don't like.
                        </Tooltip>
                    }
                >
                    <IoIosInformationCircleOutline />
                </OverlayTrigger>
                <BootstrapSwitchButton
                    checked = { dealbreaker }
                    onlabel = 'Yes'
                    offlabel = 'No'
                    onChange = { onDealbreakerToggleChange }
                    onstyle = "success"
                />
            </div>
            <Button onClick = { onSubmit }>Next</Button>
        </div>
    )
}