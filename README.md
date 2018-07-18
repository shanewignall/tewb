# Youtube Float

> A cross-platform, floating application for viewing Youtube videos

![Screenshot of Tewb](https://github.com/shanewignall/tewb/blob/master/tewb.jpg)

## Setup

```
$ npm install
```

### Run

```
$ npm start
```

### Build
run the "build" script with the "--platform" flag for the desired platform (win32, linux, darwin). For example:

```
$ npm run build -- --platform=win32
```

Builds the app for macOS, Linux, and Windows, using [electron-packager](https://github.com/electron-userland/electron-packager).

## Release
create an installer from the build by running:
```
$ npm run release
```
After this, you will have an installer under `/dist/installers/`

## License

MIT © [Shane Wignall](https://twitter.com/shanemwignall)
