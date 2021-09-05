const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/ngshop',
    '<rootDir>/apps/admin',
    '<rootDir>/libs/ui',
    '<rootDir>/libs/users',
    '<rootDir>/libs/products',
    '<rootDir>/libs/orders',
  ],
};
