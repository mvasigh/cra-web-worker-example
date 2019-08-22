import React, { useState, useEffect, useRef } from 'react';
import SearchWorker from './search.worker';

function App() {
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState([]);
  const worker = useRef();

  useEffect(() => {
    worker.current = new SearchWorker();
    worker.current.addEventListener('message', handleMatches);
    return () => worker.current.terminate();
  }, []);

  useEffect(() => {
    if (!query) {
      return setMatches([]);
    }
    worker.current.postMessage({ query, options: { limit: 50 } });
  }, [query]);

  const handleMatches = e => setMatches(e.data);

  const handleChange = e => setQuery(e.target.value);

  return (
    <div className="App">
      <input
        style={{ fontSize: '2em' }}
        type="text"
        value={query}
        onChange={handleChange}
      />
      <pre style={{ width: '800px', display: 'block' }}>
        {JSON.stringify(matches, null, 2)}
      </pre>
    </div>
  );
}

export default App;
