const electron = require('electron');
const path = require('path');
const url = require('url');

const { app, BrowserWindow, Menu } = electron;

let win;
let nuevoProducto;

if ( process.env.NODE_ENV !== 'production'){

  require('electron-reload')(__dirname, {
      electron : path.join(__dirname,'../node_modules','.bin','electron')
  });

}  

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL(url.format({
    pathname: path.join( __dirname, 'src/views/index.html'),
    protocol: 'file',
    slashes: true
  }));

  const main = Menu.buildFromTemplate(templateMenu);

  Menu.setApplicationMenu(main);
}

app.on('ready', createWindow);

function viewDashboard()
{
  nuevoProducto = new BrowserWindow({
    width : 1200,
    height : 728,
    title : 'View Dashboard'
  });
 
  nuevoProducto.loadURL(url.format({
    pathname : path.join(__dirname,'src/views/dashboard.html'),
    protocol : 'file',
    slashes  : true
  }));
}



const  templateMenu  = [
  {
    label : 'File',
     submenu : [
       {
         label : 'Nuevo Producto',
         accelerator : 'Ctrl+N',
         click()  {
          viewDashboard();
         }
       },
       {
         label : 'Exit',
         accelerator : process.platform === 'darwin' ? 'command+Q' : 'Ctrl+Q',
         click () {
           app.quit();
         }
       }
     ]
  }
];





if (process.env.NODE_ENV !== 'production'){
  templateMenu.push(
    {
        label : 'De Tools',
        submenu : [
          {
            label : 'Show/ hide Dev Tools',
            click(item , focusedWindow){
              focusedWindow.toggleDevTools(); // Permite visualizar el quit de herramientas del navegador
            }
          },
          {
              role  :  'reload'
          }
        ]
    }
  );
}



