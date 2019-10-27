# BZFlag Plug-in Starter 3

A UI wrapper around [bzfPluginGen](https://github.com/allejo/bzfPluginGen) built with React to generate the skeleton of a BZFlag 2.4 compatible plug-in. This is the successor to [version 2](https://github.com/allejo/bzflagPluginStarter2) of this project, which was written as a monolithic Vue.js project.

This website will allow you to generate the skeleton of a plug-in that supports the following:

- Custom BZDB settings
- Custom callbacks
- Custom flags
- Custom map objects
- Custom poll types
- Custom slash commands
- Event registration

## Building

This project pulls from the [official bzflag.org documentation](https://github.com/BZFlag-Dev/bzflag.org) and generates JSON files used by this website to generate documentation in the plug-in skeleton.

```bash
npm run data
npm run build
```

## Reporting Issues

This project is very modular and uses information from other repositories. Unless there is a bug in the website's behavior, keep the following in mind:

- If there is an error in the generated documentation, send a PR to the [`bzflag.org`](https://github.com/BZFlag-Dev/bzflag.org) repository
- If there is an error in the C++ generation, create an issue in the [`bzfPluginGen`](https://github.com/allejo/bzfPluginGen) repository

## License

[MIT](./LICENSE.md)
