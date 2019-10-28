import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CopyToClipboard from 'react-copy-to-clipboard';
import { saveAs } from 'file-saver';
import styles from './PluginPreview.module.scss';
import { IPlugin, PluginWriter } from '@allejo/bzf-plugin-gen/dist';
import { CPPComment } from 'aclovis';

interface Props {
  minVersion: string;
  pluginDef: IPlugin;
}

export default class PluginPreview extends Component<Props> {
  public _handleDownloadPluginAsFile = (): void => {
    const blob = new Blob([this._renderCode()], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${this.getClassName()}.cpp`);
  };

  private getClassName = (): string => {
      const writer: PluginWriter = new PluginWriter(this.props.pluginDef);

      return writer.getClassName();
  };

  public _renderCode = (): string => {
    const writer: PluginWriter = new PluginWriter(this.props.pluginDef);

    const licenseRaw: string = this.props.pluginDef.license.body;
    const licenseBody: string[] = licenseRaw
      .replace('{name}', this.props.pluginDef.name || 'Sample Plug-in')
      .replace('{year}', String(new Date().getFullYear()))
      .replace('{author}', this.props.pluginDef.author.copyright || 'Your Name')
      .split('\n');
    const licenseBlock: CPPComment = new CPPComment(licenseBody, true);

    return `
${licenseBlock.write(writer.getFormatter())}

#include "bzfsAPI.h"
#include "plugin_utils.h"

${writer.write().replace(
  '};',
  `};

BZ_PLUGIN(${writer.getClassName()})`
)}
    `.trim();
  };

  public render(): JSX.Element {
    return (
      <section className={styles.sectionContainer}>
        <h2 className="sr-only">Plug-in Preview</h2>

        <div className={styles.codeContainer}>
          <div className={styles.toolbar}>
            <div className="btn btn-secondary">{this.props.minVersion}</div>

            <button className="btn btn-primary ml-1" onClick={this._handleDownloadPluginAsFile}>
              <span className="sr-only">Download as file</span>
              <FontAwesomeIcon icon="download" />
            </button>

            <CopyToClipboard text={this._renderCode()}>
              <button className="btn btn-primary ml-1">
                <span className="sr-only">Copy plug-in to clipboard</span>
                <FontAwesomeIcon icon="clipboard" />
              </button>
            </CopyToClipboard>
          </div>

          <pre className={styles.codePreview}>
            <code>{this._renderCode()}</code>
          </pre>
        </div>
      </section>
    );
  }
}
