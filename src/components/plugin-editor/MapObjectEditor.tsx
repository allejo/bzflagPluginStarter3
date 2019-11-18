import { IMapObject, MapArgumentType } from '@allejo/bzf-plugin-gen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Map, fromJS } from 'immutable';
import React, { Component, ReactNode } from 'react';
import { Button } from 'reactstrap';

import { IImmutable } from '../../utilities/IImmutable';
import MapObject from './MapObjectEditor/MapObject';

interface Props {
  onChange: (objects: IMapObject[]) => void;
}

interface State {
  mapObjects: Map<string, IImmutable<IMapObject>>;
}

export default class MapObjectEditor extends Component<Props, State> {
  readonly state: State = {
    mapObjects: fromJS({
      '1111': {
        uuid: '1111',
        name: 'ahod',
        properties: [
          {
            uuid: '',
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
            uuid: '',
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
            uuid: '',
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
            uuid: '',
            name: 'teamonly',
            readonly: false,
            arguments: [],
          },
          {
            uuid: '',
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
    }),
  };

  public _handleMapObjectChange = (data: IImmutable<IMapObject>): void => {
    this.setState(({ mapObjects }) => ({
      mapObjects: mapObjects.set(data.get('uuid'), data),
    }));
  };

  public _handleMapObjectDelete = (data: IImmutable<IMapObject>): void => {
    this.setState(({ mapObjects }) => ({
      mapObjects: mapObjects.delete(data.get('uuid')),
    }));
  };

  public _handleNewMapObject = (): void => {
    const uuid = this.uuidV4();

    this.setState(({ mapObjects }) => ({
      mapObjects: mapObjects.set(
        uuid,
        fromJS({
          uuid: uuid,
          name: 'object',
          properties: [],
        }),
      ),
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

        {mapObjects.toArray().map((value: [string, IImmutable<IMapObject>]) => (
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
