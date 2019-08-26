import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SearchWithoutWorker from './SearchWithoutWorker';
import WorkerizedTask from './WorkerizedTask';

ReactDOM.render(<WorkerizedTask />, document.getElementById('root'));
