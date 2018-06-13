import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scatter } from 'react-chartjs-2';
import { FlexBox } from '../FlexBox';
import { ScrollableContent } from '../ScrollableContent';
import trashIcon from '../../assets/trash-icon.png';
import chartIcon from '../../assets/chart-icon.png';
import crossIcon from '../../assets/cross-icon.png';
import './UserConfig.css';
import '../../index.css';


export default class UserConfig extends Component {
    constructor(props) {
        super(props);

        this.state = {
            previewChart: {
                visible: false,
            },
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.onFunctionInputChange = this.onFunctionInputChange.bind(this);
    }

    static propTypes = {
        inputs: PropTypes.array.isRequired,
        functionInputs: PropTypes.array.isRequired,
        className: PropTypes.string,
        onUpdateInputs: PropTypes.func.isRequired,
        onUpdateFunctionInputs: PropTypes.func.isRequired,
        onAddClick: PropTypes.func.isRequired,
        onRemoveClick: PropTypes.func.isRequired,
        onAddFunctionClick: PropTypes.func.isRequired,
        onRemoveFunctionClick: PropTypes.func.isRequired,
    };

    static defaultProps = {
        className: '',
        isDisabled: true,
    }

    onFunctionInputChange(index) {
        const { onUpdateFunctionInputs, functionInputs } = this.props;

        return (event) => {
            if (event && event.target && functionInputs[index]) {

                let { functionFormula, functionName, rangeMin, rangeMax, functionActive } = functionInputs[index];

                functionFormula = event.target.name === "functionFormula" ? event.target.value : functionFormula;
                functionName = event.target.name === "functionName" ? event.target.value : functionName;
                rangeMin = event.target.name === "rangeMin" ? Number(event.target.value) : rangeMin;
                rangeMax = event.target.name === "rangeMax" ? Number(event.target.value) : rangeMax;
                functionActive = event.target.name === "functionActive" ? !functionActive : functionActive;

                onUpdateFunctionInputs({
                    index,
                    functionFormula,
                    functionName,
                    rangeMin,
                    rangeMax,
                    functionActive,
                });
            }
        };
    }

    onInputChange(index) {

        const { onUpdateInputs, inputs } = this.props;

        return (event) => {
            if (event && event.target && inputs[index]) {

                let { min, max, effect } = inputs[index];

                min = event.target.name === "min" ? Number(event.target.value) : min;
                max = event.target.name === "max" ? Number(event.target.value) : max;
                effect = event.target.name === "effect" ? Number(event.target.value) : effect;

                onUpdateInputs({
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

    onRemoveFunctionClick(index) {
        const { onRemoveFunctionClick: updateRemove } = this.props;
        updateRemove(index);
    }

    onPreviewClicked(index) {
        const elementsNumber = 1000;
        const { functionInputs } = this.props;
        const { functionFormula, functionName, rangeMin, rangeMax } = functionInputs[index];

        const dx = (rangeMax - rangeMin) / elementsNumber;
        const arr = [];
        const newFormula = "return (x) => { return " + functionFormula + "; };";
        const createF = Function(newFormula);
        const f = createF();
        
        for (let i = rangeMin; i <= rangeMax; i++) {
            arr.push({
                x: i,
                y: f(i),
            });
        }

        const data = {
            datasets: [{
                label: "",
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: '#000000',
                data: arr,
            }],
        }

        const options = {
            maintainAspectRatio: false,
            showLines: true,
            fill: false,
            scales: {
                xAxes:[{
                    scaleLabel: {
                        display: true,
                        labelString: 'X',
                    }
                }],
                yAxes:[{
                    scaleLabel: {
                        display: true,
                        labelString: 'Y',
                    }
                }],
            },
        }

        this.setState({
            previewChart: {
                data,
                options,
                visible: true,
            },
        });
    }

    onClosePreview() {
        this.setState({
            previewChart: {
                visible: false,
            },
        });
    }

    render() {
        const { onInputChange, onFunctionInputChange, onRemoveClick, onRemoveFunctionClick, onPreviewClicked, onClosePreview } = this;
        const { inputs, functionInputs, onAddClick, onAddFunctionClick } = this.props;
        const { previewChart } = this.state;
        const { visible, data, options } = previewChart;

        return (
            <div className="UserConfig-Wrapper">
                <div className="UserConfig-Header area success">Enter function</div>
                <div className="UserConfig-Content">
                    <ScrollableContent className="UserConfig-ScrollableContent content success">
                        {
                            functionInputs.map(({functionFormula, functionName, rangeMin, rangeMax, functionActive}, index) => (
                                <FlexBox align="Row" key={`UserConfig-Input-${index}`} className="UserConfig-Inputs-FlexBoxWrapper">
                                    <div className="UserConfig-Inputs content success">
                                        <FlexBox align="Column">
                                            <FlexBox align="Row" className="UserConfig-InputRow">
                                                <span className="UserConfig-Label">Function formula</span>
                                                <input className="UserConfig-Input long" type="text" name="functionFormula" onChange={ onFunctionInputChange(index) } value={ functionFormula }/>
                                            </FlexBox>
                                            <FlexBox align="Row" className="UserConfig-InputRow">
                                                <span className="UserConfig-Label">Name</span>
                                                <input className="UserConfig-Input long" type="text" name="functionName" onChange={ onFunctionInputChange(index) } value={ functionName }/>
                                            </FlexBox>
                                            <FlexBox align="Row" className="UserConfig-InputRow">
                                                <span className="UserConfig-Label">Range MIN</span>
                                                <input className="UserConfig-Input long" type="number" name="rangeMin" onChange={ onFunctionInputChange(index) } value={ rangeMin.toString() }/>
                                            </FlexBox>
                                            <FlexBox align="Row" className="UserConfig-InputRow">
                                                <span className="UserConfig-Label">Range MAX</span>
                                                <input className="UserConfig-Input long" type="number" name="rangeMax" onChange={ onFunctionInputChange(index) } value={ rangeMax.toString() }/>
                                            </FlexBox>
                                            <FlexBox align="Row" className="UserConfig-InputRow">
                                                <span className="UserConfig-Label">Active</span>
                                                <input className="UserConfig-Input long" type="checkbox" name="functionActive" onChange={ onFunctionInputChange(index) } value={''} checked={ functionActive } />
                                            </FlexBox>
                                        </FlexBox>
                                    </div>
                                    <FlexBox align="Column">
                                    <button className="UserConfig-OperationButton button success small" onClick={ onPreviewClicked.bind(this, index) }>
                                        <img className="UserConfig-ChartButton" src={ chartIcon } alt="Prev"/>
                                    </button>
                                    { index !== 0 ? <button className="UserConfig-OperationButton button failure small" onClick={ onRemoveFunctionClick.bind(this, index) }>
                                        <img className="UserConfig-RemoveButton" src={ trashIcon } alt="Remove"/>
                                    </button> : null }
                                    </FlexBox>
                                </FlexBox>
                            ))
                        }
                    </ScrollableContent>
                    <button className="UserConfig-AddButton button success small" onClick={ onAddFunctionClick }>
                        Add new function
                    </button>
                </div>
                <div className="UserConfig-Header area success">Enter the data</div>
                <div className="UserConfig-Content">
                    <ScrollableContent className="UserConfig-ScrollableContent content success">
                        {
                            inputs.map(({min, max, effect}, index) => (
                                <FlexBox align="Row" key={`UserConfig-Input-${index}`} className="UserConfig-Inputs-FlexBoxWrapper">
                                    <div className={`UserConfig-Inputs ${ index === 0 ? 'FirstChild' : '' } content success`}>
                                        <FlexBox align="Column">
                                            <FlexBox align="Row" className="UserConfig-InputRow">
                                                <span className="UserConfig-Label">Min</span>
                                                <input className="UserConfig-Input" type="number" name="min" onChange={ onInputChange(index) } value={ min.toString() }/>
                                                <span className="UserConfig-Unit">{ "\u2103" }</span>
                                            </FlexBox>
                                            <FlexBox align="Row" className="UserConfig-InputRow">
                                                <span className="UserConfig-Label">Max</span>
                                                <input className="UserConfig-Input" type="number" name="max" onChange={ onInputChange(index) } value={ max.toString() }/>
                                                <span className="UserConfig-Unit">{ "\u2103" }</span>
                                            </FlexBox>
                                            <FlexBox align="Row" className="UserConfig-InputRow">
                                                <span className="UserConfig-Label">Thermal Effect</span>
                                                <input className="UserConfig-Input" type="number" name="effect" onChange={ onInputChange(index) } value={ effect.toString() }/>
                                                <span className="UserConfig-Unit">{ "J/g" }</span>
                                            </FlexBox>
                                        </FlexBox>
                                    </div>
                                    { index !== 0 ? <button className="UserConfig-OperationButton button failure small" onClick={ onRemoveClick.bind(this, index) }>
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
                { visible && <div className="UserConfig-Preview content success">
                    <FlexBox align="Column" className="UserConfig-PreviewHeaderWrapper"> 
                        <button className="UserConfig-CrossButton button failure small" onClick={ onClosePreview.bind(this) }>
                            <img className="UserConfig-RemoveButton" src={ crossIcon } alt="Close"/>
                        </button>
                        <Scatter data={data} options={options}/>
                    </FlexBox>
                </div>}
            </div>
        );
    }
}


