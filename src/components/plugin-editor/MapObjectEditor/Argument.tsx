import { IMapPropertyArgument, MapArgumentType } from '@allejo/bzf-plugin-gen';
import React, { Component, ReactNode } from 'react';

interface Props {
  name: string;
  type: MapArgumentType;
  readonly: boolean;

  onChange: (argument: IMapPropertyArgument) => void;
}

interface State {}

export default class Argument extends Component<Props, State> {
  public static defaultProps = {
    readonly: false,
  };

  public render(): ReactNode {
    return (
      <div>
        <input type="text" name="map_property_argument_name" />
        <select name="map_property_argument_type">
          <option>{MapArgumentType.Int}</option>
          <option>{MapArgumentType.Float}</option>
          <option>{MapArgumentType.Double}</option>
          <option>{MapArgumentType.String}</option>
          <option>{MapArgumentType.Team}</option>
        </select>
      </div>
    );
  }
}
