const { app } = require('../database/conn');

const getById = (path, model) => {
  app.get(`${path}/:id`, async (req, res) => {
    try {
      const result = await model.findByPk(req.params.id);

      if (!result)
        return res.status(422).json({ message: 'Record not found!' });
        
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    };
  });
};

module.exports = getById;
