import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LiquidSolid.css';

export default class LiquidSolidInput extends Component {

    constructor(props) {
        super(props);  
        this.state = {
            solidus: "",
            liquidus: "",
        };
    };
    static propTypes = {
        isThermalEffect: PropTypes.bool,
    };
    static defaultProps = {
        isThermalEffect: false,
    };

    render() {
        const { isThermalEffect } = this.props;

        return (
            <div className={ `LiquidSolidInput-Wrapper ${isThermalEffect ? "special" : ""}` }>
                <div className="LiquidSolidInput-Box">
                    <span className="LiquidSolidInput-Label">Solidus</span>
                    <input type="number" name="solidus" className="LiquidSolidInput-Input"/>
                    <span className="LiquidSolidInput-Unit">{ "\u2103" }</span>
                </div>
                <div className="LiquidSolidInput-Box">
                    <span className="LiquidSolidInput-Label">Liquidus</span>
                    <input type="number" name="liquidus" className="LiquidSolidInput-Input"/>
                    <span className="LiquidSolidInput-Unit">{ "\u2103" }</span>
                </div>
                { isThermalEffect ?
                    <div className="LiquidSolidInput-Box">
                        <span className="LiquidSolidInput-Label">T. eff.</span>
                        <input type="number" name="thermal-effect" className="LiquidSolidInput-Input"/>
                        <span className="LiquidSolidInput-Unit">{ "J/mol" }</span>
                    </div> : null }
            </div>
        );  
    }
}


