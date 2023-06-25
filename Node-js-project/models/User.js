// User model
// P@asword  == hashed ==> b695b65072631ba885f63806c77db9325f9ae702f4f9e40743d1cb659e7d4070
const users = [
  {
    id: 1,
    email: 'krrish@web.dev',
    password: 'b695b65072631ba885f63806c77db9325f9ae702f4f9e40743d1cb659e7d4070',
    roles: ['products.read', 'products.list'],
  },
  {
    id: 2,
    email: 'test@test.com',
    password: 'b695b65072631ba885f63806c77db9325f9ae702f4f9e40743d1cb659e7d4070',
    roles: ['products.list'],
  },
];

module.exports = {
  users,
};
