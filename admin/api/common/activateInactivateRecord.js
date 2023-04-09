const { app } = require("../database/conn");
const checkAdmin = require('../middlewares/checkAdmin');

const activateInactivateRecord = (path, model) => {
  app.post(`${path}/activate`, checkAdmin, async (req, res) => {
    try {
      const status = req.query.status ? req.query.status : true;
      console.log(status);
      const result = await model.findByPk(req.body.id);

      if (!result)
        return res.status(422).json({ message: "Record not found!" });

      await result.update({ deletedAt: status === true ? null : Date.now() });

      return res.status(200).json({ message: `Record ${status === true ? 'activated' : 'deactivated'} successfully` });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
};

module.exports = activateInactivateRecord;
