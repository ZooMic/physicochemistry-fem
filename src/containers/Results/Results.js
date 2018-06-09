import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Scatter } from 'react-chartjs-2';
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
    };

    static propTypes = {
        enthalpySpecificHeatInterpolatedData: PropTypes.arrayOf(PropTypes.shape({
            enthalpy: PropTypes.number,
            specificHeat: PropTypes.number,
            temperature: PropTypes.number,
        })),
        enthalpySpecificHeatNotInterpolatedData: PropTypes.arrayOf(PropTypes.shape({
            enthalpy: PropTypes.number,
            specificHeat: PropTypes.number,
            temperature: PropTypes.number,
        })),
    };

    static defaultProps = {
        enthalpySpecificHeatInterpolatedData: [],
        enthalpySpecificHeatNotInterpolatedData: [],
    }
	
	render() {

        const { chartsOptions } = this.state;
        const { enthalpySpecificHeatInterpolatedData, enthalpySpecificHeatNotInterpolatedData } = this.props;

        const enthSpecHeatData = {
            datasets: [{
                label: 'Not interpolated',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: '#da0006',
                data: enthalpySpecificHeatNotInterpolatedData.map(({enthalpy, specificHeat}) => ({
                    x: enthalpy,
                    y: specificHeat,
                })),
            },{
                label: 'Interpolated',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: '#006e2e',
                data: enthalpySpecificHeatInterpolatedData.map(({enthalpy, specificHeat}) => ({
                    x: enthalpy,
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
                        labelString: 'Specific Heat [J / (mol * K)]',
                    }
                }],
                xAxes:[{
                    scaleLabel: {
                        display: true,
                        labelString: 'Enthalpy [J / mol]',
                    }
                }],
            },
        }

        const tempEnthalpyData = {
            datasets: [{
                label: 'Not interpolated',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: '#da0006',
                data: enthalpySpecificHeatNotInterpolatedData.map(({temperature, enthalpy}) => ({
                    y: enthalpy,
                    x: temperature,
                })),
            },{
                label: 'Interpolated',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: '#006e2e',
                data: enthalpySpecificHeatInterpolatedData.map(({temperature, enthalpy}) => ({
                    y: enthalpy,
                    x: temperature,
                })),
            }],
        }
        const tempEnthalpyOptions = {
            ...chartsOptions,
            scales: {
                xAxes:[{
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature [K]',
                    }
                }],
                yAxes:[{
                    scaleLabel: {
                        display: true,
                        labelString: 'Enthalpy [J / mol]',
                    }
                }],
            },
        }

		return (
			<Fragment>
                <div className={'Results-Title area success'}>Results</div>
                <div className={`Results-ChartWrapper`}>
                    <div className={`content success`}>
                        <Scatter
                            data={enthSpecHeatData}
                            options={enthSpecHeatOptions}
                        />
                    </div>
                </div>
                <div className={`Results-ChartWrapper`}>
                    <div className={`content success`}>
                        <Scatter
                            data={tempEnthalpyData}
                            options={tempEnthalpyOptions}
                        />
                    </div>
                </div>
                <button className={`button success`}>Export to file</button>
            </Fragment>
		);
    }
}


