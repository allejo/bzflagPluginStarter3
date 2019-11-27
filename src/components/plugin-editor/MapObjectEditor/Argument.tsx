import { IMapPropertyArgument, MapArgumentType } from '@allejo/bzf-plugin-gen';
import update from 'immutability-helper';
import React, { Component, ReactNode, SyntheticEvent } from 'react';

import styles from './Argument.module.scss';

interface Props {
  value: IMapPropertyArgument;
  index: number;
  onChange: (argument: IMapPropertyArgument, index: number) => void;
  onDelete: (argument: IMapPropertyArgument, index: number) => void;
}

export default class Argument extends Component<Props> {
  public _handleNameChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    this.props.onChange(
      update(this.props.value, {
        name: {
          $set: event.currentTarget.value,
        },
      }),
      this.props.index,
    );
  };

  public _handleTypeChange = (event: SyntheticEvent<HTMLSelectElement>): void => {
    this.props.onChange(
      update(this.props.value, {
        type: {
          $set: event.currentTarget.value as MapArgumentType,
        },
      }),
      this.props.index,
    );
  };

  public render(): ReactNode {
    const { value } = this.props;

    return (
      <li className={styles.container}>
        <span aria-hidden="true">&#123;</span>
        <input type="text" className={styles.nameEditor} value={value.name} onChange={this._handleNameChange} />

        <span aria-hidden="true">:</span>

        <select className={styles.typeSelector} value={value.type} onChange={this._handleTypeChange}>
          <option>{MapArgumentType.Int}</option>
          <option>{MapArgumentType.Float}</option>
          <option>{MapArgumentType.Double}</option>
          <option>{MapArgumentType.String}</option>
          <option>{MapArgumentType.Team}</option>
        </select>
        <span aria-hidden="true">&#125;</span>
      </li>
    );
  }
}
