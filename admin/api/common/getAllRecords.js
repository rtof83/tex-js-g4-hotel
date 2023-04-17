const { app } = require("../database/conn");

const getAll = (path, model) => {
  app.get(path, async (_, res) => {
    try {
      const result = await model.findAll({ attributes: { exclude: ["password"] }});

      if (!result)
        return res.status(422).json({ message: "Record not found!" });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
};

module.exports = getAll;
