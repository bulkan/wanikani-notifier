const path = require("path");
const { app, Menu, Tray, Notification } = require("electron");

function main() {
  const tray = new Tray(path.join(__dirname, "../assets/icons/16x16.png"));

  const contextMenu = Menu.buildFromTemplate([
    { label: "Item1", type: "radio" },
  ]);

  tray.setToolTip("This is my application.");
  tray.setContextMenu(contextMenu);

  const myNotification = new Notification({
    title: "New Reviews",
    icon: path.join(__dirname, "../assets/icons/16x16.png"),
    body: "yo",
  });

  myNotification.show();
}

app.dock.hide();
app
  .whenReady()
  .then(main)
  .catch(err => console.error);
