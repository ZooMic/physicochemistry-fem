import React, { Component } from 'react';

import { FilePreview } from '../../components/File';
import './Calculations.css';

export default class Calculations extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    };
	
	render() {

		return (
			<div>
                <span>Calculations result</span>
                <FilePreview />
                <button>Export to file</button>
            </div>
		);
	}
}


