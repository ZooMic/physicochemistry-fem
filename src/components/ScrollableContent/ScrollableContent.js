import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ScrollableContent.css';

export default class ScrollableContent extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
    };

    static defaultProps = {
        children: null,
        className: '',
    }

    render() {
        const { children, className } = this.props;

        return (
            <div className="ScrollableContent-OuterWrapper">
                <div className={`ScrollableContent-InnerWrapper ${className}`}>
                    { children }
                </div>
            </div>
        );
    }
}


