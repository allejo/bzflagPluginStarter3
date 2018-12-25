import React, {Component, SyntheticEvent} from 'react';
import { IEvent } from 'bzf-plugin-gen';
import Accordion from "./Accordion";

import Events from '../data/events.json';

interface Props {
  onUpdate(events: IEvent[]): void;
}

interface State {
  events: string[];
}

type IEventMap = { [key: string]: IEvent };

export default class PluginEventSelector extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      events: [],
    }
  }

  sendEventArrayUp = () => {
    const events: IEvent[] = [];

    this.state.events.forEach(value => {
      events.push((Events as IEventMap)[value]);
    });

    events.sort((a, b) => a.name.localeCompare(b.name));

    this.props.onUpdate(events);
  };

  handleCoreChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const events = this.state.events.slice();

    if (event.currentTarget.checked) {
      events.push(event.currentTarget.name);
    } else {
      events.splice(events.indexOf(event.currentTarget.name), 1);
    }

    this.setState({
      events
    }, () => {
      this.sendEventArrayUp();
    });
  };

  render() {
    const eventCheckboxes = Object.keys(Events).map(((value, index) => (
      <div className="col-md-6" key={index}>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            id={value}
            name={value}
            className="custom-control-input"
            onChange={this.handleCoreChange}
          />
          <label className="custom-control-label" htmlFor={value}>
            {value}
          </label>
        </div>
      </div>
    )));

    return (
      <Accordion isOpen={true} heading="Plug-in Events">
        <p>
          BZFS dispatches events when certain actions happen on the server. Select the events your plug-in will listen
          to.
        </p>
        <div className="row">
          {eventCheckboxes}
        </div>
      </Accordion>
    );
  }
}
