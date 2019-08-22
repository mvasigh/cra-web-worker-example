import React, { useState, useEffect } from 'react';
import HelloWorker from './hello.worker';
import './App.css';

function App() {
  const [reply, setReply] = useState();

  useEffect(() => {
    const worker = new HelloWorker();
    worker.addEventListener('message', e => setReply(e.data));
    worker.postMessage('Ping...');
  }, []);

  return (
    <div className="App">
      <h1>{reply || '...'}</h1>
    </div>
  );
}

export default App;
