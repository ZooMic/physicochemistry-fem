import React, { Component } from 'react';

import { specificHeatFileConversion } from '../../utilities';
import { TextFilePicker } from '../../components/TextFilePicker';
import { LiquidSolidForm } from '../../components/LiquidSolid';
import { Entalpy } from "../../components/Entalpy";
import './App.css';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
			specificHeat: "",
			fileCorrect: false,
			fileError: null,
        };
	};
	
	onFileUpdate({fileContent}) {

		const { specificHeat, failure, error } = specificHeatFileConversion(fileContent);

		this.setState({
			specificHeat,
			fileCorrect: !failure,
			fileError: error === undefined ? null : error,
		});
	};

	render() {

		const onFileUpdate = this.onFileUpdate.bind(this);
		const { fileCorrect, specificHeat } = this.state;

		return (
			<div className="App">
				<TextFilePicker callback={ onFileUpdate } correct={ fileCorrect }/>
				<LiquidSolidForm />
				<Entalpy specificHeat={ specificHeat }/>
			</div>
		);
	}
}


