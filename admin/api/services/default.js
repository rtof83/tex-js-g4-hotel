const admin = async () => {
  return {
    name: 'admin',
    email: 'admin@email.com',
    password: await require('./hashPassword')('Admin123@456'),
    status: 1,
    permissionId: 1
  }
};

const permissions = [{ type: 'admin' }, { type: 'user' }];

module.exports = { admin, permissions };
