import { ILicense } from '@allejo/bzf-plugin-gen';
import React, { useEffect, useMemo, useState } from 'react';

import Licenses from '../data/licenses.json';

export interface PluginDefinitionData {
  [key: string]: any;

  pluginAuthor: string;
  pluginName: string;
  pluginLicense: ILicense;
  playerCallsign: string;
}

interface Props {
  onUpdate(info: PluginDefinitionData): void;
}

type LicenseName = keyof typeof Licenses;

const PluginDefinition = ({ onUpdate }: Props) => {
  const [pluginName, setPluginName] = useState('');
  const [pluginAuthor, setPluginAuthor] = useState('');
  const [pluginLicense, setPluginLicense] = useState(Licenses.Proprietary);
  const [playerCallsign, setPlayerCallsign] = useState('');
  const licenses = useMemo(
    () =>
      Object.values(Licenses).map((license: ILicense, index: number) => (
        <option key={index} value={license.name}>
          {license.name}
        </option>
      )),
    [Licenses],
  );

  useEffect(() => {
    onUpdate({
      pluginName,
      pluginAuthor,
      pluginLicense,
      playerCallsign,
    });
  }, [pluginName, pluginAuthor, pluginLicense, playerCallsign]);

  return (
    <section className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="plugin-name">Plug-in Name</label>
          <input
            type="text"
            id="plugin-name"
            name="pluginName"
            className="form-control"
            placeholder="Sample Plug-in"
            value={pluginName}
            onChange={e => setPluginName(e.currentTarget.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="plugin-author">Plug-in Author</label>
          <input
            type="text"
            id="plugin-author"
            name="pluginAuthor"
            className="form-control"
            placeholder="Jane Doe"
            value={pluginAuthor}
            onChange={e => setPluginAuthor(e.currentTarget.value)}
          />
        </div>
      </div>

      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="plugin-license">Plug-in License</label>
          <select
            className="custom-select"
            id="plugin-license"
            value={pluginLicense.name}
            onChange={e => setPluginLicense(Licenses[e.currentTarget.value as LicenseName])}
          >
            {licenses}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="player-callsign">Player Callsign</label>
          <input
            type="text"
            id="player-callsign"
            name="playerCallsign"
            className="form-control"
            placeholder="allejo"
            value={playerCallsign}
            onChange={e => setPlayerCallsign(e.currentTarget.value)}
          />
        </div>
      </div>
    </section>
  );
};

export default PluginDefinition;
