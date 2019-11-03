import React, { Component } from 'react';
import FormRepeater from './FormRepeater';
import { ICallback } from '@allejo/bzf-plugin-gen/dist';

interface Props {
  onChange: (callbacks: ICallback[]) => void;
}

export default class PluginGenericCallbacks extends Component<Props> {
  public _handleChange = (values: Record<string, string>[]): void => {
    const callbacks = values.map<ICallback>((value: Record<string, string>) => ({
      name: value['callback'],
    }));

    return this.props.onChange(callbacks);
  };

  public _handleDisplayCallback = (value: Record<string, string>): JSX.Element => {
    return <span>{value['callback']}</span>;
  };

  public render(): React.ReactNode {
    return (
      <div>
        <p>
          Callbacks are used to allow plugins to communicate with each other. Transmitting and accepting data happens by
          casting the <code>void*</code> data.
        </p>

        <FormRepeater onChange={this._handleChange} itemRendererCallback={this._handleDisplayCallback}>
          <label htmlFor="callbacks">Add New Callback</label>

          <input
            type="text"
            id="callbacks"
            autoComplete="off"
            className="form-control mt-1"
            name="callback"
            required={true}
          />
        </FormRepeater>
      </div>
    );
  }
}
