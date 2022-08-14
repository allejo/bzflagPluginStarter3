import { IMapObject, MapArgumentType } from '@allejo/bzf-plugin-gen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import produce from 'immer';
import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

import { uuidV4 } from '../../utilities/common';
import MapObject from './MapObjectEditor/MapObject';

interface Props {
  onChange: (objects: IMapObject[]) => void;
}

const MapObjectEditor = ({ onChange }: Props) => {
  const [mapObjects, setMapObjects] = useState<Record<string, IMapObject>>({});

  const handleMapObjectChange = (data: IMapObject): void => {
    const updated = produce(mapObjects, draft => {
      draft[data.uuid] = data;
    });

    setMapObjects(updated);
  };

  const handleMapObjectDelete = (data: IMapObject): void => {
    const updated = produce(mapObjects, draft => {
      delete draft[data.uuid];
    });

    setMapObjects(updated);
  };

  const handleNewMapObject = (): void => {
    const uuid = uuidV4();
    const updated = produce(mapObjects, draft => {
      draft[uuid] = {
        uuid: uuid,
        name: 'object',
        properties: [
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
        ],
      };
    });

    setMapObjects(updated);
  };

  useEffect(() => {
    onChange(Object.values(mapObjects));
  }, [mapObjects]);

  return (
    <div>
      <p>
        A plug-in can register custom map objects. These objects have no physical appearance and instead are zones
        visible only to the server.
      </p>

      {Object.entries(mapObjects).map((value: [string, IMapObject]) => (
        <MapObject key={value[0]} value={value[1]} onChange={handleMapObjectChange} onDelete={handleMapObjectDelete} />
      ))}

      <Button color="primary" onClick={handleNewMapObject}>
        <FontAwesomeIcon icon="plus" className="mr-2" />
        Add Map Object
      </Button>
    </div>
  );
};

export default MapObjectEditor;
