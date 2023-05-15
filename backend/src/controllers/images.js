const model = require('../models/image');
const decode = require('jwt-decode')
const image = {
    get: async (req, res) => {
        try {
            await model.find()
                .populate("user").then(async (user) => {
                    res.status(200).send({
                        images: (user == null) ? 'el usuario se borro' : user,
                        count: JSON.stringify(await model.estimatedDocumentCount())
                    });
                }).catch((err) => {
                    console.log(err)
                })

        } catch (err) {
            console.log(err)
        }
    },
    post: async (req, res) => {
        try {
            if (!req.body) return res.status(404).send({ status: "Error", message: "Not found body" });

            const token = req.headers["x-access-token"];
            if (!token) return res.send({ status: "Error", message: "Not Found Token" });

            const id = decode(token).id
            if (!id) return res.status(401).send({ status: "Error", message: 'not found user' });

            const image = new model();
            const imageUrl = `${req.protocol}://${req.get('host')}/public/uploads/${req.file.filename}`;

            image.title = req.body.title
            image.date = req.body.date
            image.description = req.body.description
            image.url = imageUrl
            image.user = id

            const ok = await image.save();
            if (!ok) return res.status(404).send({ status: "Error", message: "cant save document" })
            return res.status(200).send({ status: "succesfuly", message: "Image saved successfully" })
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = image;