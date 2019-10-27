import React, { Component } from 'react';
import FormRepeater from './FormRepeater';
import { ISlashCommand } from '@allejo/bzf-plugin-gen/dist';

interface Props {
  onChange: (commands: ISlashCommand[]) => void;
}

export default class PluginSlashCommands extends Component<Props> {
  public _handleChange = (values: string[]): void => {
    const slashCommands = values.map<ISlashCommand>((value: string) => ({
      name: value,
    }));

    return this.props.onChange(slashCommands);
  };

  public render() {
    return (
      <div>
        <p>
          Slash commands are the <code>/</code> commands that are used by players and admins. A plug-in can create
          custom slash commands with arbitrary behavior.
        </p>

        <FormRepeater label="Add New Slash Command" onChange={this._handleChange} />
      </div>
    );
  }
}
