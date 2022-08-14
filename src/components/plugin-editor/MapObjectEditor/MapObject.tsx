import { IMapObject, IMapProperty } from '@allejo/bzf-plugin-gen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import update from 'immutability-helper';
import React, { SyntheticEvent } from 'react';
import AutosizeInput from 'react-input-autosize';

import { uuidV4 } from '../../../utilities/common';
import styles from './MapObject.module.scss';
import Property from './Property';

interface Props {
  onChange: (data: IMapObject) => void;
  onDelete: (data: IMapObject) => void;
  value: IMapObject;
}

const MapObject = ({ onChange, onDelete, value }: Props) => {
  const handleObjectName = (data: SyntheticEvent<HTMLInputElement>): void => {
    onChange(
      update(value, {
        name: {
          $set: data.currentTarget.value,
        },
      }),
    );
  };

  const handleObjectDelete = (): void => {
    onDelete(value);
  };

  const handleNewProperty = (): void => {
    onChange(
      update(value, {
        properties: {
          $push: [
            {
              uuid: uuidV4(),
              name: 'property',
              arguments: [],
              readonly: false,
            },
          ],
        },
      }),
    );
  };

  const handlePropertyChange = (data: IMapProperty, index: number): void => {
    onChange(
      update(value, {
        properties: {
          $splice: [[index, 1, data]],
        },
      }),
    );
  };

  const handlePropertyDelete = (data: IMapProperty, index: number): void => {
    onChange(
      update(value, {
        properties: {
          $splice: [[index, 1]],
        },
      }),
    );
  };

  return (
    <div className={styles.container}>
      <div className="d-flex align-items-center mb-2">
        <div className="flex-grow-1">
          <AutosizeInput value={value.name} className={styles.objectName} onChange={handleObjectName} />
        </div>
        <div className="pl-4">
          <button className={styles.deleteObjectButton} onClick={handleObjectDelete}>
            <FontAwesomeIcon icon="trash-alt" />
            <span className="sr-only">Delete the "{value.name}" map object</span>
          </button>
        </div>
      </div>

      <div>
        <ul className={styles.propertyList}>
          {value.properties.map((property: IMapProperty, index: number) => (
            <Property
              key={property.uuid}
              index={index}
              value={property}
              onChange={handlePropertyChange}
              onDelete={handlePropertyDelete}
            />
          ))}
        </ul>

        <button className={styles.addPropertyButton} onClick={handleNewProperty}>
          <FontAwesomeIcon icon="plus" className="mr-2" />
          Add New Property
        </button>
      </div>

      <div className="p-2">end</div>
    </div>
  );
};

export default MapObject;
