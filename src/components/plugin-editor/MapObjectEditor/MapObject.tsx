import { IMapObject, IMapProperty } from '@allejo/bzf-plugin-gen';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import produce from 'immer';
import React, { SyntheticEvent } from 'react';
import AutosizeInput from 'react-input-autosize';

import { uuidV4 } from '../../../utilities/common';
import Property from './Property';

import styles from './MapObject.module.scss';

interface Props {
  onChange: (data: IMapObject) => void;
  onDelete: (data: IMapObject) => void;
  value: IMapObject;
}

const MapObject = ({ onChange, onDelete, value }: Props) => {
  const handleObjectName = (data: SyntheticEvent<HTMLInputElement>): void => {
    const updated = produce(value, (draft) => {
      draft.name = data.currentTarget.value;
    });

    onChange(updated);
  };

  const handleObjectDelete = (): void => {
    onDelete(value);
  };

  const handleNewProperty = (): void => {
    const updated = produce(value, (draft) => {
      draft.properties.push({
        uuid: uuidV4(),
        name: 'property',
        arguments: [],
        readonly: false,
      });
    });

    onChange(updated);
  };

  const handlePropertyChange = (data: IMapProperty, index: number): void => {
    const updated = produce(value, (draft) => {
      draft.properties[index] = data;
    });

    onChange(updated);
  };

  const handlePropertyDelete = (data: IMapProperty, index: number): void => {
    const updated = produce(value, (draft) => {
      delete draft.properties[index];
    });

    onChange(updated);
  };

  return (
    <div className={styles.container}>
      <div className="d-flex align-items-center mb-2">
        <div className="flex-grow-1">
          <AutosizeInput value={value.name} className={styles.objectName} onChange={handleObjectName} />
        </div>
        <div className="pl-4">
          <button className={styles.deleteObjectButton} onClick={handleObjectDelete}>
            <FontAwesomeIcon icon={faTrashAlt} />
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
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add New Property
        </button>
      </div>

      <div className="p-2">end</div>
    </div>
  );
};

export default MapObject;
