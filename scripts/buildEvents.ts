import { IEvent } from '@allejo/bzf-plugin-gen';

const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

const eventsDir = path.join(__dirname, '..', 'data', 'events');
const events = fs.readdirSync(eventsDir);

const EventDictionary: { [key: string]: IEvent } = {};
const EventsThatExtend: { [key: string]: Record<string, any> } = {};

function fmParse(str: string) {
  const fmRegex = /---\n([\s\S]+)---\n([\s\S]+)/g;
  const matches = fmRegex.exec(str);

  return {
    frontMatter: yaml.load(matches![1]),
    body: matches![2].trim().split('\n')[0],
  };
}

function buildEvent(eventName: string, content: Record<string, any>): void {
  EventDictionary[eventName] = {
    name: eventName,
    dataType: content.frontMatter.dataType.current,
    description: content.body,
    since: content.frontMatter.dataType.since,
    parameters: content.frontMatter.parameters.map((parameter: any) => ({
      name: parameter.name,
      dataType: parameter.dataType,
      description: parameter.description,
    })),
  };
}

for (let i in events) {
  const eventFilename: string = events[i];
  const eventName: string = eventFilename.split('.')[0];
  const fileRaw: string = fs.readFileSync(path.join(eventsDir, eventFilename), 'utf-8');

  if (!eventFilename.match(/\.md$/)) {
    continue;
  }

  const content = fmParse(fileRaw);

  if (content.frontMatter._extends !== undefined) {
    EventsThatExtend[eventName] = content;
    continue;
  }

  buildEvent(eventName, content);
}

for (const eventsThatExtendKey in EventsThatExtend) {
  const content = EventsThatExtend[eventsThatExtendKey];
  type IEventKey = keyof IEvent;

  Object.entries<IEventKey[]>(content.frontMatter._extends).forEach(
    ([eventName, keys]: [string, IEventKey[]]) => {
      keys.forEach(key  => {
        content.frontMatter[key] = EventDictionary[eventName][key];
      });
    }
  );

  buildEvent(eventsThatExtendKey, content);
}

fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'data', 'events.json'),
  JSON.stringify(EventDictionary, null, '\t')
);
