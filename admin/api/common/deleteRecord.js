const { app } = require('../database/conn');
const checkAdmin = require('../middlewares/checkAdmin');

const deleteRecord = (path, model) => {
  app.delete(`${path}/:id`, checkAdmin, async (req, res) => {
    try {
      const result = await model.findByPk(req.params.id);

      if (!result)
        return res.status(422).json({ message: 'Record not found!' });

      await result.destroy();
        
      res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    };
  });
};

module.exports = deleteRecord;
