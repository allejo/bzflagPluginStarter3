import React from 'react';

const Footer = () => (
  <footer className="my-4">
    <div className="row">
      <div className="col-md-6">Copyright &copy; {new Date().getFullYear()}</div>
      <div className="col-md-6 text-md-end">
        <ul className="list-inline m-0">
          <li className="list-inline-item">
            <a href="https://allejo.io">Author</a>
          </li>
          <li className="list-inline-item">
            <a href="https://bzflag.org/">BZFlag</a>
          </li>
          <li className="list-inline-item">
            <a href="https://github.com/allejo/bzflagPluginStarter3">GitHub</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
