import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TextFilePicker.css';

export default class TextFilePicker extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            fileName: "",
            fileContent: "",
            fileOpened: false,
        }
    };

    static propTypes = {
        callback: PropTypes.func,
        correct: PropTypes.bool,
    };

    static defaultProps = {
        callback: null,
        correct: false,
    }

    onFileSelectionChanged (event) {
        const { callback } = this.props;
        const file = event.target.files[0];
        const fileReader = new FileReader();

        let data = {
            fileName: "",
            fileContent: "",
            fileOpened: false, 
        };

        if (file !== undefined) {
            const fileName = file.name;

            const handleFileRead = () => {
                const fileContent = fileReader.result;

                data = {
                    fileName,
                    fileContent,
                    fileOpened: true,
                }

                if(callback) {
                    callback(data);
                }
    
                this.setState(data);
            }
    
            fileReader.onloadend = handleFileRead.bind(this);
            fileReader.readAsText(file);
        } else {

            if (callback) {
                callback(data);
            }

            this.setState(data);
        }        
    };

    onTrigerFileInputClick(event) {
        const children = event.target.parentNode.children;

        const fileInput = children.item('type', 'file');

        fileInput.click();
    }

    render() {
        const onFileSelectionChanged = this.onFileSelectionChanged.bind(this);
        const onTrigerFileInputClick = this.onTrigerFileInputClick.bind(this);

        const { fileContent, fileOpened, fileName } = this.state;
        const { correct } = this.props;

        return (
            <div className={ `TextFilePicker-Body ${ correct ? "green" : "red" }` }>
                <div className="TextFilePicker-FileInput">
                    <input className="hidden" name="file-selection" type="file" onChange={ onFileSelectionChanged } />
                    <input className="TextFilePicker-Input" type="button" value="Import file..." onClick={ onTrigerFileInputClick } />
                </div>
                <div className="TextFilePicker-FileName">{ fileOpened ? fileName : "No file selected" }</div>
                { fileOpened ? 
                    <div className="TextFilePicker-FileContent-isWrapper">
                        <div className="TextFilePicker-FileContent">{ fileContent }</div>
                    </div> : null }
            </div>
        );
    }
}


