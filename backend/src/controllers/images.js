const model = require('../models/image');

//auth 
const authToken = require('../middlewares/auth');

const image = {
    add: async (req, res) => {
        try {
            if (!req.body) throw { error: "Not Found", info: "Body is not defined" };
            var body = req.body;
            var image = new model();

            //assing values
            image.url = body.url;
            image.user = body.user;

            // save image in collection
            const savedImage = await image.save()

            if (!savedImage) throw { error: "Failed to save image", info: "No se pudo guardar la imagen" };
            return res.status(200).send(savedImage);

        } catch (err) {
            console.error(err);
        }
    },

    get: async (req, res) => {
        try {
            await model.find()
                 .populate("user").then(async (user) => {
                    res.status(200).send({
                        images : user,
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