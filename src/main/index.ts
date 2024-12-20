import { join } from 'path';
import { access } from 'fs/promises';
// import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { app, shell, BrowserWindow, ipcMain } from 'electron';
import log from 'electron-log/main';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { bindDbHandle } from './db-handle';
import { disable4G2G } from './clean';

const cwd = process.cwd();
// let serviceHandle: ChildProcessWithoutNullStreams | null = null;
// 设置日志文件路径
log.initialize();
log.transports.file.resolvePathFn = (): string => join(cwd, 'logs/app.log');
let mainWindow: BrowserWindow | null = null;
let timer: any = null;

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: '车检管理系统',
    width: 1280,
    height: 900,
    minHeight: 600,
    minWidth: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    // serviceHandle = spawn('E:\\release\\X-PrecisionLocator.exe', [], {
    //   cwd: 'E:\\release',
    //   windowsHide: false,
    // });
    // serviceHandle.on('error', (error) => {
    //   log.error(`服务出错: ${error.message}`);
    //   serviceHandle?.kill();
    //   if (mainWindow !== null) {
    //     mainWindow.webContents.send('start-service', false);
    //   }
    // });
    mainWindow?.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
  mainWindow.maximize();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.handle('is-set', async () => {
    try {
      await access(join(cwd, './set'));
      return true;
    } catch (error) {
      console.warn(error);
      return false;
    }
  });

  //退出应用
  ipcMain.on('do-close', () => {
    //mainWindow通知退出程序
    if (process.platform !== 'darwin') {
      if (mainWindow !== null) {
        mainWindow.destroy();
        mainWindow = null;
      }
      // if (serviceHandle !== null) {
      //   serviceHandle.kill();
      //   serviceHandle = null;
      // }
      disable4G2G();
      clearInterval(timer);
      app.exit(0);
    }
  });

  /**
   * 重启应用
   */
  ipcMain.on('do-relaunch', () => {
    app.relaunch();
    //mainWindow通知退出程序
    if (process.platform !== 'darwin') {
      if (mainWindow !== null) {
        mainWindow.destroy();
        mainWindow = null;
      }
      // if (serviceHandle !== null) {
      //   serviceHandle.kill();
      //   serviceHandle = null;
      // }
      app.exit(0);
    }
  });

  bindDbHandle();

  createWindow();

  timer = setInterval(() => {
    if (mainWindow !== null) {
      mainWindow.webContents.send('polling');
      // if (date.getSeconds() % 6 === 0) {
      //   mainWindow.webContents.send('polling');
      // }
    }
  }, 1000);

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // if (serviceHandle !== null) {
    //   serviceHandle.kill();
    //   serviceHandle = null;
    // }
    disable4G2G();
    clearInterval(timer);
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
