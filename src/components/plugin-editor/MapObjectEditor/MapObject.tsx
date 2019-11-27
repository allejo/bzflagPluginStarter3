import { IMapObject, IMapProperty } from '@allejo/bzf-plugin-gen';
import update from 'immutability-helper';
import React, { Component, ReactNode, SyntheticEvent } from 'react';

import styles from './MapObject.module.scss';
import Property from './Property';

interface Props {
  value: IMapObject;
  onChange: (data: IMapObject) => void;
  onDelete: (data: IMapObject) => void;
}

export default class MapObject extends Component<Props> {
  public _handleObjectName = (data: SyntheticEvent<HTMLInputElement>): void => {
    this.props.onChange(
      update(this.props.value, {
        name: {
          $set: data.currentTarget.value,
        },
      }),
    );
  };

  public _handlePropertyChange = (data: IMapProperty, index: number): void => {
    this.props.onChange(
      update(this.props.value, {
        properties: {
          [index]: {
            $set: data,
          },
        },
      }),
    );
  };

  public _handlePropertyDelete = (data: IMapProperty): void => {};

  public render(): ReactNode {
    const { value } = this.props;

    return (
      <div className={styles.mapObject}>
        <div>
          <input type="text" value={value.name} className="form-control" onChange={this._handleObjectName} />
        </div>

        <ul>
          {value.properties.map((property: IMapProperty, index: number) => (
            <Property
              key={property.uuid}
              index={index}
              value={property}
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
