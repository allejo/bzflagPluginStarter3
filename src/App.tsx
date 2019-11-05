import React, { Component } from 'react';
import {
  ICodeStyle,
  IEvent,
  ICallback,
  IPlugin,
  ISlashCommand,
  PluginBuilder,
  IFlag,
  IBZDBSetting,
  IPollType,
} from '@allejo/bzf-plugin-gen/dist';
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

import Licenses from './data/licenses.json';
import styles from './App.module.scss';
import PluginCustomFlags from './components/PluginCustomFlags';
import PluginBZDBSettings from './components/PluginBZDBSettings';
import PluginPollType from './components/PluginPollType';

interface State {
  openedAccordion: number;
  pluginDef: IPlugin;
}

export default class App extends Component<{}, State> {
  private readonly pluginBuilder: PluginBuilder;

  constructor(props: any) {
    super(props);

    this.pluginBuilder = new PluginBuilder();
    this.pluginBuilder.definition.license = Licenses.Proprietary;

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

  public _handleCustomFlags = (data: IFlag[]): void => {
    for (const flag in this.pluginBuilder.definition.flags) {
      this.pluginBuilder.removeFlag(flag);
    }

    data.forEach(value => this.pluginBuilder.addFlag(value));

    this.updatePluginBuild();
  };

  public _handleCustomBZDBSettings = (data: IBZDBSetting[]): void => {
    for (const bzdbSetting in this.pluginBuilder.definition.bzdbSettings) {
      this.pluginBuilder.removeBZDBSetting(bzdbSetting);
    }

    data.forEach(value => this.pluginBuilder.addBZDBSetting(value));

    this.updatePluginBuild();
  };

  public _handlePollTypes = (data: IPollType[]): void => {
    for (const pollType in this.pluginBuilder.definition.pollTypes) {
      this.pluginBuilder.removePollType(pollType);
    }

    data.forEach(value => this.pluginBuilder.addPollType(value));

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
    let accordionCount = 0;

    return (
      <div className="container">
        <SiteHeader />
        <PluginDefinition onUpdate={this._handlePluginDefinition} />
        <div className={styles.pluginSettings}>
          <div className="row">
            <div className="col-md-6">
              <Accordion
                heading="Code Style"
                isOpen={this.state.openedAccordion === ++accordionCount}
                onToggle={this._toggleHandler(accordionCount)}
              >
                <PluginCodeStyle onUpdate={this._handleCodeStyle} data={this.state.pluginDef.codeStyle} />
              </Accordion>

              <Accordion
                heading="Plug-in Events"
                isOpen={this.state.openedAccordion === ++accordionCount}
                onToggle={this._toggleHandler(accordionCount)}
              >
                <PluginEventSelector onUpdate={this._handleEvents} />
              </Accordion>

              <Accordion
                heading="Custom BZDB Settings"
                isOpen={this.state.openedAccordion === ++accordionCount}
                onToggle={this._toggleHandler(accordionCount)}
              >
                <PluginBZDBSettings onChange={this._handleCustomBZDBSettings} />
              </Accordion>

              <Accordion
                heading="Custom Callbacks"
                isOpen={this.state.openedAccordion === ++accordionCount}
                onToggle={this._toggleHandler(accordionCount)}
              >
                <PluginGenericCallbacks onChange={this._handleGenericCallbacks} />
              </Accordion>

              <Accordion
                heading="Custom Flags"
                isOpen={this.state.openedAccordion === ++accordionCount}
                onToggle={this._toggleHandler(accordionCount)}
              >
                <PluginCustomFlags onChange={this._handleCustomFlags} />
              </Accordion>

              <Accordion
                heading="Custom Poll Types"
                isOpen={this.state.openedAccordion === ++accordionCount}
                onToggle={this._toggleHandler(accordionCount)}
              >
                <PluginPollType onChange={this._handlePollTypes} />
              </Accordion>

              <Accordion
                heading="Custom Slash Commands"
                isOpen={this.state.openedAccordion === ++accordionCount}
                onToggle={this._toggleHandler(accordionCount)}
              >
                <PluginSlashCommands onChange={this._handleSlashCommands} />
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
