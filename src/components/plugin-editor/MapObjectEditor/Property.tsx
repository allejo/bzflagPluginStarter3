import { IMapProperty } from '@allejo/bzf-plugin-gen';
import { IMapPropertyArgument, MapArgumentType } from '@allejo/bzf-plugin-gen/dist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import produce from 'immer';
import React, { SyntheticEvent } from 'react';
import AutosizeInput from 'react-input-autosize';

import { uuidV4 } from '../../../utilities/common';
import Argument from './Argument';
import styles from './Property.module.scss';

interface Props {
  index: number;
  onChange: (data: IMapProperty, index: number) => void;
  onDelete: (data: IMapProperty, index: number) => void;
  value: IMapProperty;
}

const Property = ({ index, onChange, onDelete, value }: Props) => {
  const handlePropertyNameChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    const updated = produce(value, draft => {
      draft.name = event.currentTarget.value;
    });

    onChange(updated, index);
  };

  const handleDeleteRequest = (): void => {
    onDelete(value, index);
  };

  const handleArgumentChange = (argument: IMapPropertyArgument, idx: number): void => {
    const updated = produce(value, draft => {
      draft.arguments[idx] = argument;
    });

    onChange(updated, index);
  };

  const handleArgumentCreate = (): void => {
    const updated = produce(value, draft => {
      draft.arguments.push({
        uuid: uuidV4(),
        name: 'arg',
        type: MapArgumentType.String,
        readonly: false,
      });
    });

    onChange(updated, index);
  };

  const handleArgumentDelete = (argument: IMapPropertyArgument, idx: number): void => {
    const updated = produce(value, draft => {
      draft.arguments.splice(idx, 1);
    });

    onChange(updated, index);
  };

  return (
    <li className={styles.container}>
      {value.readonly ? (
        <span className={styles.propertyName}>{value.name}</span>
      ) : (
        <>
          <button className={styles.deleteBtn} onClick={handleDeleteRequest}>
            <FontAwesomeIcon icon="trash-alt" />
            <span className="sr-only">Delete {value.name} property</span>
          </button>
          <AutosizeInput className={styles.propertyName} onChange={handlePropertyNameChange} value={value.name} />
        </>
      )}

      <ul className={styles.arguments}>
        {value.arguments.length > 0 &&
          value.arguments.map((argument: IMapPropertyArgument, index: number) => (
            <Argument
              key={argument.uuid}
              value={argument}
              index={index}
              readonly={value.readonly}
              onChange={handleArgumentChange}
              onDelete={handleArgumentDelete}
            />
          ))}

        {!value.readonly && (
          <li className="d-inline">
            <button className={styles.addArgument} onClick={handleArgumentCreate}>
              <FontAwesomeIcon icon="plus" className="mr-2" />
              Add Argument
            </button>
          </li>
        )}
      </ul>
    </li>
  );
};

export default Property;
