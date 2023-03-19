const admin = async () => {
  return {
    name: 'admin',
    email: 'admin@email.com',
    password: await require('./hashPassword')('admin'),
    status: 1,
    permissionId: 1
  }
};

const permissions = [{ type: 'admin' }, { type: 'user' }];

module.exports = { admin, permissions };
