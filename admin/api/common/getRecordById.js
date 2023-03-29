const { app } = require('../database/conn');

const getById = (path, model) => {
  app.get(`${path}/:id`, async (req, res) => {
    try {
      const result = await model.findByPk(req.params.id);

      if (!result)
        return res.status(422).json({ message: 'Record not found!' });
        
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    };
  });
};

module.exports = getById;
