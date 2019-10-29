import React, { Component } from 'react';
import { ICodeStyle, IEvent, ICallback, IPlugin, ISlashCommand, PluginBuilder } from '@allejo/bzf-plugin-gen/dist';
import semver from 'semver';

import Accordion from './components/Accordion';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import PluginDefinition, { PluginDefinitionData } from './components/PluginDefinition';
import PluginPreview from './components/PluginPreview';
import PluginCodeStyle from './components/PluginCodeStyle';
import PluginEventSelector from './components/PluginEventSelector';
import PluginGenericCallbacks from './components/PluginGenericCallbacks';
import PluginSlashCommands from './components/PluginSlashCommands';

import styles from './App.module.scss';

interface State {
  openedAccordion: number;
  pluginDef: IPlugin;
}

export default class App extends Component<{}, State> {
  private readonly pluginBuilder: PluginBuilder;

  constructor(props: any) {
    super(props);

    this.pluginBuilder = new PluginBuilder();
    this.state = {
      openedAccordion: 1,
      pluginDef: Object.assign({}, this.pluginBuilder.definition),
    };
  }

  public _getMinimumVersion = (): string => {
    const events: IEvent[] = Object.values(this.pluginBuilder.definition.events);
    const versions: IEvent[] = events.sort((a: IEvent, b: IEvent) => {
      return semver.gt(b.since, a.since) ? 1 : -1;
    });

    if (versions.length > 0) {
      return versions[0].since;
    }

    return '2.4.0';
  };

  public _handlePluginDefinition = (data: PluginDefinitionData): void => {
    const def = this.pluginBuilder.definition;

    def.author.copyright = data.pluginAuthor;
    def.author.callsign = data.playerCallsign;
    def.name = data.pluginName;
    def.license = data.pluginLicense;

    this.updatePluginBuild();
  };

  public _handleCodeStyle = (data: ICodeStyle): void => {
    this.pluginBuilder.definition.codeStyle = data;
    this.updatePluginBuild();
  };

  public _handleEvents = (data: IEvent[]): void => {
    for (const definition in this.pluginBuilder.definition.events) {
      this.pluginBuilder.removeEvent(definition);
    }

    data.forEach(value => this.pluginBuilder.addEvent(value));

    this.updatePluginBuild();
  };

  public _handleSlashCommands = (data: ISlashCommand[]): void => {
    for (const command in this.pluginBuilder.definition.slashCommands) {
      this.pluginBuilder.removeSlashCommand(command);
    }

    data.forEach(value => this.pluginBuilder.addSlashCommand(value));

    this.updatePluginBuild();
  };

  public _handleGenericCallbacks = (data: ICallback[]): void => {
    for (const callback in this.pluginBuilder.definition.callbacks) {
      this.pluginBuilder.removeCallback(callback);
    }

    data.forEach(value => this.pluginBuilder.addCallback(value));

    this.updatePluginBuild();
  };

  public _toggleHandler = (index: number): ((isOpen: boolean) => void) => {
    return (isOpen: boolean): void => {
      this.setState({
        openedAccordion: isOpen ? index : -1,
      });
    };
  };

  private updatePluginBuild = () => {
    this.setState({
      pluginDef: Object.assign({}, this.pluginBuilder.definition),
    });
  };

  public render(): React.ReactNode {
    return (
      <div className="container">
        <SiteHeader />
        <PluginDefinition onUpdate={this._handlePluginDefinition} />
        <div className={styles.pluginSettings}>
          <div className="row">
            <div className="col-md-6">
              <Accordion
                heading="Code Style"
                isOpen={this.state.openedAccordion === 1}
                onToggle={this._toggleHandler(1)}
              >
                <PluginCodeStyle onUpdate={this._handleCodeStyle} data={this.state.pluginDef.codeStyle} />
              </Accordion>

              <Accordion
                heading="Plug-in Events"
                isOpen={this.state.openedAccordion === 2}
                onToggle={this._toggleHandler(2)}
              >
                <PluginEventSelector onUpdate={this._handleEvents} />
              </Accordion>

              <Accordion
                heading="Custom Slash Commands"
                isOpen={this.state.openedAccordion === 3}
                onToggle={this._toggleHandler(3)}
              >
                <PluginSlashCommands onChange={this._handleSlashCommands} />
              </Accordion>

              <Accordion
                heading="Custom Callbacks"
                isOpen={this.state.openedAccordion === 4}
                onToggle={this._toggleHandler(4)}
              >
                <PluginGenericCallbacks onChange={this._handleGenericCallbacks} />
              </Accordion>

              <SiteFooter />
            </div>

            <div className="col-md-6">
              <PluginPreview pluginDef={this.state.pluginDef} minVersion={this._getMinimumVersion()} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
