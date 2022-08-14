import { IMapPropertyArgument, MapArgumentType } from '@allejo/bzf-plugin-gen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import produce from 'immer';
import React, { SyntheticEvent } from 'react';
import AutosizeInput from 'react-input-autosize';

import styles from './Argument.module.scss';

interface Props {
  index: number;
  onChange: (argument: IMapPropertyArgument, index: number) => void;
  onDelete: (argument: IMapPropertyArgument, index: number) => void;
  readonly: boolean;
  value: IMapPropertyArgument;
}

const Argument = ({ index, value, onChange, onDelete, readonly }: Props) => {
  const handleNameChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    const updated = produce(value, draft => {
      draft.name = event.currentTarget.value;
    });

    onChange(updated, index);
  };

  const handleTypeChange = (event: SyntheticEvent<HTMLSelectElement>): void => {
    const updated = produce(value, draft => {
      draft.type = event.currentTarget.value as MapArgumentType;
    });

    onChange(updated, index);
  };

  const handleDelete = (): void => {
    onDelete(value, index);
  };

  return (
    <li
      className={classNames({
        [styles.container]: true,
        [styles.readOnly]: readonly,
      })}
    >
      <span aria-hidden="true">&#123;</span>

      <AutosizeInput className={styles.nameEditor} value={value.name} onChange={handleNameChange} disabled={readonly} />

      <span aria-hidden="true">:</span>

      <select className={styles.typeSelector} value={value.type} onChange={handleTypeChange} disabled={readonly}>
        <option>{MapArgumentType.Int}</option>
        <option>{MapArgumentType.Float}</option>
        <option>{MapArgumentType.Double}</option>
        <option>{MapArgumentType.String}</option>
        <option>{MapArgumentType.Team}</option>
      </select>
      <span aria-hidden="true">&#125;</span>

      {!readonly && (
        <button className={styles.deleteButton} onClick={handleDelete}>
          <FontAwesomeIcon icon="times-circle" fixedWidth={true} />
          <span className="sr-only">Delete the {value.name} argument</span>
        </button>
      )}
    </li>
  );
};

export default Argument;
