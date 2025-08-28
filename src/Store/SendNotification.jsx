export const SendNotification = (title, message) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body: message,
    })
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification(title, {
          body: message,
        })
      }
    })
  }
  return
}
