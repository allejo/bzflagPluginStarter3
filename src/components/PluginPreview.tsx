import { IPlugin, PluginWriter } from '@allejo/bzf-plugin-gen';
import { faClipboard, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CPPClass, CPPComment } from 'aclovis';
import { saveAs } from 'file-saver';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import styles from './PluginPreview.module.scss';

interface Props {
  minVersion: string;
  pluginDef: IPlugin;
}

const PluginPreview = ({ minVersion, pluginDef }: Props) => {
  const writer: PluginWriter = new PluginWriter(pluginDef);

  const renderCode = (): string => {
    const licenseBody: string[] = pluginDef.license.body
      .replace('{name}', pluginDef.name || 'Sample Plug-in')
      .replace('{year}', String(new Date().getFullYear()))
      .replace('{author}', pluginDef.author.copyright || 'Your Name')
      .split('\n');
    const licenseBlock: CPPComment = new CPPComment(licenseBody, true);

    let addClassesOutput: string = '';
    const additionalClasses: string[] = writer
      .getAdditionalClasses()
      .map((cls: CPPClass) => cls.write(writer.getFormatter(), 0));

    if (additionalClasses.length > 0) {
      addClassesOutput = '\n' + additionalClasses.join('\n\n') + '\n';
    }

    return `
${licenseBlock.write(writer.getFormatter())}

#include "bzfsAPI.h"
#include "plugin_utils.h"
${addClassesOutput}
${writer.write().replace(
  '};',
  `};

BZ_PLUGIN(${writer.getClassName()})`,
)}
    `.trim();
  };

  const handleDownloadPluginAsFile = (): void => {
    const blob = new Blob([renderCode()], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${writer.getClassName()}.cpp`);
  };

  return (
    <section className={styles.sectionContainer}>
      <h2 className="sr-only">Plug-in Preview</h2>

      <div className={styles.codeContainer}>
        <div className={styles.toolbar}>
          <div className="btn btn-secondary">{minVersion}</div>

          <button className="btn btn-primary ms-1" onClick={handleDownloadPluginAsFile}>
            <span className="sr-only">Download as file</span>
            <FontAwesomeIcon icon={faDownload} />
          </button>

          <CopyToClipboard text={renderCode()}>
            <button className="btn btn-primary ms-1">
              <span className="sr-only">Copy plug-in to clipboard</span>
              <FontAwesomeIcon icon={faClipboard} />
            </button>
          </CopyToClipboard>
        </div>

        <pre className={styles.codePreview}>
          <code>{renderCode()}</code>
        </pre>
      </div>
    </section>
  );
};

export default PluginPreview;
