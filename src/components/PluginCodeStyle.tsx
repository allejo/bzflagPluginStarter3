import React, { Component, SyntheticEvent } from 'react';
import { ICodeStyle } from '@allejo/bzf-plugin-gen';

interface Props {
  data: ICodeStyle;

  onUpdate(data: ICodeStyle): void;
}

export default class PluginCodeStyle extends Component<Props> {
  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const data = Object.assign({}, this.props.data);

    if (event.currentTarget.type === 'checkbox') {
      data[event.currentTarget.name] = event.currentTarget.checked;
    } else {
      data[event.currentTarget.name] = event.currentTarget.value;
    }

    this.props.onUpdate(data);
  };

  render() {
    return (
      <section>
        <div className="mb-3">
          <fieldset aria-labelledby="code-preferences">
            <legend id="code-preferences">Code Preferences</legend>

            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                id="useIfStatement"
                name="useIfStatement"
                className="custom-control-input"
                checked={this.props.data.useIfStatement}
                onChange={this.handleChange}
              />
              <label className="custom-control-label" htmlFor="useIfStatement">
                Use an if statement for event handling
              </label>
            </div>

            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                id="bracesOnNewline"
                name="bracesOnNewLine"
                className="custom-control-input"
                checked={this.props.data.bracesOnNewLine}
                onChange={this.handleChange}
              />
              <label className="custom-control-label" htmlFor="bracesOnNewline">
                Put braces on new line
              </label>
            </div>
          </fieldset>
        </div>

        <div className="row">
          <div className="col-md-5">
            <fieldset aria-labelledby="spacing-preferences" className="form-group">
              <legend className="col-form-label" id="spacing-preferences">
                Spacing Preferences
              </legend>

              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  id="twoSpace"
                  name="spacingType"
                  className="custom-control-input"
                  value="twoSpace"
                  checked={this.props.data.spacingType === 'twoSpace'}
                  onChange={this.handleChange}
                />
                <label className="custom-control-label" htmlFor="twoSpace">
                  2 Spaces
                </label>
              </div>

              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  id="fourSpace"
                  name="spacingType"
                  className="custom-control-input"
                  value="fourSpace"
                  checked={this.props.data.spacingType === 'fourSpace'}
                  onChange={this.handleChange}
                />
                <label className="custom-control-label" htmlFor="fourSpace">
                  4 Spaces
                </label>
              </div>

              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  id="tabs"
                  name="spacingType"
                  className="custom-control-input"
                  value="tabs"
                  checked={this.props.data.spacingType === 'tabs'}
                  onChange={this.handleChange}
                />
                <label className="custom-control-label" htmlFor="tabs">
                  Tabs
                </label>
              </div>
            </fieldset>
          </div>
          <div className="col-md-7">
            <fieldset aria-labelledby="documentation-setting" className="form-group">
              <legend className="col-form-label" id="documentation-setting">
                Documentation
              </legend>

              <div className="custom-control custom-checkbox mb-2">
                <input
                  type="checkbox"
                  id="buildEventDocs"
                  name="showDocBlocks"
                  className="custom-control-input"
                  checked={this.props.data.showDocBlocks}
                  onChange={this.handleChange}
                />
                <label htmlFor="buildEventDocs" className="custom-control-label" aria-describedby="docBlockHelp">
                  Build event doc blocks
                </label>
                <small id="docBlockHelp" className="form-text text-muted">
                  A block of documentation containing information about each event's data
                </small>
              </div>

              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  id="buildComments"
                  name="showComments"
                  className="custom-control-input"
                  checked={this.props.data.showComments}
                  onChange={this.handleChange}
                />
                <label htmlFor="buildComments" className="custom-control-label" aria-describedby="commentHelp">
                  Add helpful comments
                </label>
                <small id="commentHelp" className="form-text text-muted">
                  Add miscellaneous comments explaining pieces of code
                </small>
              </div>
            </fieldset>
          </div>
        </div>
      </section>
    );
  }
}
