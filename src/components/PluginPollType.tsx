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
        parameters: value['poll_params'].split(' '),
      };

      PluginBuilder.normalizePollType(pollType);

      return pollType;
    });

    return this.props.onChange(pollTypes);
  };

  public _handleDisplayCallback = (value: Record<string, string>): JSX.Element => {
    return (
      <p className="m-0">
        <span>/poll</span> <span>{value['poll_name']}</span>{' '}
        {value['poll_params'].split(' ').map(param => (
          <>
            <code>&lt;{param}&gt;</code>{' '}
          </>
        ))}
      </p>
    );
  };

  public render(): ReactNode {
    return (
      <div>
        <p>
          Plug-ins can introduce custom poll types that make it possible to introduce custom{' '}
          <code>/poll &lt;type&gt; &lt;params&gt;</code> values.
        </p>

        <FormRepeater onChange={this._handleChange} itemRendererCallback={this._handleDisplayCallback}>
          <div className="row">
            <div className="col">
              <label htmlFor="poll_type">Poll Type</label>
              <input
                type="text"
                id="poll_type"
                autoComplete="off"
                className="form-control mt-1"
                name="poll_name"
                required={true}
              />
            </div>
            <div className="col">
              <label htmlFor="poll_params">Parameters</label>
              <input
                type="text"
                id="poll_params"
                autoComplete="off"
                className="form-control mt-1"
                name="poll_params"
                required={true}
              />
            </div>
          </div>
        </FormRepeater>
      </div>
    );
  }
}
