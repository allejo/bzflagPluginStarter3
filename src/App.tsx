import {
  IBZDBSetting,
  ICallback,
  ICodeStyle,
  IEvent,
  IFlag,
  IMapObject,
  IPlugin,
  IPollType,
  ISlashCommand,
  PluginBuilder,
} from '@allejo/bzf-plugin-gen/dist';
import React, { Component } from 'react';
import { initialize as initializeGA, pageview as recordPageViewGA } from 'react-ga';
import semver from 'semver';

import styles from './App.module.scss';
import Accordion from './components/common/Accordion';
import BZDBSettings from './components/plugin-editor/BZDBSettings';
import CodeStyle from './components/plugin-editor/CodeStyle';
import CustomFlags from './components/plugin-editor/CustomFlags';
import EventSelector from './components/plugin-editor/EventSelector';
import GenericCallbacks from './components/plugin-editor/GenericCallbacks';
import MapObjectEditor from './components/plugin-editor/MapObjectEditor';
import PollType from './components/plugin-editor/PollType';
import SlashCommands from './components/plugin-editor/SlashCommands';
import UrlHandling from './components/plugin-editor/UrlHandling';
import PluginDefinition, { PluginDefinitionData } from './components/PluginDefinition';
import PluginPreview from './components/PluginPreview';
import Footer from './components/site/Footer';
import Header from './components/site/Header';
import Licenses from './data/licenses.json';

interface State {
  openedAccordion: number;
  pluginDef: IPlugin;
}

const GA_ANALYTICS = process.env.REACT_APP_GA_ANALYTICS ?? '';

if (GA_ANALYTICS) {
  initializeGA(GA_ANALYTICS);
  recordPageViewGA(window.location.pathname + window.location.search);
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

  public _handleUrlJobs = (makesUrlCalls: boolean): void => {
    this.pluginBuilder.definition.makesUrlCalls = makesUrlCalls;
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

  public _handleCustomMapObjects = (data: IMapObject[]): void => {
    for (const mapObject in this.pluginBuilder.definition.mapObjects) {
      this.pluginBuilder.removeMapObject(mapObject);
    }

    data.forEach(value => this.pluginBuilder.addMapObject(value));

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
        <Header />
        <PluginDefinition onUpdate={this._handlePluginDefinition} />
        <div className={styles.pluginSettings}>
          <div className="row">
            <div className="col-md-6">
              <Accordion
                heading="Code Style"
                isOpen={this.state.openedAccordion === ++accordionCount}
                onToggle={this._toggleHandler(accordionCount)}
              >
                <CodeStyle onUpdate={this._handleCodeStyle} data={this.state.pluginDef.codeStyle} />
              </Accordion>

              <Accordion
                heading="Plug-in Events"
                isOpen={this.state.openedAccordion === ++accordionCount}
                onToggle={this._toggleHandler(accordionCount)}
              >
                <EventSelector onUpdate={this._handleEvents} />
              </Accordion>

              <Accordion
                heading="URL Jobs"
                isOpen={this.state.openedAccordion === ++accordionCount}
                onToggle={this._toggleHandler(accordionCount)}
              >
                <UrlHandling onChange={this._handleUrlJobs} />
              </Accordion>

              <Accordion
                heading="Custom BZDB Settings"
                isOpen={this.state.openedAccordion === ++accordionCount}
                onToggle={this._toggleHandler(accordionCount)}
              >
                <BZDBSettings onChange={this._handleCustomBZDBSettings} />
              </Accordion>

              <Accordion
                heading="Custom Callbacks"
                isOpen={this.state.openedAccordion === ++accordionCount}
                onToggle={this._toggleHandler(accordionCount)}
              >
                <GenericCallbacks onChange={this._handleGenericCallbacks} />
              </Accordion>

              <Accordion
                heading="Custom Flags"
                isOpen={this.state.openedAccordion === ++accordionCount}
                onToggle={this._toggleHandler(accordionCount)}
              >
                <CustomFlags onChange={this._handleCustomFlags} />
              </Accordion>

              <Accordion
                heading="Custom Map Objects"
                isOpen={this.state.openedAccordion === ++accordionCount}
                onToggle={this._toggleHandler(accordionCount)}
              >
                <MapObjectEditor onChange={this._handleCustomMapObjects} />
              </Accordion>

              <Accordion
                heading="Custom Poll Types"
                isOpen={this.state.openedAccordion === ++accordionCount}
                onToggle={this._toggleHandler(accordionCount)}
              >
                <PollType onChange={this._handlePollTypes} />
              </Accordion>

              <Accordion
                heading="Custom Slash Commands"
                isOpen={this.state.openedAccordion === ++accordionCount}
                onToggle={this._toggleHandler(accordionCount)}
              >
                <SlashCommands onChange={this._handleSlashCommands} />
              </Accordion>

              <Footer />
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
