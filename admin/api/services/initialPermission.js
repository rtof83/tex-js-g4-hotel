const Permission = require('../models/Permission.js');
const defaultValues = require('./default');

module.exports = async () => {
  try {
    await Permission.sync();

    const permission = await Permission.findAll();

    if (!permission.length) {
      await Permission.bulkCreate(defaultValues.permissions);
      console.log('initials permissions created...');
    };
  } catch (error) {
    console.log(error.message);
  };
};
