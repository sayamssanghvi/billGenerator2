const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
const path = require('path');
let db = require('./backend/db/sequelize');
let vendorBiz = new (require('./backend/biz/vendor.biz'));
let billBiz = new (require('./backend/biz/bill.biz'));
let productBiz = new (require('./backend/biz/product.biz'));
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require('electron-squirrel-startup')) {
//     app.quit();
// }

const createWindow = () => {
    global.db = db;
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: false
            // preload: path.join(__dirname, 'preload.js'),
        },
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    mainWindow.maximize();
};

ipcMain.on('createVendor', async (event, vendor) => {
    await vendorBiz.create(vendor);
});

ipcMain.on('createProduct', async (event, product) => {
    await productBiz.create(product);
});

ipcMain.on("searchVendor", async (event, searchText) => {
    let vendors = await vendorBiz.searchByName(searchText);
    event.returnValue = vendors;
});

ipcMain.on("searchProductByName", async (event, searchText) => {
    let products = await productBiz.searchByName(searchText);
    event.returnValue = products;
});

ipcMain.on("searchProductByHSN", async (event, searchText) => {
    console.log("HSN called");
    let products = await productBiz.searchByHSN(searchText);
    event.returnValue = products;
});

ipcMain.on('createBill', async (event, billDetails) => {
    let bill = await billBiz.create(billDetails);
    event.returnValue = bill;
});

ipcMain.on("searchBill", async (event, billNo) => {
    let bill = await billBiz.search({ billNo });
    event.returnValue = bill;
});

ipcMain.on('updateBill', async (event, billDetails) => {
    let bill = await billBiz.update(billDetails);
    event.returnValue = bill;
});

ipcMain.on('savePDF', async (event, data) => {
    let result = await billBiz.savePDF(data);
    event.returnValue = result;
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
