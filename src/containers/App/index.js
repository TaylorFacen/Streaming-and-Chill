import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import './App.css';

import InputForm from './InputForm';
import logo from '../../images/logo.png';

class App extends Component {
	render(){
		return (
		<div className = "App">
			<h1>STREAM AND CHILL</h1>
			<Image src = { logo } alt = "Logo: TV with a remote" style = {{ width: "200px" }}/>
			<p>Your leisure time should be spent relaxing. Stream and Chill enables you to do just that–worry free streaming and chilling. You can optimize your binge watching experience with our state of the art recommendation algorithm! </p>
			<div className = "Components">
				<InputForm />
			</div>
		</div>
		);
	}
}

export default App;
