const { app } = require('../../database/conn');
const checkAdmin = require('../../middlewares/checkAdmin');

module.exports = app.put('/banners/:id', checkAdmin, async (req, res) => {
  try {
    const [rows] = await global.connection.query(`SELECT * FROM banner WHERE id = ${req.params.id}`);

    if (!rows.length)
      return res.status(422).json({ message: 'Record not found!' });

    await global.connection.query(`UPDATE banner SET image = "${req.body.image}", slogan = "${req.body.slogan}"`);
      
    res.status(200).json({ message: 'Banner updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
