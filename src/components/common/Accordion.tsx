import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';
import { Collapse } from 'reactstrap';

import styles from './Accordion.module.scss';

interface Props {
  children: ReactNode;
  heading: string;
  isOpen: boolean;
  onToggle(isOpen: boolean): void;
}

const Accordion = ({ heading, isOpen, children, onToggle }: Props) => {
  const handleClick = () => {
    onToggle(!isOpen);
  };

  return (
    <section>
      <button className={styles.header} aria-expanded={isOpen} onClick={handleClick}>
        <span className={styles.icon} aria-hidden={true}>
          <FontAwesomeIcon icon={isOpen ? faAngleDown : faAngleRight} />
        </span>

        {heading}
      </button>

      <Collapse isOpen={isOpen}>
        <div className={styles.body}>{children}</div>
      </Collapse>
    </section>
  );
};

export default Accordion;
