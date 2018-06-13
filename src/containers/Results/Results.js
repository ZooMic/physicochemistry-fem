import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Scatter } from 'react-chartjs-2';
import exportFromJSON from 'export-from-json';

import './Results.css';
import '../../index.css';


export default class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {

            chartsOptions: {
                maintainAspectRatio: false,
                showLines: true,
                fill: false,
            }
        };

        this.onExportToFileClick = this.onExportToFileClick.bind(this);
    };

    static propTypes = {
        enthalpySpecificHeatInterpolatedData: PropTypes.array,
        enthalpySpecificHeatNotInterpolatedData: PropTypes.array,
        isDisabled: PropTypes.bool,
    };

    static defaultProps = {
        enthalpySpecificHeatInterpolatedData: [],
        enthalpySpecificHeatNotInterpolatedData: [],
        isDisabled: true,
    }

    onExportToFileClick() {
        const { enthalpySpecificHeatNotInterpolatedData: notInterpolated, enthalpySpecificHeatInterpolatedData: interpolated } = this.props;

        const data = [notInterpolated, ...interpolated.map(item => item.data)];
        const fileName = "AmazingExport";
        const exportType = "json";

        exportFromJSON({data, fileName, exportType});
    }
	
	render() {

        const { chartsOptions } = this.state;
        const { enthalpySpecificHeatInterpolatedData, enthalpySpecificHeatNotInterpolatedData, isDisabled } = this.props;
        const { onExportToFileClick } = this;

        const enthSpecHeatData = {
            datasets: [{
                label: 'Not interpolated',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: isDisabled ? '#dadada' : '#da0006', 
                data: enthalpySpecificHeatNotInterpolatedData.map(({temperature, specificHeat}) => ({
                    x: temperature,
                    y: specificHeat,
                })),
            }],
        };
        const enthSpecHeatOptions = {
            ...chartsOptions,
            scales: {
                yAxes:[{
                    scaleLabel: {
                        display: true,
                        labelString: 'Specific Heat [J / (g * \u2103)]',
                    }
                }],
                xAxes:[{
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature [\u2103]',
                    }
                }],
            },
        }

        const interpolated = enthalpySpecificHeatInterpolatedData.map(({data, borderColor, functionName}) => {
            return {
                data: data.map(({temperature, enthalpy}) => ({x: temperature, y: enthalpy})),
                backgroundColor: 'rgba(0, 0, 0, 0)',
                label: functionName,
                borderColor,
            };
        });

        const tempEnthalpyData = {
            datasets: [{
                label: 'Not interpolated',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: isDisabled ? '#dadada' : '#da0006',
                data: enthalpySpecificHeatNotInterpolatedData.map(({temperature, enthalpy}) => ({
                    y: enthalpy,
                    x: temperature,
                })),
            }, ...interpolated],
        }
        const tempEnthalpyOptions = {
            ...chartsOptions,
            scales: {
                xAxes:[{
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature [\u2103]',
                    }
                }],
                yAxes:[{
                    scaleLabel: {
                        display: true,
                        labelString: 'Enthalpy [J / g]',
                    }
                }],
            },
        }

		return (
			<Fragment>
                <div className={`Results-Title area ${isDisabled ? 'disabled' : 'success'}`}>Results</div>
                <div className={`Results-ChartWrapper ${isDisabled ? 'disabled' : ''}`}>
                    <div className={`content ${isDisabled ? 'disabled' : 'success'}`}>
                        <Scatter
                            data={enthSpecHeatData}
                            options={enthSpecHeatOptions}
                        />
                    </div>
                </div>
                <div className={`Results-ChartWrapper ${isDisabled ? 'disabled' : ''}`}>
                    <div className={`content ${isDisabled ? 'disabled' : 'success'}`}>
                        <Scatter
                            data={tempEnthalpyData}
                            options={tempEnthalpyOptions}
                        />
                    </div>
                </div>
                <button onClick={ onExportToFileClick } disabled={isDisabled} className={`button ${isDisabled ? 'disabled' : 'success'}`}>Export to JSON</button>
            </Fragment>
		);
    }
}


