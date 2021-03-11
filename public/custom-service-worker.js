/* eslint-disable no-restricted-globals */
addEventListener("install", (e) => {
  e.waitUntil(self.skipWaiting());
});
addEventListener("message", (e) => {
  console.log(e);
});
addEventListener("push", (e) => {
  if (!e.data) {
    return;
  }
  // ペイロードを JSON 形式でパース
  const payload = e.data.json();
  if (payload.type === "MESSAGE_SENT") {
    e.waitUntil(
      self.registration.showNotification("捨魚", {
        body: "メッセージを受信しました。",
        icon: "http://free-images.gatag.net/images/201108090000.jpg",
        tag: "push-notification-tag",
        data: payload,
      })
    );
  }
});

self.addEventListener(
  "notificationclick",
  (e) => {
    const { notification } = e;
    notification.close();
    if (notification.data.type === "MESSAGE_SENT") {
      self.clients.openWindow("/messaging");
    } else {
      self.clients.openWindow("/");
    }
  },
  false
);
