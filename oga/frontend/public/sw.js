function receivePushNotification(event) {
  console.log("HI [Service Worker] Push Received.");
  console.log(event.data.json().text);

  const { image, tag, url, title, text, data } = event.data.json();

  const options = {
    data: url,
    body: text,
    //icon: image,
    //vibrate: [200, 100, 200],
    tag: "1",
    //image: image,
    //badge: "https://spyna.it/icons/favicon.ico",
    actions: [{ action: "Detail", title: "Look" }]
  };
  event.waitUntil(self.registration.showNotification(title, options));
}

function openPushNotification(event) {
  console.log("[Service Worker] Notification click Received.", event.notification.data);
  
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
}

self.addEventListener("push", receivePushNotification);
self.addEventListener("notificationclick", openPushNotification);
