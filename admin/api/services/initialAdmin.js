const User = require('../models/User.js');
const defaultValues = require('./default');

module.exports = async () => {
  try {
    await User.sync();

    const user = await User.findAll();

    if (!user.length) {
      await User.create(await defaultValues.admin());
      console.log('initial admin created...');
    };
  } catch (error) {
    console.log(error.message);
  };
};
