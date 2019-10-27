import React, { Component, SyntheticEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './FormRepeater.module.scss';

interface Props {
  label: string;
  onChange: (values: string[]) => void;
}

interface State {
  inputValue: string;
  data: string[];
}

export default class FormRepeater extends Component<Props, State> {
  readonly state = {
    inputValue: '',
    data: [],
  };

  public _handleChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    this.setState({
      inputValue: event.currentTarget.value,
    });
  };

  public _handleRemoval = (idx: number): void => {
    const data = this.state.data.slice();
    data.splice(idx, 1);

    this.setState(
      {
        data,
      },
      () => {
        this.props.onChange(this.state.data);
      }
    );
  };

  public _handleSubmit = (event: SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const data: string[] = this.state.data.slice();
    data.push(this.state.inputValue);

    this.setState(
      {
        data,
        inputValue: '',
      },
      () => {
        this.props.onChange(this.state.data);
      }
    );
  };

  public render(): JSX.Element {
    const { data } = this.state;
    const hasData = data.length > 0;

    return (
      <div>
        <form className={styles.form} onSubmit={this._handleSubmit}>
          <label>
            <div>{this.props.label}</div>
            <input type="text" name="slash-command" onChange={this._handleChange} value={this.state.inputValue} />
          </label>
        </form>

        {hasData && (
          <ul className={styles.repeaterItems}>
            {data.map((value: any, i: number) => (
              <li key={i} className={styles.repeaterItem}>
                <div className={styles.repeaterContent}>
                  <span>{value}</span>
                </div>

                <button className="btn btn-danger ml-1" onClick={() => this._handleRemoval(i)}>
                  <span className="sr-only" aria-hidden="true">
                    Delete {value}
                  </span>
                  <FontAwesomeIcon icon="trash-alt" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
