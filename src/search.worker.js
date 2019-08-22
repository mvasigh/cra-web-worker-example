/* eslint-disable no-restricted-globals */
import faker from 'faker';

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

const employees = generateEmployees(30000);

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

function handleMessage(e) {
  const { query, options } = e.data;
  const matches = findMatches(query, options);
  self.postMessage(matches);
}

self.addEventListener('message', handleMessage);
