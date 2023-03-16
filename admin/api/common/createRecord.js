const { app } = require('../database/conn');
const checkAdmin = require('../middlewares/checkAdmin');

const createRecord = (path, model) => {
  app.post(path, checkAdmin, async (req, res) => {
    try {
      // await model.create(req.body);

      res.status(201).json({ message: 'Record inserted successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    };
  });
};

module.exports = createRecord;
