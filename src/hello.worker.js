/* eslint-disable no-restricted-globals */
function handleMessage() {
  setTimeout(() => {
    self.postMessage(`Pong!`);
  }, 3000);
}

self.addEventListener('message', handleMessage);
