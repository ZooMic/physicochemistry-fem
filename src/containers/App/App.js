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
			functionInputs: [{
				functionFormula: '1',
				functionName: 'Evenly',
				rangeMin: 0,
				rangeMax: 100,
				functionActive: true,

			},{
				functionFormula: 'Math.abs((-x + 100)*(-x + 110)*-x) / 170600',
				functionName: 'Invented 1',
				rangeMin: 0,
				rangeMax: 100,
				functionActive: false,
			}],
			deltaTemperature: 1,
			calculationDone: false,
		};
		
		this.onFileUpdate = this.onFileUpdate.bind(this);
		this.onUserConfigUpdate = this.onUserConfigUpdate.bind(this);
		this.onUserConfigFunctionsUpdate = this.onUserConfigFunctionsUpdate.bind(this);
		this.onAddNewInput = this.onAddNewInput.bind(this);
		this.onRemoveInput = this.onRemoveInput.bind(this);
		this.onAddNewFunctionInput = this.onAddNewFunctionInput.bind(this);
		this.onRemoveFunctionInput = this.onRemoveFunctionInput.bind(this);
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

	onUserConfigFunctionsUpdate({index, functionFormula, functionName, rangeMin, rangeMax, functionActive}) {
		const { functionInputs } = this.state;
		const newInputs = [ ...functionInputs ];
		newInputs[index] = {
			functionFormula, functionName, rangeMin, rangeMax, functionActive
		};

		this.setState({
			functionInputs: newInputs,
		});
	}

	onAddNewFunctionInput() {
		const { functionInputs } = this.state;

		this.setState({
			functionInputs: [
				...functionInputs,
				{
					functionFormula: '',
					functionName: '',
					rangeMin: 0,
					rangeMax: 0,
					functionActive: true,
				}
			]
		});
	}

	onRemoveFunctionInput(index) {
		const { functionInputs } = this.state;
		const newInputs = [ ...functionInputs ];
		newInputs.splice(index, 1);

		this.setState({
			functionInputs: newInputs,
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
		const { specificHeat, deltaTemperature, inputs, functionInputs } = this.state;
		this.setState({
			enthalpySpecificHeatInterpolated: calculateEnthalpy(specificHeat, deltaTemperature, true, inputs, functionInputs),
			enthalpySpecificHeatNotInterpolated: calculateEnthalpy(specificHeat, deltaTemperature, false, inputs, functionInputs),
			calculationDone: true,
		});
	}

	render() {

		const {
			onFileUpdate,
			onUserConfigUpdate,
			onAddNewInput,
			onRemoveInput,
			onCalculateClick,
			onUserConfigFunctionsUpdate,
			onAddNewFunctionInput,
			onRemoveFunctionInput,
		} = this;
		const {
			fileContent,
			fileCorrect,
			functionInputs,
			fileError,
			inputs,
			enthalpySpecificHeatInterpolated,
			enthalpySpecificHeatNotInterpolated,
			calculationDone,
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
						<UserConfig
							isDisabled={!fileCorrect}
							functionInputs={functionInputs}
							inputs={inputs}
							onUpdateInputs={ onUserConfigUpdate }
							onUpdateFunctionInputs={ onUserConfigFunctionsUpdate }
							onAddClick={ onAddNewInput }
							onRemoveClick={ onRemoveInput }
							onAddFunctionClick={ onAddNewFunctionInput }
							onRemoveFunctionClick={ onRemoveFunctionInput }
						/>
						<button disabled={!fileCorrect} className={`App-CalculateButton button ${fileCorrect ? "success" : "disabled"}`} onClick={ onCalculateClick }>Calculate</button>
					</FlexBox>
					<FlexBox className="App-ResultsDisplayAndExport" align="Column">
						<Results isDisabled={!calculationDone}
							enthalpySpecificHeatInterpolatedData={enthalpySpecificHeatInterpolated}
							enthalpySpecificHeatNotInterpolatedData={enthalpySpecificHeatNotInterpolated}
						/>
					</FlexBox>
				</FlexBox>
			</div>
		);
	}
}


