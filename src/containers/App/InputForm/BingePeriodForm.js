import React from 'react';
import { Button } from 'react-bootstrap';

export default ({ onSubmit }) => (
    <div className = "BingePeriodForm">
        Binge Period
        <Button onClick = { onSubmit }>Next</Button>
    </div>
)