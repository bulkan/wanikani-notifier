import path from "path";
import notifier from "node-notifier";

export const showNotification = (message: string) => {
  notifier.notify({
    wait: false,
    contentImage: path.join(__dirname, "../assets/wk.jpg"),
    icon: path.join(__dirname, "../assets/wk.jpg"),
    title: "wanakani-notifeir",
    message,
  });
};
