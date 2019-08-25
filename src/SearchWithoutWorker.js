import React, { useState, useEffect } from 'react';
import faker from 'faker';
import { debounce } from 'throttle-debounce';

function generateEmployees(num) {
  return Array(num)
    .fill()
    .map(() => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      return {
        id: faker.random.uuid(),
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        position: `${faker.name.jobDescriptor()} ${faker.name.jobTitle()}`
      };
    });
}

const employees = generateEmployees(100000);

function findMatches(query, options = { limit: 30 }) {
  const regex = new RegExp(query, 'gi');
  let matchedEmployees = [];
  for (let employee of employees) {
    let matches;
    Object.keys(employee).forEach(key => {
      const match = String(employee[key]).match(regex);
      if (match) {
        matches = matches || {};
        matches[key] = match;
      }
    });
    if (!matches) continue;
    employee.matches = matches;
    matchedEmployees.push(employee);
    if (matchedEmployees.length >= options.limit) {
      break;
    }
  }
  return matchedEmployees;
}

function App() {
  const [matches, setMatches] = useState([]);

  const debouncedFindMatches = debounce(500, query => {
    const matches = findMatches(query);
    setMatches(matches);
  });

  const basicFindMatches = query => {
    const matches = findMatches(query);
    setMatches(matches);
  };

  const handleChange = e => {
    const query = e.target.value;
    if (!query) {
      return setMatches([]);
    }
    basicFindMatches(query);
  };

  return (
    <div className="App">
      <input style={{ fontSize: '2em' }} type="text" onChange={handleChange} />
      <pre style={{ width: '800px', display: 'block' }}>
        {JSON.stringify(matches, null, 2)}
      </pre>
    </div>
  );
}

export default App;
