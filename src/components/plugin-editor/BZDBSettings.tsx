import { BZDBType, IBZDBSetting, PluginBuilder } from '@allejo/bzf-plugin-gen/dist';
import React from 'react';

import FormRepeater from '../common/FormRepeater';

interface Props {
  onChange: (settings: IBZDBSetting[]) => void;
}

const BZDBTypes: Record<BZDBType, string> = {
  [BZDBType.Bool]: 'Boolean',
  [BZDBType.Double]: 'Double',
  [BZDBType.Int]: 'Integer',
  [BZDBType.String]: 'String',
};

function castSettingType(type: BZDBType, value: string) {
  switch (type) {
    case BZDBType.Bool:
      return value === 'true';

    case BZDBType.Double:
      return +value;

    case BZDBType.Int:
      return Math.trunc(+value);

    case BZDBType.String:
      return value;
  }
}

const BZDBSettings = ({ onChange }: Props) => {
  const handleChange = (values: Record<string, string>[]): void => {
    return onChange(
      values.map<IBZDBSetting>((value: Record<string, string>) => {
        const type: BZDBType = +value['setting_type'];
        const setting: IBZDBSetting = {
          name: value['setting_name'],
          type: type,
          value: castSettingType(type, value['setting_value']),
        };

        PluginBuilder.normalizeBZDBSetting(setting);

        return setting;
      }),
    );
  };

  const handleDisplayCallback = (value: Record<string, string>): JSX.Element => {
    const type: BZDBType = +value['setting_type'] as BZDBType;

    return (
      <div>
        ({BZDBTypes[type].toLowerCase()}) <strong>{value['setting_name']}</strong> = {value['setting_value']}
      </div>
    );
  };

  return (
    <div>
      <p>Plug-ins can register custom BZDB settings available to the server.</p>

      <FormRepeater onChange={handleChange} itemRendererCallback={handleDisplayCallback}>
        <div className="row">
          <div className="col">
            <label htmlFor="setting_name">Setting Name</label>
            <input
              type="text"
              id="setting_name"
              autoComplete="off"
              className="form-control mt-1"
              name="setting_name"
              required={true}
            />
          </div>

          <div className="col">
            <label htmlFor="setting_type">Type</label>
            <select name="setting_type" id="setting_Type" className="form-control mt-1">
              <option value="" disabled={true} />
              <option value={BZDBType.Bool}>Boolean</option>
              <option value={BZDBType.Double}>Double</option>
              <option value={BZDBType.Int}>Integer</option>
              <option value={BZDBType.String}>String</option>
            </select>
          </div>

          <div className="col">
            <label htmlFor="setting_value">Default Value</label>
            <input
              type="text"
              id="setting_value"
              autoComplete="off"
              className="form-control mt-1"
              name="setting_value"
              required={true}
            />
          </div>
        </div>
      </FormRepeater>
    </div>
  );
};

export default BZDBSettings;
