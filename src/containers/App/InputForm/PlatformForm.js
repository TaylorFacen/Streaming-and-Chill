import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa'

export default ({ goBack, onSubmit }) => (
    <div className = "PlatformForm">
        <Button onClick = { goBack } variant = "link">Back</Button>
        <h2>Streaming Platform</h2>
        <Form.Group controlId="dayCount">
            <Form.Label>Which streaming platforms do you have access to?</Form.Label>
            <div className = "platform-options">
                <Card>
                    <Card.Img variant="top" src="https://via.placeholder.com/150" />
                    <Card.Body>
                        <Card.Text>
                            <Button block variant = "light">{ true ? <FaCheck /> : "Select" }</Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://via.placeholder.com/150" />
                    <Card.Body>
                        <Card.Text>
                            <Button block variant = "light">{ false ? <FaCheck /> : "Select" }</Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://via.placeholder.com/150" />
                    <Card.Body>
                        <Card.Text>
                            <Button block variant = "light">{ true ? <FaCheck /> : "Select" }</Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://via.placeholder.com/150" />
                    <Card.Body>
                        <Card.Text>
                            <Button block variant = "light">{ false ? <FaCheck /> : "Select" }</Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <Form.Text className="text-muted">
                Select as many as you like.
            </Form.Text>    
        </Form.Group>
        <Button onClick = { onSubmit }>Next</Button>
    </div>
)