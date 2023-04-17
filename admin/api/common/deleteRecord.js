const { app } = require("../database/conn");
const isAuth = require("../middlewares/isAuth");

const deleteRecord = (path, model) => {
  app.delete(`${path}/:id`, isAuth, async (req, res) => {
    try {
      const result = await model.findByPk(req.params.id);

      if (!result)
        return res.status(422).json({ message: "Record not found!" });

      await result.destroy();

      return res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
};

module.exports = deleteRecord;
