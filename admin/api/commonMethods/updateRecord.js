const { app } = require('../database/conn');
const checkAdmin = require('../middlewares/checkAdmin');

const updateRecord = (path, table) => {
  app.put(`${path}/:id`, checkAdmin, async (req, res) => {
    try {
      // console.log(req.body)

      // for (let i = 0; i < )

        // let query = [];


        const body = req.body;
        // { userId:1, image: 'asasdasd', slogan: 'asasdas' }





        // Object.keys(body).forEach((key) => {
        //   if (key !== 'userId')
        //     console.log()
        //     query.push({ body[key]: value })
        // })

      // console.log(query);

      // const arr = [{ image: 'asasdasd'}, {slogan: 'asasdas' }];

      // Object.keys(arr[0]).forEach((key) => {
      //     // if (key !== 'userId')
      //       console.log(key)
      //       console.log(arr[0][key])
      //   })

      // console.log(arr[0][Object. (arr[0])])
      

      // const [rows] = await global.connection.query(`SELECT * FROM ${table} WHERE id = ${req.params.id}`);

      // if (!rows.length)
      //   return res.status(422).json({ message: 'Record not found!' });

      // await global.connection.query(`UPDATE ${table} SET body WHERE id = ${req.params.id}`);
        
      res.status(200).json({ message: 'Record updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    };
  });
};

module.exports = updateRecord;
