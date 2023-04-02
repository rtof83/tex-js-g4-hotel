const { app } = require("../database/conn");
// const checkAdmin = require('../middlewares/checkAdmin');
// const checkValidate = require("../middlewares/checkValidate");
const isAuth = require("../middlewares/isAuth");

const deleteRecord = (path, model) => {
  app.delete(`${path}/:id`, isAuth, async (req, res) => {
    try {
      const result = await model.findByPk(req.params.id);

      if (!result)
        return res.status(422).json({ message: "Record not found!" });

      await result.destroy();

      // await result.update({ deletedAt: Date.now() });
      // res.status(200).json({ message: "Record disabled successfully" });

      res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports = deleteRecord;
