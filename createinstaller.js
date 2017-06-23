const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((err) => {
    console.error(err.message || err);
    process.exit(1);
});

function getInstallerConfig() {
  console.log('creating windows installer');

  return Promise.resolve({
     appDirectory: './dist/Tewb-win32-x64',
     authors: 'Wignall, Shane M',
     noMsi: true,
     outputDirectory: './dist/installers/tewb-win32-x64',
     exe: 'Tewb.exe',
     setupExe: 'TewbInstaller.exe',
     setupIcon: './favicon.ico'
  });
}
