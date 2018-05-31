import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FileImport.css';

export default class FileImport extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            fileName: "",
            fileContent: "",
            fileOpened: false,
        }

        this.onFileSelectionChanged = this.onFileSelectionChanged.bind(this);
        this.onTrigerFileInputClick = this.onTrigerFileInputClick.bind(this);
    };

    static propTypes = {
        wrapperClassName: PropTypes.string,
        importFileClassName: PropTypes.string,
        fileNameClassName: PropTypes.string,
        callback: PropTypes.func.isRequired,
        selectionText: PropTypes.string,
        noSelectionText: PropTypes.string,
    };

    static defaultProps = {
        wrapperClassName: '',
        importFileClassName: '',
        fileNameClassName: '',
        selectionText: 'Import file...',
        noSelectionText: 'No file selected',
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
        const { onFileSelectionChanged, onTrigerFileInputClick } = this;
        const { wrapperClassName, importFileClassName, fileNameClassName, selectionText, noSelectionText } = this.props;
        const { fileOpened, fileName } = this.state;

        return (
            <div className={`FileImport-Wrapper ${wrapperClassName}`}>
                <div className={`FileImport-FileInput`}>
                    <input className="FileImport-File" type="file" onChange={ onFileSelectionChanged } />
                    <input 
                        className={`FileImport-Button ${importFileClassName}`}
                        type="button"
                        value={ selectionText }
                        onClick={ onTrigerFileInputClick }
                    />
                </div>
                <div className={`FileImport-FileName ${fileNameClassName}`}>{ fileOpened ? fileName : noSelectionText }</div>
            </div>
        );
    }
}


