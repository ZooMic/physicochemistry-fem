import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FlexBox.css';

export default class FlexBox extends Component {
    static propTypes = {
        children: PropTypes.node,
        align: PropTypes.oneOf(['Row', 'Column']),
        className: PropTypes.string,
    };

    static defaultProps = {
        children: null,
        align: 'Column',
        className: '',
    }

    render() {
        const { children, align, className } = this.props;

        return (
            <div className={`FlexBox-Container ${align} ${className}`}>
                { children }
            </div>
        );
    }
}


