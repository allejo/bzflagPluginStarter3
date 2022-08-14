import { FlagType, IFlag, PluginBuilder } from '@allejo/bzf-plugin-gen';
import React from 'react';

import FormRepeater from '../common/FormRepeater';

interface Props {
  onChange: (flags: IFlag[]) => void;
}

const CustomFlags = ({ onChange }: Props) => {
  const handleChange = (values: Record<string, string>[]): void => {
    const flags = values.map<IFlag>((value: Record<string, string>) => {
      const flag: IFlag = {
        name: value['flag_name'],
        abbreviation: value['flag_abbr'],
        helpString: value['flag_desc'],
        type: value['flag_type'] as FlagType,
      };

      PluginBuilder.normalizeFlag(flag);

      return flag;
    });

    return onChange(flags);
  };

  const handleDisplayCallback = (value: Record<string, string>): JSX.Element => {
    return (
      <div>
        <p className="m-0">
          <strong>
            {value['flag_name']} ({value['flag_abbr']}) - {value['flag_type'] === FlagType.Good ? 'Good' : 'Bad'}
          </strong>
        </p>
        <p className="m-0">{value['flag_desc']}</p>
      </div>
    );
  };

  return (
    <div>
      <p>
        Plug-ins allow developers to create custom flags. Functionally, these custom flags are the same Useless flags,
        it is up to the plug-in to give these flags special behavior.
      </p>

      <FormRepeater onChange={handleChange} itemRendererCallback={handleDisplayCallback}>
        <div className="row">
          <div className="col">
            <label htmlFor="flag_name" className="form-label">
              Flag Name
            </label>
            <input
              type="text"
              id="flag_name"
              autoComplete="off"
              className="form-control"
              name="flag_name"
              required={true}
            />
          </div>
          <div className="col">
            <label htmlFor="flag_abbr" className="form-label">
              Flag <abbr title="Abbreviation">Abbr</abbr>
            </label>
            <input
              type="text"
              id="flag_abbr"
              autoComplete="off"
              className="form-control"
              name="flag_abbr"
              maxLength={2}
              required={true}
            />
          </div>
          <div className="col">
            <label htmlFor="flag_type" className="form-label">
              Flag Type
            </label>
            <select name="flag_type" id="flag_type" className="form-control" required={true}>
              <option value="" disabled={true} />
              <option value={FlagType.Good}>Good</option>
              <option value={FlagType.Bad}>Bad</option>
            </select>
          </div>
        </div>
        <div className="mt-2">
          <label htmlFor="flag_desc" className="form-label">
            Flag Description
          </label>
          <input
            type="text"
            id="flag_desc"
            autoComplete="off"
            className="form-control"
            name="flag_desc"
            required={true}
          />
        </div>
      </FormRepeater>
    </div>
  );
};

export default CustomFlags;
