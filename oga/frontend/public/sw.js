function receivePushNotification(event) {
  const { image, tag, url, title, text, data, id, location } = event.data.json();
  let options = {}
  switch(tag) {
    case 'q':
      options = {
        data: 'reply/' + id,
        body: text +' at\n' + location + '?',
        tag: tag, //this is needed to hide duplicate notifications
        actions: [{ action: "Detail", title: "Reply" }]
      }
    break;
    case 'a':
      options = {
        data: 'reply/' + id,
        body: text + ' at\n' + location,
        tag: tag, //this is needed to hide duplicate notifications
        actions: [{ action: "Detail", title: "Read" }]
      }
    break;
  }

  console.log(options);
  event.waitUntil(self.registration.showNotification("Oga", options));
}

function openPushNotification(event) {
  console.log("[Service Worker] Notification click Received.", event.notification.data);
  
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
}

self.addEventListener("push", receivePushNotification);
self.addEventListener("notificationclick", openPushNotification);
