import { IMapObject, IMapProperty } from '@allejo/bzf-plugin-gen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import update from 'immutability-helper';
import React, { Component, ReactNode, SyntheticEvent } from 'react';
import AutosizeInput from 'react-input-autosize';

import { uuidV4 } from '../../../utilities/common';
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

  public _handleObjectDelete = (): void => {
    this.props.onDelete(this.props.value);
  };

  public _handleNewProperty = (): void => {
    this.props.onChange(
      update(this.props.value, {
        properties: {
          $push: this.defaultArguments(),
        },
      }),
    );
  };

  public _handlePropertyChange = (data: IMapProperty, index: number): void => {
    this.props.onChange(
      update(this.props.value, {
        properties: {
          $splice: [[index, 1, data]],
        },
      }),
    );
  };

  public _handlePropertyDelete = (data: IMapProperty, index: number): void => {
    this.props.onChange(
      update(this.props.value, {
        properties: {
          $splice: [[index, 1]],
        },
      }),
    );
  };

  public render(): ReactNode {
    const { value } = this.props;

    return (
      <div className={styles.container}>
        <div className="d-flex align-items-center mb-2">
          <div className="flex-grow-1">
            <AutosizeInput value={value.name} className={styles.objectName} onChange={this._handleObjectName} />
          </div>
          <div className="pl-4">
            <button className={styles.deleteObjectButton} onClick={this._handleObjectDelete}>
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
                onChange={this._handlePropertyChange}
                onDelete={this._handlePropertyDelete}
              />
            ))}
          </ul>

          <button className={styles.addPropertyButton} onClick={this._handleNewProperty}>
            <FontAwesomeIcon icon="plus" className="mr-2" />
            Add New Property
          </button>
        </div>

        <div className="p-2">end</div>
      </div>
    );
  }

  private defaultArguments = (): IMapProperty[] => [
    {
      uuid: uuidV4(),
      name: 'property',
      arguments: [],
      readonly: false,
    },
  ];
}
