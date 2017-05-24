'use strict';
const electron = require('electron');

const app = electron.app;

require('electron-debug')();

let win;

function onClosed() {
	win = null;
}

function createMainWindow() {
	var frame = ((process.platform !== 'darwin') ? false : true);

	win = new electron.BrowserWindow({
		width: 450,
		height: 600,
		minWidth: 350,
		minHeight: 300,
		//frame: frame,
		title: "Tewb"
	});

	win.setMenu(null);

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!win) {
		win = createMainWindow();
	}
});

app.on('ready', () => {
	win = createMainWindow();
});
