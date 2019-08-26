import React, { useState, useRef, useEffect, useCallback } from 'react';
import { workerize } from './workerize';
import { longestCommonSubstring } from './commonSubstring';
import './App.css';

// function useTask(fn) {
//   const workerizedFn = useRef();

//   useEffect(() => {
//     workerizedFn.current = workerize(fn);
//   }, [fn])

//   return useCallback((...args) => {
//     return workerizedFn.current(...args);
//   }, []);
// }

const workerizedFn = workerize(longestCommonSubstring);

const WorkerizedTask = () => {
  const [strings, setStrings] = useState(['']);
  const [common, setCommon] = useState();
  const handleChange = i => e => {
    const newState = [...strings];
    newState[i] = e.target.value;
    setStrings(newState);
  };
  const handleAddInput = () => setStrings([...strings, '']);

  useEffect(() => {
    workerizedFn(strings).then(res => setCommon(res));
  }, [strings]);

  return (
    <div className="App">
      <h2>Longest Common Substring</h2>
      <p>{common}</p>
      {strings.map((string, i) => (
        <div key={i}>
          <input type="text" value={string} onChange={handleChange(i)} />
        </div>
      ))}
      <div>
        <button onClick={handleAddInput}>Add Input</button>
      </div>
    </div>
  );
};

export default WorkerizedTask;
