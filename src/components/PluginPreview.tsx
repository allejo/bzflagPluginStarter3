import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CopyToClipboard from 'react-copy-to-clipboard';
import { saveAs } from 'file-saver';
import styles from './PluginPreview.module.css';

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
      <div className={styles.container}>
        <div className={styles.toolbar}>
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

        <pre>
          <code>{this.props.code}</code>
        </pre>
      </div>
    );
  }
}
