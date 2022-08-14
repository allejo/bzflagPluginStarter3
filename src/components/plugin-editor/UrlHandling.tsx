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
      <div className="form-check">
        <input type="checkbox" id="makes-url-calls" className="form-check-input" onChange={handleCheckbox} />
        <label htmlFor="makes-url-calls" className="form-check-label">
          Makes URL Calls
        </label>
      </div>
    </div>
  );
};

export default UrlHandling;
