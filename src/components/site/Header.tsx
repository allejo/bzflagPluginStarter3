import React from 'react';

const Header = () => (
  <section>
    <h1 className="my-3">BZFlag Plug-in Starter</h1>

    <p>
      This tool generates the skeleton for BZFlag 2.4 compatible plug-ins. The documentation and features used on this
      website are always in sync with the{' '}
      <a href="https://github.com/bzflag-dev/bzflag/tree/2.4">latest BZFlag 2.4.x development branch</a>. If you are not
      using the latest and greatest version of BZFS, be sure to check minimum requirements.
    </p>

    <p>
      Using the generated plug-in from this website goes well with my{' '}
      <a href="https://github.com/allejo/bzflagPluginTemplate">BZFlag Plugin Template</a> to standardize and simplify
      plug-in distribution across different platforms.
    </p>

    <p>
      Enter the details of your BZFlag plug-in and start inputting information to build the skeleton for your plug-in.
    </p>
  </section>
);

export default Header;
