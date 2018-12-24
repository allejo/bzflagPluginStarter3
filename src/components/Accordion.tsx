import React, { Component, ReactNode } from 'react';
import { Collapse } from 'reactstrap';
import styles from './Accordion.module.scss';

interface Props {
  isOpen: boolean;
  heading: string;
  children: ReactNode;
}

interface State {
  isOpen: boolean;
}

export default class Accordion extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: props.isOpen,
    };
  }

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <article>
        <header className={styles.header} aria-expanded={this.state.isOpen} onClick={this.handleClick}>
          <h2 tabIndex={0}>{this.props.heading}</h2>
        </header>

        <Collapse isOpen={this.state.isOpen}>
          <div className={styles.body}>{this.props.children}</div>
        </Collapse>
      </article>
    );
  }
}
