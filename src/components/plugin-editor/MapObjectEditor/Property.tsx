import { IMapProperty } from '@allejo/bzf-plugin-gen';
import update from 'immutability-helper';
import React, { Component, ReactNode, SyntheticEvent } from 'react';

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

  public render(): ReactNode {
    const { value } = this.props;

    return (
      <li>
        <input type="text" className="form-control" onChange={this._handlePropertyNameChange} value={value.name} />
      </li>
    );
  }
}
