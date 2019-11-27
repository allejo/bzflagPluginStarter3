import { IMapObject, MapArgumentType } from '@allejo/bzf-plugin-gen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import update from 'immutability-helper';
import React, { Component, ReactNode } from 'react';
import { Button } from 'reactstrap';

import MapObject from './MapObjectEditor/MapObject';

interface Props {
  onChange: (objects: IMapObject[]) => void;
}

interface State {
  mapObjects: Record<string, IMapObject>;
}

export default class MapObjectEditor extends Component<Props, State> {
  readonly state: State = {
    mapObjects: {
      '1111': {
        uuid: '1111',
        name: 'ahod',
        properties: [
          {
            uuid: '1111-pos',
            name: 'position|pos',
            readonly: true,
            arguments: [
              {
                uuid: '',
                name: 'x_pos',
                type: MapArgumentType.Float,
              },
              {
                uuid: '',
                name: 'y_pos',
                type: MapArgumentType.Float,
              },
              {
                uuid: '',
                name: 'z_pos',
                type: MapArgumentType.Float,
              },
            ],
          },
          {
            uuid: '1111-size',
            name: 'size',
            readonly: true,
            arguments: [
              {
                uuid: '',
                name: 'x_size',
                type: MapArgumentType.Float,
              },
              {
                uuid: '',
                name: 'y_size',
                type: MapArgumentType.Float,
              },
              {
                uuid: '',
                name: 'z_size',
                type: MapArgumentType.Float,
              },
            ],
          },
          {
            uuid: '1111-rot',
            name: 'rotation|rot',
            readonly: true,
            arguments: [
              {
                uuid: '',
                name: 'rotation',
                type: MapArgumentType.Float,
              },
            ],
          },
          {
            uuid: '1111-to',
            name: 'teamonly',
            readonly: false,
            arguments: [],
          },
          {
            uuid: '1111-team',
            name: 'team',
            readonly: false,
            arguments: [
              {
                uuid: '',
                name: 'value',
                type: MapArgumentType.Team,
              },
            ],
          },
        ],
      },
    },
  };

  public _handleMapObjectChange = (data: IMapObject): void => {
    this.setState(({ mapObjects }) => ({
      mapObjects: update(mapObjects, {
        [data.uuid]: {
          $set: data,
        },
      }),
    }));
  };

  public _handleMapObjectDelete = (data: IMapObject): void => {
    this.setState(({ mapObjects }) => ({
      mapObjects: update(mapObjects, {
        $unset: [data.uuid],
      }),
    }));
  };

  public _handleNewMapObject = (): void => {
    const uuid = this.uuidV4();

    this.setState(({ mapObjects }) => ({
      mapObjects: update(mapObjects, {
        [uuid]: {
          $set: {
            uuid: uuid,
            name: 'object',
            properties: [],
          },
        },
      }),
    }));
  };

  public render(): ReactNode {
    const { mapObjects } = this.state;

    return (
      <div>
        <p>
          A plug-in can register custom map objects. These objects have no physical appearance and instead are zones
          visible only to the server.
        </p>

        {Object.entries(mapObjects).map((value: [string, IMapObject]) => (
          <MapObject
            key={value[0]}
            value={value[1]}
            onChange={this._handleMapObjectChange}
            onDelete={this._handleMapObjectDelete}
          />
        ))}

        <Button color="primary" onClick={this._handleNewMapObject}>
          <FontAwesomeIcon icon="plus" className="mr-2" />
          Add Map Object
        </Button>
      </div>
    );
  }

  /**
   * @see https://stackoverflow.com/a/2117523
   */
  private uuidV4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
