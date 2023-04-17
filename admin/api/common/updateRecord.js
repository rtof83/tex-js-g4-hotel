const { app } = require("../database/conn");
const isAuth = require("../middlewares/isAuth");

const updateRecord = (path, model) => {
  app.put(`${path}/:id`, isAuth, async (req, res) => {
    try {
      const result = await model.findByPk(req.params.id);

      if (!result)
        return res.status(422).json({ message: "Record not found!" });

      await result.update(req.body);

      return res.status(200).json({ message: "Record updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
};

module.exports = updateRecord;
