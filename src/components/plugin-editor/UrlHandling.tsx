import React, { SyntheticEvent } from 'react';

interface Props {
  onChange(makesUrlCalls: boolean): void;
}

const UrlHandling = ({ onChange }: Props) => {
  const handleCheckbox = (e: SyntheticEvent<HTMLInputElement>): void => {
    onChange(e.currentTarget.checked);
  };

  return (
    <div>
      <p>
        Plug-ins will sometimes need to make calls to URL endpoints to either retrieve or post data. When this is
        needed, your plugin needs to implement certain callbacks.
      </p>
      <div className="custom-control custom-checkbox">
        <input type="checkbox" id="makes-url-calls" className="custom-control-input" onChange={handleCheckbox} />
        <label htmlFor="makes-url-calls" className="custom-control-label">
          Makes URL Calls
        </label>
      </div>
    </div>
  );
};

export default UrlHandling;
