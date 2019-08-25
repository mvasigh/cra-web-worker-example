import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SearchWithoutWorker from './SearchWithoutWorker';
import { wrap } from './wrap';

const wrappedAdd = wrap((num1, num2) => num1 + num2);

wrappedAdd(2, 2).then(result => console.log(result));

// const fn = () => {
//   console.log('hello world');
//   // eslint-disable-next-line no-restricted-globals
//   self.onmessage = () => console.log('listening');
// }

// const code = `(
//   ${escodegen.generate(toAST(fn))}
// )()`

// worker.postMessage('hello')

ReactDOM.render(<App />, document.getElementById('root'));
