import React, { Component, SyntheticEvent } from 'react';
import { ILicense } from '@allejo/bzf-plugin-gen';
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

interface State {
  info: PluginDefinitionData;
}

type ILicenseMap = { [key: string]: ILicense };

export default class PluginDefinition extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      info: {
        pluginName: '',
        pluginAuthor: '',
        pluginLicense: Licenses.Proprietary,
        playerCallsign: '',
      },
    };
  }

  handleChange = (event: SyntheticEvent<HTMLInputElement | HTMLSelectElement>) => {
    const info = Object.assign({}, this.state.info);

    if (event.currentTarget instanceof HTMLInputElement) {
      info[event.currentTarget.name] = event.currentTarget.value;
    } else if (event.currentTarget instanceof HTMLSelectElement) {
      info.pluginLicense = (Licenses as ILicenseMap)[event.currentTarget.value];
    }

    this.setState({
      info,
    });

    this.props.onUpdate(info);
  };

  render() {
    const licenses = Object.values(Licenses).map((license: ILicense, index: number) => (
      <option key={index} value={license.name}>
        {license.name}
      </option>
    ));

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
              value={this.state.info.pluginName}
              onChange={this.handleChange}
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
              value={this.state.info.pluginAuthor}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="plugin-license">Plug-in License</label>
            <select
              className="custom-select"
              id="plugin-license"
              value={this.state.info.pluginLicense.name}
              onChange={this.handleChange}
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
              value={this.state.info.playerCallsign}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </section>
    );
  }
}
