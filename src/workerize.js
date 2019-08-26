/* eslint-disable no-restricted-globals */
import toAST from 'to-ast';
import escodegen from 'escodegen';

function workerScript(action) {
  console.log('Worker is running...');

  const handleMessage = e => {
    console.log(`Received message: ${JSON.stringify(e.data)}`);
    const args = e.data.args;
    const result = action.apply(this, args);
    self.postMessage({ result });
  };

  self.onmessage = handleMessage;
}

function executeWorker(worker, args) {
  return new Promise((resolve, reject) => {
    worker.addEventListener('message', e => {
      const result = e.data.result;
      resolve(result);
    });
    worker.postMessage({ args: [...args] });
  });
}

export function workerize(action) {
  const actionStr = escodegen.generate(toAST(action));
  const code = `(${escodegen.generate(toAST(workerScript))})(${actionStr})`;

  var blob = new Blob([code], { type: 'text/javascript' });

  const worker = new Worker(URL.createObjectURL(blob));
  return function(...args) {
    return executeWorker(worker, args);
  };
}
