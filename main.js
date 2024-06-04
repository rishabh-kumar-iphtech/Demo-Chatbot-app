const { app, BrowserWindow, session } = require("electron");
const url = require("url");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: false,
      contextIsolation: true,
      backgroundThrottling: false,
      allowRunningInsecureContent: true,
      // preload: path.join(__dirname, "preload.js"),

      additionalArguments: [
        "--disable-site-isolation-trials",
        "--disable-features=site-per-process",
        `--disable-features=CrossSiteDocumentBlockingIfIsolating`,
        `--disable-feature=IsolateOrigins`,
      ],
    },
  });

  // mainWindow.webContents.openDevTools();
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "dist", "test-chatbot", "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
