import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


/** Only for the research purpose, this should be in container not in component */
import { getFileData } from '../../ipc/get-file-data/renderer';

import background from '../../assets/background.jpg';
import './Header.css';

export default class Header extends PureComponent {
    static propTypes = {
        text: PropTypes.string.isRequired,
    };

    static defaultProps = {
        text: "Hello World!",
    };

    onHandleFileResponse(event, file) {
        console.log("File response", file, event);
    }

    render() {
        const { text } = this.props;

        return (
            <header className="Header">
                <h1>{text}</h1>
                <img src={background} alt="background" />
                <button onClick={getFileData.bind(this, this.onHandleFileResponse)} >
                    button name
                </button>
            </header>
        );
    }
}


