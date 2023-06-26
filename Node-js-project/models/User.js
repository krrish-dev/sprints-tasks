// User model
// For login to test authorization  
// email : krrish@web.dev  , pw : P@asword
// P@asword  == hashed ==> b695b65072631ba885f63806c77db9325f9ae702f4f9e40743d1cb659e7d4070

const users = [
  {
    id: 1,
    email: 'krrish@web.dev',
    password: 'b695b65072631ba885f63806c77db9325f9ae702f4f9e40743d1cb659e7d4070',
    roles: ['products.create', 'products.update', 'products.delete'],
  },
  {
    id: 2,
    email: 'test@test.com',
    password: 'b695b65072631ba885f63806c77db9325f9ae702f4f9e40743d1cb659e7d4070',
    roles: ['products.create'],
  },
];

module.exports = {
  users,
};
