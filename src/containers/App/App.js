import React, { Component } from 'react';

import { TextFilePicker } from '../../components/TextFilePicker';
import './App.css';

/** Right now it does not look like I container but soon there will be some logic. Probably from Electron comunication*/

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
			fileContent: "",
			fileOpened: false,
        };
	};
	
	onFileUpdate({fileContent, fileOpened}) {
		this.setState({
			fileContent,
			fileOpened,
		});
	};

	render() {

		const onFileUpdate = this.onFileUpdate.bind(this);

		return (
			<TextFilePicker callback={ onFileUpdate } />
		);
	}
}


