import React, { Component } from 'react';
import { ICodeStyle, IEvent, IPlugin, PluginBuilder, PluginWriter } from 'bzf-plugin-gen';

import Accordion from './components/Accordion';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import PluginDefinition, { PluginDefinitionData } from './components/PluginDefinition';
import PluginPreview from './components/PluginPreview';
import PluginCodeStyle from './components/PluginCodeStyle';
import PluginEventSelector from './components/PluginEventSelector';

import styles from './App.module.scss';

interface State {
  openedAccordion: number;
  pluginDef: IPlugin;
}

export default class App extends Component<{}, State> {
  private pluginBuilder: PluginBuilder;

  constructor(props: any) {
    super(props);

    this.pluginBuilder = new PluginBuilder();
    this.state = {
      openedAccordion: 1,
      pluginDef: Object.assign({}, this.pluginBuilder.definition),
    };
  }

  handlePluginDefinition = (data: PluginDefinitionData): void => {
    const def = this.pluginBuilder.definition;

    def.author.copyright = data.pluginAuthor;
    def.author.callsign = data.playerCallsign;
    def.name = data.pluginName;
    def.license = data.pluginLicense;

    this.updatePluginBuild();
  };

  handleCodeStyle = (data: ICodeStyle): void => {
    this.pluginBuilder.definition.codeStyle = data;
    this.updatePluginBuild();
  };

  handleEvents = (data: IEvent[]): void => {
    this.pluginBuilder.definition.eventNames = {};
    data.forEach(value => this.pluginBuilder.addEvent(value));

    this.updatePluginBuild();
  };

  toggleHandler = (index: number): ((isOpen: boolean) => void) => {
    return (isOpen: boolean): void => {
      this.setState({
        openedAccordion: isOpen ? index : -1,
      });
    };
  };

  updatePluginBuild = () => {
    this.setState({
      pluginDef: Object.assign({}, this.pluginBuilder.definition),
    });
  };

  render() {
    const writer = new PluginWriter(this.state.pluginDef);

    return (
      <div className="container">
        <SiteHeader />
        <PluginDefinition onUpdate={this.handlePluginDefinition} />
        <div className={styles.pluginSettings}>
          <div className="row">
            <div className="col-md-6">
              <Accordion
                heading="Code Style"
                isOpen={this.state.openedAccordion === 1}
                onToggle={this.toggleHandler(1)}
              >
                <PluginCodeStyle onUpdate={this.handleCodeStyle} data={this.state.pluginDef.codeStyle} />
              </Accordion>

              <Accordion
                heading="Plug-in Events"
                isOpen={this.state.openedAccordion === 2}
                onToggle={this.toggleHandler(2)}
              >
                <PluginEventSelector onUpdate={this.handleEvents} />
              </Accordion>

              <SiteFooter />
            </div>

            <div className="col-md-6">
              <PluginPreview code={writer.write()} minVersion="2.4.0" filename={writer.getClassName()} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
