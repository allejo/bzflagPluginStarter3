import React, { Component, ReactNode, SyntheticEvent } from 'react';

interface Props {
  onChange(makesUrlCalls: boolean): void;
}

export default class UrlHandling extends Component<Props> {
  public _handleCheckbox = (e: SyntheticEvent<HTMLInputElement>): void => {
    this.props.onChange(e.currentTarget.checked);
  };

  public render(): ReactNode {
    return (
      <div>
        <p>
          Plug-ins will sometimes need to make calls to URL endpoints to either retrieve or post data. When this is
          needed, your plugin needs to implement certain callbacks.
        </p>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            id="makes-url-calls"
            className="custom-control-input"
            onChange={this._handleCheckbox}
          />
          <label htmlFor="makes-url-calls" className="custom-control-label">
            Makes URL Calls
          </label>
        </div>
      </div>
    );
  }
}
