import React from 'react';
import { Button } from 'react-bootstrap';

export default ({ goBack }) => (
    <div className = "BingeThemeForm">
        <Button onClick = { goBack } variant = "link">Back</Button>
        Binge Theme
        <Button type = "submit">Submit</Button>
    </div>
)