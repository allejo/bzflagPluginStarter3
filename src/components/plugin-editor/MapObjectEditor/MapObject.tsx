import { IMapObject } from '@allejo/bzf-plugin-gen';
import React, { Component, ReactNode, SyntheticEvent } from 'react';

import { IImmutable } from '../../../utilities/IImmutable';
import styles from './MapObject.module.scss';

interface Props {
  value: IImmutable<IMapObject>;
  onChange: (data: IImmutable<IMapObject>) => void;
  onDelete: (data: IImmutable<IMapObject>) => void;
}

export default class MapObject extends Component<Props> {
  public _handleObjectName = (data: SyntheticEvent<HTMLInputElement>): void => {
    this.props.onChange(this.props.value.set('name', data.currentTarget.value));
  };

  public render(): ReactNode {
    const { value } = this.props;

    return (
      <div className={styles.mapObject}>
        <div>
          <input type="text" value={value.get('name')} className="form-control" onChange={this._handleObjectName} />
        </div>

        <div className="p-2">end</div>
      </div>
    );
  }
}
