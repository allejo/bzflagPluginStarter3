const octokit = require('@octokit/rest')();
const http = require('https');
const path = require('path');
const fs = require('fs');

// Location for event docs to go
const eventsFolder = path.join(__dirname, '..', 'data', 'events');

octokit.repos
  .getContents({
    owner: 'bzflag-dev',
    repo: 'bzflag.org',
    path: '_documentation/developer/bzfs_api_events',
  })
  .then((result: any) => {
    result.data.forEach((value: any) => {
      const filename = value.name;

      http.get(value.download_url, (res: any) => {
        const chunks: any[] = [];

        res.on('data', (chunk: any) => {
          chunks.push(chunk);
        });

        res.on('end', () => {
          fs.writeFile(path.join(eventsFolder, filename), chunks.join(''), (err: any) => {
            if (err) {
              console.error(err);
            }
          });
        });
      });
    });
  })
  .catch((error: any) => {
    console.error(error);
  });
