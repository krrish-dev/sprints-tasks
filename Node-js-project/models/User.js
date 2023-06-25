// User model

const users = [
  {
    id: 1,
    email: 'krrish1@web.dev',
    password: 'P@asword',
    roles: ['products.read', 'products.list'],
  },
  {
    id: 2,
    email: 'test@test.com',
    password: '12345',
    roles: ['products.list'],
  },
];

module.exports = {
  users,
};
