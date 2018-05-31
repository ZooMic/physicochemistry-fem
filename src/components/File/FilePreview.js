import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollableContent } from '../ScrollableContent';
import './FilePreview.css';

export default class FilePreview extends Component {
    static propTypes = {
        fileContent: PropTypes.string,
        className: PropTypes.string,
        wrapperClassName: PropTypes.string,
    };

    static defaultProps = {
        fileContent: '',
        className: '',
        wrapperClassName: '',
    }

    
    render() {
        const { fileContent, className, wrapperClassName } = this.props;

        return (
            <ScrollableContent className={ wrapperClassName }>
                <div className={`FilePreview-Content ${className}`}>
                    { fileContent }
                </div>
            </ScrollableContent>
        );
    }
}


