import React, { Component } from 'react';
import './App.css';

import InputForm from './InputForm';

class App extends Component {
	state = {

	}

	render(){
		return (
		<div className = "App">
			<h1>Streaming and Chill</h1>
			<p>Streaming and Chill is a [insert description here...]</p>
			<div className = "Components">
				<InputForm />
			</div>
		</div>
		);
	}
}

export default App;
