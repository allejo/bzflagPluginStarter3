import { IMapObject, MapArgumentType } from '@allejo/bzf-plugin-gen';
import { IMapProperty } from '@allejo/bzf-plugin-gen/dist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import update from 'immutability-helper';
import React, { Component, ReactNode } from 'react';
import { Button } from 'reactstrap';

import { uuidV4 } from '../../utilities/common';
import MapObject from './MapObjectEditor/MapObject';

interface Props {
  onChange: (objects: IMapObject[]) => void;
}

interface State {
  mapObjects: Record<string, IMapObject>;
}

export default class MapObjectEditor extends Component<Props, State> {
  readonly state: State = {
    mapObjects: {},
  };

  public _handleMapObjectChange = (data: IMapObject): void => {
    this.setState(
      update(this.state, {
        mapObjects: {
          [data.uuid]: {
            $set: data,
          },
        },
      }),
      this.liftMapObjectInventory,
    );
  };

  public _handleMapObjectDelete = (data: IMapObject): void => {
    this.setState(
      update(this.state, {
        mapObjects: {
          $unset: [data.uuid],
        },
      }),
      this.liftMapObjectInventory,
    );
  };

  public _handleNewMapObject = (): void => {
    const uuid = uuidV4();

    this.setState(
      update(this.state, {
        mapObjects: {
          [uuid]: {
            $set: this.defaultObject(uuid),
          },
        },
      }),
      this.liftMapObjectInventory,
    );
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

  private liftMapObjectInventory = (): void => {
    this.props.onChange(Object.values(this.state.mapObjects));
  };

  private defaultObject = (uuid: string): IMapObject => ({
    uuid: uuid,
    name: 'object',
    properties: this.defaultProperties(),
  });

  private defaultProperties = (): IMapProperty[] => [
    {
      uuid: uuidV4(),
      name: 'position|pos',
      readonly: true,
      arguments: [
        {
          uuid: uuidV4(),
          name: 'x_pos',
          type: MapArgumentType.Float,
        },
        {
          uuid: uuidV4(),
          name: 'y_pos',
          type: MapArgumentType.Float,
        },
        {
          uuid: uuidV4(),
          name: 'z_pos',
          type: MapArgumentType.Float,
        },
      ],
    },
    {
      uuid: uuidV4(),
      name: 'size',
      readonly: true,
      arguments: [
        {
          uuid: uuidV4(),
          name: 'x_size',
          type: MapArgumentType.Float,
        },
        {
          uuid: uuidV4(),
          name: 'y_size',
          type: MapArgumentType.Float,
        },
        {
          uuid: uuidV4(),
          name: 'z_size',
          type: MapArgumentType.Float,
        },
      ],
    },
    {
      uuid: uuidV4(),
      name: 'rotation|rot',
      readonly: true,
      arguments: [
        {
          uuid: uuidV4(),
          name: 'rotation',
          type: MapArgumentType.Float,
        },
      ],
    },
  ];
}
