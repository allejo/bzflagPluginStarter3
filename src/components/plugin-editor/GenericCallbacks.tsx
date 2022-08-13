import { ICallback } from '@allejo/bzf-plugin-gen/dist';
import React from 'react';

import FormRepeater from '../common/FormRepeater';

interface Props {
  onChange: (callbacks: ICallback[]) => void;
}

const GenericCallbacks = ({ onChange }: Props) => {
  const handleChange = (values: Record<string, string>[]) => {
    const callbacks = values.map<ICallback>((value: Record<string, string>) => ({
      name: value['callback'],
    }));

    onChange(callbacks);
  };

  const handleDisplayCallback = (value: Record<string, string>): JSX.Element => {
    return <span>{value['callback']}</span>;
  };

  return (
    <div>
      <p>
        Callbacks are used to allow plugins to communicate with each other. Transmitting and accepting data happens by
        casting the <code>void*</code> data.
      </p>

      <FormRepeater onChange={handleChange} itemRendererCallback={handleDisplayCallback}>
        <label htmlFor="callbacks">Add New Callback</label>

        <input
          type="text"
          id="callbacks"
          autoComplete="off"
          className="form-control mt-1"
          name="callback"
          required={true}
        />
      </FormRepeater>
    </div>
  );
};

export default GenericCallbacks;
