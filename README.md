## Whole genome desktop app demo with `awtk` API

Example app with `awtk` API in Electron (Node.js)

### E.g. Register genome VCF

![capture 1](https://raw.githubusercontent.com/AWAKENS-dev/example-app-electron/master/docs/capture_genomes.jpg)

### E.g. Retrieve genotype

![capture 2](https://raw.githubusercontent.com/AWAKENS-dev/example-app-electron/master/docs/capture_genotype.jpg)


## For developers

Install

```
$ npm install
```

Run

```
$ electron .
```

Build

```
$ electron-packager . --platform=darwin --arch=x64 --version=$(npm view electron-prebuilt version) --icon=icon/app.icns --overwrite
```

Logs

- OSX: `~/Library/Logs/example-app-electron/log.log`
- Linux: `~/.config/example-app-electron/log.log`
- Windows: `$HOME/AppData/Roaming/example-app-electron/log.log`
