import { IMapProperty } from '@allejo/bzf-plugin-gen';
import { IMapPropertyArgument, MapArgumentType } from '@allejo/bzf-plugin-gen/dist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import update from 'immutability-helper';
import React, { Component, ReactNode, SyntheticEvent } from 'react';

import { uuidV4 } from '../../../utilities/common';
import Argument from './Argument';
import styles from './Property.module.scss';

interface Props {
  index: number;
  value: IMapProperty;
  onChange: (data: IMapProperty, index: number) => void;
  onDelete: (data: IMapProperty, index: number) => void;
}

export default class Property extends Component<Props> {
  public _handlePropertyNameChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    this.props.onChange(
      update(this.props.value, {
        name: {
          $set: event.currentTarget.value,
        },
      }),
      this.props.index,
    );
  };

  public _handleDeleteRequest = (): void => {
    this.props.onDelete(this.props.value, this.props.index);
  };

  public _handleArgumentChange = (argument: IMapPropertyArgument, index: number): void => {
    this.props.onChange(
      update(this.props.value, {
        arguments: {
          $splice: [[index, 1, argument]],
        },
      }),
      this.props.index,
    );
  };

  public _handleArgumentCreate = (): void => {
    this.props.onChange(
      update(this.props.value, {
        arguments: {
          $push: [
            {
              uuid: uuidV4(),
              name: '',
              type: MapArgumentType.String,
              readonly: false,
            },
          ],
        },
      }),
      this.props.index,
    );
  };

  public _handleArgumentDelete = (argument: IMapPropertyArgument, index: number): void => {
    this.props.onChange(
      update(this.props.value, {
        arguments: {
          $splice: [[index, 0]],
        },
      }),
      this.props.index,
    );
  };

  public render(): ReactNode {
    const { value } = this.props;

    return (
      <li className={styles.container}>
        {value.readonly ? (
          <p>{value.name}</p>
        ) : (
          <>
            <button className={styles.deleteBtn} onClick={this._handleDeleteRequest}>
              <FontAwesomeIcon icon="trash-alt" />
              <span className="sr-only">Delete {value.name} property</span>
            </button>
            <input type="text" className="form-control" onChange={this._handlePropertyNameChange} value={value.name} />
          </>
        )}

        {value.arguments.length > 0 && (
          <ul className={styles.arguments}>
            {value.arguments.map((argument: IMapPropertyArgument, index: number) => (
              <Argument
                key={argument.uuid}
                value={argument}
                index={index}
                onChange={this._handleArgumentChange}
                onDelete={this._handleArgumentDelete}
              />
            ))}

            <li>
              <button className={styles.addArgument} onClick={this._handleArgumentCreate}>
                <FontAwesomeIcon icon="plus" className="mr-2" />
                Add Argument
              </button>
            </li>
          </ul>
        )}
      </li>
    );
  }
}
