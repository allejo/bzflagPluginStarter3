import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, ReactNode } from 'react';
import { Collapse } from 'reactstrap';

import styles from './Accordion.module.scss';

interface Props {
  isOpen: boolean;
  heading: string;
  children: ReactNode;

  onToggle(isOpen: boolean): void;
}

export default class Accordion extends Component<Props> {
  handleClick = () => {
    this.props.onToggle(!this.props.isOpen);
  };

  render() {
    return (
      <article>
        <header className={styles.header} aria-expanded={this.props.isOpen} onClick={this.handleClick}>
          <h2 tabIndex={0}>
            <span className={styles.icon} aria-hidden={true}>
              <FontAwesomeIcon icon={this.props.isOpen ? 'angle-down' : 'angle-right'} />
            </span>

            {this.props.heading}
          </h2>
        </header>

        <Collapse isOpen={this.props.isOpen}>
          <div className={styles.body}>{this.props.children}</div>
        </Collapse>
      </article>
    );
  }
}
