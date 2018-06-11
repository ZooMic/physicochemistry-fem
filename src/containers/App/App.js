import React, { Component } from 'react';

import { specificHeatFileConversion, calculateEnthalpy } from '../../utilities';
import { FlexBox } from "../../components/FlexBox";
import { FileImport, FilePreview } from '../../components/File';
import { UserConfig } from '../../components/UserConfig';
import { Results } from '../Results';

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
				min: 1495,
				max: 1520,
				effect: 150,
			}],
			deltaTemperature: 1,
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
			enthalpySpecificHeatInterpolated: [],
			enthalpySpecificHeatNotInterpolated: [],
		});
	};

	onUserConfigUpdate({index, min, max, effect}) {
		const { inputs } = this.state;
		const newInputs = [ ...inputs ];
		newInputs[index] = {
			min, max, effect
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
					min: 0,
					max: 0,
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
		const { specificHeat, deltaTemperature, inputs } = this.state;
		this.setState({
			enthalpySpecificHeatInterpolated: calculateEnthalpy(specificHeat, deltaTemperature, true, inputs),
			enthalpySpecificHeatNotInterpolated: calculateEnthalpy(specificHeat, deltaTemperature, false, inputs),
		});
	}

	render() {

		const { onFileUpdate, onUserConfigUpdate, onAddNewInput, onRemoveInput, onCalculateClick } = this;
		const {
			fileContent,
			fileCorrect,
			specificHeat,
			fileError,
			inputs,
			enthalpySpecificHeatInterpolated,
			enthalpySpecificHeatNotInterpolated,
		} = this.state;
		const isSuccess = fileCorrect ? 'success' : 'failure';

		return (
			<div className="App">
				<FlexBox align="Row" className="App-MainFlexBox">
					<FlexBox align="Column" className="App-DataImport">
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
					<FlexBox className="App-ResultsDisplayAndExport" align="Column">
						<Results
							enthalpySpecificHeatInterpolatedData={enthalpySpecificHeatInterpolated}
							enthalpySpecificHeatNotInterpolatedData={enthalpySpecificHeatNotInterpolated}
						/>
					</FlexBox>
				</FlexBox>
			</div>
		);
	}
}


