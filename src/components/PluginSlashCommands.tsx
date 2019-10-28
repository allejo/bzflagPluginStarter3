import React, { Component } from 'react';
import FormRepeater from './FormRepeater';
import { ISlashCommand } from '@allejo/bzf-plugin-gen/dist';

interface Props {
  onChange: (commands: ISlashCommand[]) => void;
}

export default class PluginSlashCommands extends Component<Props> {
  public _handleChange = (values: Record<string, string>[]): void => {
    const slashCommands = values.map<ISlashCommand>((value: Record<string, string>) => ({
      name: value['slash_command'],
    }));

    return this.props.onChange(slashCommands);
  };

  public _handleDisplayCallback = (value: Record<string, string>): JSX.Element => {
    return <span>/{value['slash_command']}</span>;
  };

  public render() {
    return (
      <div>
        <p>
          Slash commands are the <code>/</code> commands that are used by players and admins. A plug-in can create
          custom slash commands with arbitrary behavior.
        </p>

        <FormRepeater onChange={this._handleChange} itemRendererCallback={this._handleDisplayCallback}>
          <label>Add New Slash Command</label>

          <input
            type="text"
            autoComplete="off"
            className="form-control mt-1"
            name="slash_command"
            placeholder="/slashcommand"
          />
        </FormRepeater>
      </div>
    );
  }
}
