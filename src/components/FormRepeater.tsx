import React, { Component, SyntheticEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './FormRepeater.module.scss';

interface Props {
  onChange: (values: Record<string, string>[]) => void;
  itemRendererCallback: (value: Record<string, string>) => JSX.Element;
  children: React.ReactNode;
}

interface State {
  formData: Record<string, string>;
  data: Record<string, string>[];
}

export default class FormRepeater extends Component<Props, State> {
  readonly state: State = {
    formData: {},
    data: [],
  };

  public _handleChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    const formData = JSON.parse(JSON.stringify(this.state.formData));
    formData[event.currentTarget.name] = event.currentTarget.value;

    this.setState({ formData });
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

    const data: Record<string, any>[] = this.state.data.slice();
    data.push(this.state.formData);

    const formData = JSON.parse(JSON.stringify(this.state.formData));
    for (const formDatum in formData) {
      formData[formDatum] = '';
    }

    this.setState(
      {
        data,
        formData,
      },
      () => {
        this.props.onChange(this.state.data);
      }
    );
  };

  public _controlledFormFields = (template: any): React.ReactNode[] => {
    return React.Children.map(template, child => {
      const { props } = child;

      if (!props) {
        return child;
      }

      if (props.children) {
        return React.cloneElement(child, {
          children: this._controlledFormFields(props.children),
        });
      }

      if (child.type === 'input' || child.type === 'select') {
        const name: string = child.props.name;
        const value: string = child.props.value;

        return React.cloneElement(child, {
          onChange: this._handleChange,
          value: this.state.formData[name] || value || '',
        });
      }

      return child;
    });
  };

  public render(): JSX.Element {
    const { data } = this.state;
    const hasData = data.length > 0;

    return (
      <div>
        <form className={styles.form} onSubmit={this._handleSubmit}>
          <div className="w-100">{this._controlledFormFields(this.props.children)}</div>
          <div className={styles.buttonContainer}>
            <button className="btn btn-success">
              <span className="sr-only">Add item</span>
              <FontAwesomeIcon icon="plus" aria-hidden={true} />
            </button>
          </div>
        </form>

        {hasData && (
          <ul className={styles.repeaterItems}>
            {data.map((value: Record<string, string>, i: number) => (
              <li key={i} className={styles.repeaterItem}>
                <div className={styles.repeaterContent}>{this.props.itemRendererCallback(value)}</div>

                <button className="btn btn-danger ml-1" onClick={() => this._handleRemoval(i)}>
                  <span className="sr-only" aria-hidden="true">
                    Delete
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
