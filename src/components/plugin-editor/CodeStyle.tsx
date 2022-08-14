import { ICodeStyle } from '@allejo/bzf-plugin-gen';
import React, { SyntheticEvent } from 'react';

interface Props {
  data: ICodeStyle;

  onUpdate(data: ICodeStyle): void;
}

const CodeStyle = ({ data, onUpdate }: Props) => {
  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const newData = { ...data };

    if (event.currentTarget.type === 'checkbox') {
      newData[event.currentTarget.name] = event.currentTarget.checked;
    } else {
      newData[event.currentTarget.name] = event.currentTarget.value;
    }

    onUpdate(newData);
  };

  return (
    <section>
      <div className="mb-3">
        <fieldset aria-labelledby="code-preferences">
          <legend id="code-preferences">Code Preferences</legend>

          <div className="form-check">
            <input
              type="checkbox"
              id="useIfStatement"
              name="useIfStatement"
              className="form-check-input"
              checked={data.useIfStatement}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="useIfStatement">
              Use an if statement for event handling
            </label>
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              id="bracesOnNewline"
              name="bracesOnNewLine"
              className="form-check-input"
              checked={data.bracesOnNewLine}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="bracesOnNewline">
              Put braces on new line
            </label>
          </div>
        </fieldset>
      </div>

      <div className="row">
        <div className="col-md-5">
          <fieldset aria-labelledby="spacing-preferences">
            <legend className="col-form-label" id="spacing-preferences">
              Spacing Preferences
            </legend>

            <div className="form-check">
              <input
                type="radio"
                id="twoSpace"
                name="spacingType"
                className="form-check-input"
                value="twoSpace"
                checked={data.spacingType === 'twoSpace'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="twoSpace">
                2 Spaces
              </label>
            </div>

            <div className="form-check">
              <input
                type="radio"
                id="fourSpace"
                name="spacingType"
                className="form-check-input"
                value="fourSpace"
                checked={data.spacingType === 'fourSpace'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="fourSpace">
                4 Spaces
              </label>
            </div>

            <div className="form-check">
              <input
                type="radio"
                id="tabs"
                name="spacingType"
                className="form-check-input"
                value="tabs"
                checked={data.spacingType === 'tabs'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="tabs">
                Tabs
              </label>
            </div>
          </fieldset>
        </div>
        <div className="col-md-7">
          <fieldset aria-labelledby="documentation-setting">
            <legend className="col-form-label" id="documentation-setting">
              Documentation
            </legend>

            <div className="form-check mb-2">
              <input
                type="checkbox"
                id="buildEventDocs"
                name="showDocBlocks"
                className="form-check-input"
                checked={data.showDocBlocks}
                onChange={handleChange}
              />
              <label htmlFor="buildEventDocs" className="form-check-label" aria-describedby="docBlockHelp">
                Build event doc blocks
              </label>
              <div id="docBlockHelp" className="form-text">
                A block of documentation containing information about each event's data
              </div>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                id="buildComments"
                name="showComments"
                className="form-check-input"
                checked={data.showComments}
                onChange={handleChange}
              />
              <label htmlFor="buildComments" className="form-check-label" aria-describedby="commentHelp">
                Add helpful comments
              </label>
              <div id="commentHelp" className="form-text">
                Add miscellaneous comments explaining pieces of code
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </section>
  );
};

export default CodeStyle;
