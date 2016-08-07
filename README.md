## whole genome desktop app demo

![capture 1](https://raw.githubusercontent.com/AWAKENS-dev/example-app-electron/master/docs/capture_genomes.jpg)
![capture 2](https://raw.githubusercontent.com/AWAKENS-dev/example-app-electron/master/docs/capture_genotype.jpg)

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
