import React from 'react';

export const PassengersInput = (props) => {
    return props && props.value && props.handler && props.placeholder &&
            <input
            type="number"
            min="0"
            max="2147483647"
            step="1"
            onChange={ props.handler }
            value={ props.value }
            placeholder={ props.placeholder }
            title={ props.placeholder }
            className={ props.placeholder }
            ></input>
};