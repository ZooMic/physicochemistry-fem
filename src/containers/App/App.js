import React, { Component } from 'react';

import { specificHeatFileConversion, calculateEnthalpy } from '../../utilities';
import { FlexBox } from "../../components/FlexBox";
import { ScrollableContent } from '../../components/ScrollableContent';
import { FileImport, FilePreview } from '../../components/File';
import { UserConfig } from '../../components/UserConfig';

import './App.css';
import '../../index.css';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
			specificHeat: [],
			fileContent: "",
			fileCorrect: false,
			fileError: null,
			inputs: [{
				solidus: 0,
				liquidus: 0,
				effect: 0,
			}],
		};
		
		this.onFileUpdate = this.onFileUpdate.bind(this);
		this.onUserConfigUpdate = this.onUserConfigUpdate.bind(this);
		this.onAddNewInput = this.onAddNewInput.bind(this);
		this.onRemoveInput = this.onRemoveInput.bind(this);
		this.onCalculateClick = this.onCalculateClick.bind(this);
	};
	
	onFileUpdate({fileContent}) {

		const { specificHeat, failure, error } = specificHeatFileConversion(fileContent);

		this.setState({
			specificHeat,
			fileContent: fileContent,
			fileCorrect: !failure,
			fileError: error === undefined ? null : error,
		});
	};

	onUserConfigUpdate({index, liquidus, solidus, effect}) {
		const { inputs } = this.state;
		const newInputs = [ ...inputs ];
		newInputs[index] = {
			liquidus, solidus, effect
		};

		this.setState({
			inputs: newInputs,
		});
	}

	onAddNewInput() {
		const { inputs } = this.state;

		this.setState({
			inputs: [
				...inputs,
				{
					liquidus: 0,
					solidus: 0,
					effect: 0,
				}
			]
		});
	}

	onRemoveInput(index) {
		const { inputs } = this.state;
		const newInputs = [ ...inputs ];
		newInputs.splice(index, 1);

		this.setState({
			inputs: newInputs,
		});
	}

	onCalculateClick() {
		const { specificHeat } = this.state;

		calculateEnthalpy(specificHeat);
	}

	render() {

		const { onFileUpdate, onUserConfigUpdate, onAddNewInput, onRemoveInput, onCalculateClick } = this;
		const { fileContent, fileCorrect, specificHeat, fileError, inputs } = this.state;
		const isSuccess = fileCorrect ? 'success' : 'failure';

		return (
			<div className="App">
				<FlexBox align="Row">

					<div className={`App-DataImport`}>
						<FlexBox align="Column">
							<FileImport
								callback={ onFileUpdate }
								importFileClassName={`button ${isSuccess}`}
								fileNameClassName={`area ${isSuccess}`}
							/>
							{ fileCorrect ?
								<FilePreview
									wrapperClassName={'App-FilePreview'}
									className={`content ${isSuccess}`} fileContent={ fileContent }
								/> : null }
							<UserConfig inputs={inputs} onUpdate={ onUserConfigUpdate } onAddClick={ onAddNewInput } onRemoveClick={ onRemoveInput }/>
							<button className="App-CalculateButton button success" onClick={ onCalculateClick }>Calculate</button>
						</FlexBox>
					</div>

					<div className={`App-ResultsDisplayAndExport`}>
						<FlexBox align="Column">
							<div>Some title of the section</div>
							<div>Chart 1: Temperature  - SpecificHeat</div>
							<div>Chart 2: SpecificHeat - Enthalpy - without interpolation and with interpolation</div>
						</FlexBox>
					</div>
					{/* <LiquidSolidForm /> */}
				</FlexBox>
			</div>
		);
	}
}


