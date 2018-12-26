import React, { Component, SyntheticEvent } from 'react';
import { IEvent } from 'bzf-plugin-gen';

import Events from '../data/events.json';

interface Props {
  onUpdate(events: IEvent[]): void;
}

interface State {
  eventNames: string[];
}

type IEventMap = { [key: string]: IEvent };

export default class PluginEventSelector extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      eventNames: [],
    };
  }

  sendEventArrayUp = () => {
    const events: IEvent[] = [];

    this.state.eventNames.forEach(value => {
      events.push((Events as IEventMap)[value]);
    });

    events.sort((a, b) => a.name.localeCompare(b.name));

    this.props.onUpdate(events);
  };

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const events = this.state.eventNames.slice();

    if (event.currentTarget.checked) {
      events.push(event.currentTarget.name);
    } else {
      events.splice(events.indexOf(event.currentTarget.name), 1);
    }

    this.setState(
      {
        eventNames: events,
      },
      () => {
        this.sendEventArrayUp();
      }
    );
  };

  render() {
    const eventCheckboxes = Object.keys(Events).map((value, index) => (
      <div className="col-md-6" key={index}>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            id={value}
            name={value}
            className="custom-control-input"
            onChange={this.handleChange}
          />
          <label className="custom-control-label" htmlFor={value}>
            {value}
          </label>
        </div>
      </div>
    ));

    return (
      <section>
        <p>
          BZFS dispatches events when certain actions happen on the server. Select the events your plug-in will listen
          to.
        </p>
        <div className="row">{eventCheckboxes}</div>
      </section>
    );
  }
}
