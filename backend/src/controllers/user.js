const { model, encryptPassword, comparePassword } = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

const user = {
    //add user to database
    add: async (req, res) => {
        try {

            console.log(req, body);

            var body = req.body;
            var user = new model();

            //assign values
            user.username = body.username
            user.password = await encryptPassword(body.password);
            user.email = body.email

            //save user
            const savedUser = await user.save()

            const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
                expiresIn: 10800 // 3 horas
            });

            if (!savedUser) return res.status(404).send({ status: "Error", message: "No se ha podido guardar", error: err });
            return res.status(200).send({ status: "success", user, token })

        } catch (err) {

        }
    },

    // get users from database
    get: async (req, res) => {
        try {

            var query = await model.findOne({ email: req.body.email });

            if (!query) return res.status(400).send({ status: "Error", message: "usuario no encontrado" }); // handle error

            const matchPassword = await comparePassword(req.body.password, query.password);
            if (!matchPassword) return res.status(401).send({ status: "Error", message: "Contraseña incorrecta" });

            const token = jwt.sign({ id: query._id }, config.SECRET, {
                expiresIn: 10800
            })

            return res.status(200).send({ status: "Success", query, token });

        } catch (err) { console.log(err) }
    }
};

module.exports = user