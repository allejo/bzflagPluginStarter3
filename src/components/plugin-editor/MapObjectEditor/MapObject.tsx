import { IMapObject } from '@allejo/bzf-plugin-gen';
import React, { Component, ReactNode, SyntheticEvent } from 'react';

import { IImmutable } from '../../../utilities/IImmutable';
import styles from './MapObject.module.scss';
import {IMapProperty} from "@allejo/bzf-plugin-gen/dist";
import Property from "./Property";

interface Props {
  value: IImmutable<IMapObject>;
  onChange: (data: IImmutable<IMapObject>) => void;
  onDelete: (data: IImmutable<IMapObject>) => void;
}

export default class MapObject extends Component<Props> {
  public _handleObjectName = (data: SyntheticEvent<HTMLInputElement>): void => {
    this.props.onChange(this.props.value.set('name', data.currentTarget.value));
  };

  public _handlePropertyChange = (data: IImmutable<IMapProperty>, index: number): void => {
    this.props.onChange(
      this.props.value.updateIn(['properties', index], () => data)
    );
  };

  public _handlePropertyDelete = (data: IImmutable<IMapProperty>): void => {

  };

  public render(): ReactNode {
    const { value } = this.props;

    return (
      <div className={styles.mapObject}>
        <div>
          <input type="text" value={value.get('name')} className="form-control" onChange={this._handleObjectName} />
        </div>

        <ul>
          {value.get<'properties'>('properties').map((value1: IImmutable<IMapProperty>, index: number) => (
            <Property
              key={value1.get('uuid')}
              index={index}
              value={value1}
              onChange={this._handlePropertyChange}
              onDelete={this._handlePropertyDelete}
            />
          ))}
        </ul>

        <div className="p-2">end</div>
      </div>
    );
  }
}
