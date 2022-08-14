import { IEvent } from '@allejo/bzf-plugin-gen';
import React, { SyntheticEvent, useState } from 'react';

import Events from '../../data/events.json';

interface Props {
  onUpdate(events: IEvent[]): void;
}

type EventName = keyof typeof Events;

const EventSelector = ({ onUpdate }: Props) => {
  const [eventNames, setEventNames] = useState<EventName[]>([]);

  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const currEventName = event.currentTarget.name as EventName;
    let newEventNames: EventName[] = [];

    if (event.currentTarget.checked) {
      newEventNames = [...eventNames, currEventName];
    } else {
      newEventNames.splice(eventNames.indexOf(currEventName), 1);
    }

    newEventNames.sort((a, b) => a.localeCompare(b));
    setEventNames(newEventNames);
    onUpdate(newEventNames.map(eventName => Events[eventName]));
  };

  return (
    <section>
      <p>
        BZFS dispatches events when certain actions happen on the server. Select the events your plug-in will listen to.
      </p>
      <div className="row">
        {Object.keys(Events)
          .sort()
          .map((value, index) => (
            <div className="col-md-6" key={index}>
              <div className="form-check">
                <input type="checkbox" id={value} name={value} className="form-check-input" onChange={handleChange} />
                <label className="form-check-label" htmlFor={value}>
                  {value}
                </label>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default EventSelector;
