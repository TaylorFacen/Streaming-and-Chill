import React from 'react';
import { Button, Form } from 'react-bootstrap';

export default ({ dayCount, hourCount, onChange, onSubmit }) => (
    <div className = "BingePeriodForm">
        <h2>Binge Period</h2>
        <Form.Group controlId="dayCount">
            <Form.Label>How many days is your binge?</Form.Label>
            <Form.Control 
                type = "number" 
                value = { dayCount }
                name = "dayCount"
                onChange = { onChange }
            />
        </Form.Group>
        <Form.Group controlId="hourCount">
            <Form.Label>How many hours per day do you want to spend watching movies?</Form.Label>
            <Form.Control 
                type = "number" 
                value = { hourCount }
                name = "hourCount"
                onChange = { onChange }
            />
        </Form.Group>
        <Button onClick = { onSubmit }>Next</Button>
    </div>
)