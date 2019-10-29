import { IEvent, IParameter } from '@allejo/bzf-plugin-gen';

const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

function fmParse(str: string) {
  const fmRegex = /---\n([\s\S]+)---\n([\s\S]+)/g;
  const matches = fmRegex.exec(str);

  return {
    frontMatter: yaml.load(matches![1]),
    body: matches![2].trim().split('\n')[0],
  };
}

const eventsDir = path.join(__dirname, '..', 'data', 'events');
const events = fs.readdirSync(eventsDir);

const EventDictionary: { [key: string]: IEvent } = {};

for (let i in events) {
  const eventFilename: string = events[i];
  const eventName: string = eventFilename.split('.')[0];
  const fileRaw: string = fs.readFileSync(path.join(eventsDir, eventFilename), 'utf-8');

  if (!eventFilename.match(/\.md$/)) {
    continue;
  }

  const content = fmParse(fileRaw);
  const Parameters: IParameter[] = [];

  for (const name in content.frontMatter.parameters) {
    const parameter: any = content.frontMatter.parameters[name];

    Parameters.push({
      name: parameter.name,
      dataType: parameter.dataType,
      description: parameter.description,
    });
  }

  EventDictionary[eventName] = {
    name: eventName,
    dataType: content.frontMatter.dataType.current,
    description: content.body,
    since: content.frontMatter.dataType.since,
    parameters: Parameters,
  };
}

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'events.json'), JSON.stringify(EventDictionary, null, '\t'));
