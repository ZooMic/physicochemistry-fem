import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Scatter } from 'react-chartjs-2';
import './Results.css';
import '../../index.css';

const data = {
    datasets: [{
        label: 'Temperature',
        data: [{
            x: 10,
            y: 2,
        }, {
            x: 12,
            y: 14,
        }, {
            x: 17,
            y: -7,
        }],
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(0,0,0,1)',
    }],
}

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

		return (
			<Fragment>
                <div className={'Results-Title area success'}>Results</div>
                <div className={`Results-ChartWrapper`}>
                    <div className={`content success`}>
                        <Scatter
                            data={enthSpecHeatData}
                            options={chartsOptions}
                        />
                    </div>
                </div>
                <div className={`Results-ChartWrapper`}>
                    <div className={`content success`}>
                        <Scatter data={data} options={chartsOptions} />
                    </div>
                </div>
                <button className={`button success`}>Export to file</button>
            </Fragment>
		);
    }
}


