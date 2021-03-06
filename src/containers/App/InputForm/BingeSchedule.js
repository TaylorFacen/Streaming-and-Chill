import React from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';

const Movie = ({ movie }) => {
    const directors = movie.Directors.filter(director => director !== "")
    const platforms = ['Netflix', 'Hulu', 'Disney+', 'Prime Video'].filter(platform => movie[platform] === 1)
    const genres = movie.Genres.filter(genre => genre !== "")

    return (
        <div className = "Movie">
            <h3>{ movie.Title }</h3>
            <div className = "movie-meta">
                <p>Year: { movie.Year }</p>
                { directors.length > 1 ? <p>Directors: { directors.join(", ") }</p> : null }
                { directors.length === 1 ? <p>Director: { directors[0] }</p> : null }
                
                { platforms.length === 1 ? <p>Platform: { platforms[0] }</p> : <p>Platforms: { platforms.join(", ") } </p>}

                { genres.length === 1 ? <p>Genre: { genres[0] }</p> : <p>Genres: { genres.join(", ") } </p> }

                <p>Runtime: { movie.Runtime } minutes</p>
                <p>IMDb Rating: { movie.IMDb }</p>
                <p>Age Rating: { movie.Age }</p>
            </div>
        </div>
    )
}

const DaySchedule = ({ movies }) => {
    const totalRunTime = movies.reduce((total, currentMovie) => total + currentMovie.Runtime, 0);

    return (
        <div className = "DaySchedule">
            { movies.map(movie => <Movie movie = { movie } key = { movie._id } />) }
            <p>Total binge time: { totalRunTime } minutes.</p>
        </div>
    )
}

export default ({ schedule }) => {
    const dayCount = schedule.length;
    const days = Array.from(Array(dayCount).keys());
    const isValidSchedule = schedule.filter(day => day.length > 0).length > 0;

    return (
        <div className = "BingeSchedule">
            <h2>Schedule</h2>
            { isValidSchedule ? (
                <Tab.Container defaultActiveKey = { 0 }>
                    <Row>
                        <Col sm = { 3 }>
                            <Nav variant="pills" className="flex-column">
                                { days.map(i => (
                                    <Nav.Item key = { i }>
                                        <Nav.Link eventKey = { i }>Day { i + 1 }</Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </Col>

                        <Col sm = { 9 }>
                            <Tab.Content>
                                { days.map(i => (
                                    <Tab.Pane eventKey = { i } key = { i }>
                                        <DaySchedule movies = { schedule[i] } key = { i + 1 } />
                                    </Tab.Pane>
                                ))}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            ) : (
                <div>
                    <p>Looks like there aren't any movies that fit your critera. You can either go outside and smell some flowers or <a href = "/">try again</a>. </p>
                </div>
            ) }
        </div>
    )
}