import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { LiquidSolidInput } from '.';
import trashIcon from '../../assets/trash-icon.png';
import './LiquidSolid.css';

export default class LiquidSolidForm extends Component {

    constructor(props) {
        super(props);  
        this.state = {
            inputs: [{
                id: 1,
                solidus: 0,
                liquidus: 0,
            }],
        };
    };
    static propTypes = {};
    static defaultProps = {};

    onAddNewInput() {
        const { inputs } = this.state;
        const lastObject = inputs[inputs.length - 1];
        const lastId = lastObject && lastObject.id;
        const newId = lastId ? lastId + 1 : 1;

        this.setState({
            inputs: [
                ...inputs,
                {
                    id: newId,
                }
            ],
        });
    }

    onRemoveInput(id) {
        const { inputs } = this.state;
        const inputPosition = inputs.findIndex(input => input.id === id);

        if (inputPosition >= 0) {
            inputs.splice(inputPosition, 1);
            this.setState({ inputs });
        }
    }

    render() {
        const { inputs } = this.state;
        const onAddNewInput = this.onAddNewInput.bind(this);
        const onRemoveInput = this.onRemoveInput.bind(this);

        return (
            <div className="LiquidSolidForm">
                <div className="LiquidSolidForm-Wrapper">
                    { inputs.map(({id}) => {
                        const isWithtThermalEffect = id !== 1;
                        return ( 
                            <div
                                key={`box-input-${id}`}
                                className={ `LiquidSolidForm-BoxInput ${isWithtThermalEffect ? "thermal-effect" : ""}`}
                            >
                                <LiquidSolidInput key={`liquid-solid-input-${id}`} id={ id } isThermalEffect={isWithtThermalEffect} />
                                { isWithtThermalEffect ? <button
                                    id={`remove-button-${id}`}
                                    className="LiquidSolidForm-RemoveButton"
                                    onClick={ () => onRemoveInput(id) } >
                                    <img src={ trashIcon } alt="-"/>
                                </button> : null }
                            </div>)
                        })}
                </div>
                <div className="LiquidSolidForm-Box">
                    <button onClick={ onAddNewInput } className="LiquidSolidForm-AddButton">
                        Add new
                    </button>
                </div>
            </div>
        );
    }
}


