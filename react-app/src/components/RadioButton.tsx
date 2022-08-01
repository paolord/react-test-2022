import React, { useState } from 'react';
import { labelStatus, RadioButtonProps } from '../types/components';

function RadioButton(props: RadioButtonProps) {
  let additionalProps = {};
  if (!props.enabled) {
    additionalProps = {
      checked: false
    };
  }
  if (props.reset) {
    additionalProps = {
      checked: false
    };
  }

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name={props.groupName}
        id={props.itemId}
        {...additionalProps}
        disabled={!props.enabled}
        onClick={() => props.clickHandler(props.itemId) } />
      <label
        className={`form-check-label ${props.enabled ? labelStatus.enabled : labelStatus.disabled}`}
        htmlFor={props.itemId}>
        {props.itemName}
      </label>
    </div>
  );
}

export default RadioButton;