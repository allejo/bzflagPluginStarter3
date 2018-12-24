import React, { Component } from 'react';
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
          <button onClick={this.downloadPluginAsFile}>
            <span className="sr-only">Download as file</span>
            <i className="fa fa-download" aria-hidden="true" />
          </button>
        </div>

        <pre>
          <code>{this.props.code}</code>
        </pre>
      </div>
    );
  }
}
