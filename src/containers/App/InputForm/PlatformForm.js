import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa'

import disneyLogo from '../../../images/disney.jpg';
import huluLogo from '../../../images/hulu.png';
import netflixLogo from '../../../images/netflix.png';
import primeVideoLogo from '../../../images/prime-video.png';

export default ({ goBack, hasPlatforms, onSubmit, togglePlatform }) => {
    const platforms = [
        { id: 'netflix', name: 'Netflix', logo: netflixLogo},
        { id: 'prime', name: 'Prime Video', logo: primeVideoLogo},
        { id: 'hulu', name: 'Hulu', logo: huluLogo},
        { id: 'disney', name: 'Disney+', logo: disneyLogo},
    ]
    return (
        <div className = "PlatformForm">
            <Button onClick = { goBack } variant = "link">Back</Button>
            <h2>Streaming Platform</h2>
            <Form.Group controlId="dayCount">
                <Form.Label>Which streaming platforms do you have access to?</Form.Label>
                <div className = "platform-options">
                    { platforms.map(platform => (
                        <Card key = { platform.id }>
                            <Card.Img variant = "top" src = { platform.logo} />
                            <Card.Body>
                                <Card.Text>
                                    <Button 
                                        block 
                                        variant = { hasPlatforms[platform.id] ? "success" : "light" }
                                        onClick = { () => togglePlatform( platform.id ) } 
                                    >{ hasPlatforms[platform.id] ? <FaCheck /> : "Select" }</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                <Form.Text className="text-muted">
                    Select all that apply.
                </Form.Text>    
            </Form.Group>
            <Button onClick = { onSubmit }>Next</Button>
        </div>
    )
}