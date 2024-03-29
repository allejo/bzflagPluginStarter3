import { ILicense } from '@allejo/bzf-plugin-gen';
import fs from 'fs';
import path from 'path';

const licensesDir = path.join(__dirname, '..', 'data', 'licenses');
const licenses = fs.readdirSync(licensesDir);

const LicenseDictionary: { [key: string]: ILicense } = {};

for (const i in licenses) {
  const licenseFilename: string = licenses[i];
  const licenseName: string = licenseFilename.split('.')[0];
  const fileRaw: string = fs.readFileSync(path.join(licensesDir, licenseFilename), 'utf-8');

  LicenseDictionary[licenseName] = {
    name: licenseName,
    body: fileRaw,
  };
}

fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'data', 'licenses.json'),
  JSON.stringify(LicenseDictionary, null, '\t'),
);
