import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlexBox } from '../FlexBox';
import { ScrollableContent } from '../ScrollableContent';
import trashIcon from '../../assets/trash-icon.png';
import './UserConfig.css';
import '../../index.css';


export default class UserConfig extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    static propTypes = {
        inputs: PropTypes.array.isRequired,
        className: PropTypes.string,
        onUpdate: PropTypes.func.isRequired,
        onAddClick: PropTypes.func.isRequired,
        onRemoveClick: PropTypes.func.isRequired,
    };

    static defaultProps = {
        className: '',
    }

    onChange(index) {

        const { onUpdate, inputs } = this.props;

        return (event) => {
            if (event && event.target && inputs[index]) {

                let { min, max, effect } = inputs[index];

                min = event.target.name === "min" ? Number(event.target.value) : min;
                max = event.target.name === "max" ? Number(event.target.value) : max;
                effect = event.target.name === "effect" ? Number(event.target.value) : effect;

                onUpdate({
                    index,
                    min,
                    max,
                    effect,
                });
            }
        };
    }

    onRemoveClick(index) {
        const { onRemoveClick: updateRemove } = this.props;
        updateRemove(index);
    }

    render() {
        const { onChange, onRemoveClick } = this;
        const { inputs, onAddClick } = this.props;

        return (
            <div className="UserConfig-Wrapper">
                <div className="UserConfig-Header area success">Enter the data</div>
                <div className="UserConfig-Content">
                    <ScrollableContent className="UserConfig-ScrollableContent content success">
                        {
                            inputs.map(({min, max, effect}, index) => (
                                <FlexBox align="Row" key={`UserConfig-Input-${index}`} className="UserConfig-Inputs-FlexBoxWrapper">
                                    <div className="UserConfig-Inputs content success">
                                        <FlexBox align="Column">
                                            <FlexBox align="Row" className="UserConfig-InputRow">
                                                <span className="UserConfig-Label">Min</span>
                                                <input className="UserConfig-Input" type="number" name="min" onChange={ onChange(index) } value={ min.toString() }/>
                                                <span className="UserConfig-Unit">{ "\u2103" }</span>
                                            </FlexBox>
                                            <FlexBox align="Row" className="UserConfig-InputRow">
                                                <span className="UserConfig-Label">Max</span>
                                                <input className="UserConfig-Input" type="number" name="max" onChange={ onChange(index) } value={ max.toString() }/>
                                                <span className="UserConfig-Unit">{ "\u2103" }</span>
                                            </FlexBox>
                                            <FlexBox align="Row" className="UserConfig-InputRow">
                                                <span className="UserConfig-Label">Thermal Effect</span>
                                                <input className="UserConfig-Input" type="number" name="effect" onChange={ onChange(index) } value={ effect.toString() }/>
                                                <span className="UserConfig-Unit">{ "J/g" }</span>
                                            </FlexBox>
                                        </FlexBox>
                                    </div>
                                    { index !== 0 ? <button className="UserConfig-RemoveButton button failure small" onClick={ onRemoveClick.bind(this, index) }>
                                        <img className="UserConfig-RemoveButton" src={ trashIcon } alt="Remove"/>
                                    </button> : null }
                                </FlexBox>
                            ))
                        }
                    </ScrollableContent>
                    <button className="UserConfig-AddButton button success small" onClick={ onAddClick }>
                        Add new range
                    </button>
                </div>
            </div>
        );
    }
}


