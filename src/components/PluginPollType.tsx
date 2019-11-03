import React, { Component, ReactNode } from 'react';
import { IPollType, PluginBuilder } from '@allejo/bzf-plugin-gen/dist';
import FormRepeater from './FormRepeater';

interface Props {
  onChange: (pollTypes: IPollType[]) => void;
}

export default class PluginPollType extends Component<Props> {
  public _handleChange = (values: Record<string, string>[]): void => {
    const pollTypes = values.map<IPollType>(value => {
      const pollType = {
        name: value['poll_name'],
      };

      PluginBuilder.normalizePollType(pollType);

      return pollType;
    });

    return this.props.onChange(pollTypes);
  };

  public _handleDisplayCallback = (value: Record<string, string>): JSX.Element => {
    return <span>{value['poll_name']}</span>;
  };

  public render(): ReactNode {
    return (
      <div>
        <p>
          Plug-ins can introduce custom poll types that make it possible to introduce custom{' '}
          <code>/poll &lt;customtype&gt;</code> values.
        </p>

        <FormRepeater onChange={this._handleChange} itemRendererCallback={this._handleDisplayCallback}>
          <label htmlFor="poll_type">Poll Type</label>
          <input
            type="text"
            id="poll_type"
            autoComplete="off"
            className="form-control mt-1"
            name="poll_name"
            required={true}
          />
        </FormRepeater>
      </div>
    );
  }
}
