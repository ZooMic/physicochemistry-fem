import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import specificHeatFileConversion from '../../utilities/specific-heat-file-conversion';

export default class Entalpy extends Component {

    constructor(props) {
        super(props);  
        this.state = {
        };
    };
    static propTypes = {
        specificHeat: PropTypes.array.isRequired,
    };
    static defaultProps = {
        specificHeat: [],
    };

    render() {

        const { specificHeat: sh } = this.props;
        // console.log("Specific heat", sh);

        let result = [];
        let dt = 1;
        
        if (sh.length > 0) {
            for (let i = 0; i < sh.length; i++) {
                if(i == 0) {
                    result.push(sh[i][0] * sh[i][1]);
                } else {
                    for (let j = sh[i - 1][0]; j <= sh[i][0]; j += dt ) {
                        const cp = sh[i - 1][1] +  (j - sh[i - 1][0]) / (sh[i][0] - sh[i - 1][0]) * (sh[i][1] - sh[i - 1][1]);
                        // console.log("CP - ", cp);
                        const h = result[result.length - 1] + cp * dt;
                        result.push(h);
                    }
                }
            }
            console.log("RESULTS", result);
        }
        // console.log(result);

        return (null);
    }
}


