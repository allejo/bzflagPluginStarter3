import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CopyToClipboard from 'react-copy-to-clipboard';
import { saveAs } from 'file-saver';
import styles from './PluginPreview.module.scss';

interface Props {
  filename: string;
  minVersion: string;
  code: string;
}

export default class PluginPreview extends Component<Props> {
  downloadPluginAsFile = () => {
    const blob = new Blob([this.props.code], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${this.props.filename}.cpp`);
  };

  render() {
    return (
      <section className={styles.sectionContainer}>
        <h2 className="sr-only">Plug-in Preview</h2>

        <div className={styles.codeContainer}>
          <div className={styles.toolbar}>
            <div className="btn btn-secondary">{this.props.minVersion}</div>

            <button className="btn btn-primary ml-1" onClick={this.downloadPluginAsFile}>
              <span className="sr-only">Download as file</span>
              <FontAwesomeIcon icon="download" />
            </button>

            <CopyToClipboard text={this.props.code}>
              <button className="btn btn-primary ml-1">
                <span className="sr-only">Copy plug-in to clipboard</span>
                <FontAwesomeIcon icon="clipboard" />
              </button>
            </CopyToClipboard>
          </div>

          <pre className={styles.codePreview}>
            <code>{this.props.code}</code>
          </pre>
        </div>
      </section>
    );
  }
}
