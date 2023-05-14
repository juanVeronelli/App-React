const model = require('../models/image');

//auth 
const authToken = require('../middlewares/auth');

const image = {
    get: async (req, res) => {
        try {
            await model.find()
                 .populate("user").then(async (user) => {
                    res.status(200).send({
                        images : (user == null) ? 'el usuario se borro' : user ,
                        count: JSON.stringify( await model.estimatedDocumentCount())
                    });
                  }).catch((err) => {
                    console.log(err)
                  })

        } catch (err) {
            console.log(err)
         }
    }
}

module.exports = image;