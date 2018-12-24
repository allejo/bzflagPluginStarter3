import React, { Component } from 'react';
import { IPlugin, PluginBuilder, PluginWriter } from 'bzf-plugin-gen';

import SiteHeader from './components/SiteHeader';
import PluginDefinition, { PluginDefinitionData } from './components/PluginDefinition';

interface State {
  pluginDef: IPlugin;
}

class App extends Component<{}, State> {
  private pluginBuilder: PluginBuilder;

  constructor(props: any) {
    super(props);

    this.pluginBuilder = new PluginBuilder();
    this.state = {
      pluginDef: this.pluginBuilder.definition,
    };
  }

  handlePluginDefinition = (data: PluginDefinitionData): void => {
    const def = this.pluginBuilder.definition;

    def.author.copyright = data.pluginAuthor;
    def.author.callsign = data.playerCallsign;
    def.name = data.pluginName;
    def.license = data.pluginLicense;

    this.setState({
      pluginDef: this.pluginBuilder.definition,
    });
  };

  render() {
    const writer = new PluginWriter(this.state.pluginDef);

    return (
      <div className="container">
        <SiteHeader />
        <PluginDefinition onUpdate={this.handlePluginDefinition} />
        <pre>
          <code>{writer.write()}</code>
        </pre>
      </div>
    );
  }
}

export default App;
