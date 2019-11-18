import React, {Component, ReactNode, SyntheticEvent} from 'react';
import { IImmutable } from "../../../utilities/IImmutable";
import { IMapProperty } from "@allejo/bzf-plugin-gen";

interface Props {
  index: number;
  value: IImmutable<IMapProperty>;
  onChange: (data: IImmutable<IMapProperty>, index: number) => void;
  onDelete: (data: IImmutable<IMapProperty>, index: number) => void;
}

export default class Property extends Component<Props> {
  public _handlePropertyNameChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    this.props.onChange(
      this.props.value.set('name', event.currentTarget.value),
      this.props.index,
    );
  };

  public render(): ReactNode {
    const { value } = this.props;

    return (
      <li>
        <input
          type="text"
          className="form-control"
          onChange={this._handlePropertyNameChange}
          value={value.get('name')}
        />
      </li>
    );
  }
}
