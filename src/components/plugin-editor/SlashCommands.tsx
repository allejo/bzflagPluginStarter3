import { ISlashCommand, PluginBuilder } from '@allejo/bzf-plugin-gen';
import React from 'react';

import FormRepeater from '../common/FormRepeater';

interface Props {
  onChange: (commands: ISlashCommand[]) => void;
}

const SlashCommands = ({ onChange }: Props) => {
  const handleChange = (values: Record<string, string>[]): void => {
    const slashCommands = values.map<ISlashCommand>((value: Record<string, string>) => {
      const slashCommand: ISlashCommand = {
        name: value['slash_command'],
      };

      PluginBuilder.normalizeSlashCommand(slashCommand);

      return slashCommand;
    });

    return onChange(slashCommands);
  };

  const handleDisplayCallback = (value: Record<string, string>): JSX.Element => {
    return <span>/{value['slash_command']}</span>;
  };

  return (
    <div>
      <p>
        Slash commands are the <code>/</code> commands that are used by players and admins. A plug-in can create custom
        slash commands with arbitrary behavior.
      </p>

      <FormRepeater onChange={handleChange} itemRendererCallback={handleDisplayCallback}>
        <label htmlFor="slashcommands" className="form-label">
          Add New Slash Command
        </label>

        <input
          type="text"
          id="slashcommands"
          autoComplete="off"
          className="form-control"
          name="slash_command"
          placeholder="/slashcommand"
          required={true}
        />
      </FormRepeater>
    </div>
  );
};

export default SlashCommands;
