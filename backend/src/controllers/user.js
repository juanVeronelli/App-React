const { model, encryptPassword, comparePassword } = require('../models/user');
const jwt = require('jsonwebtoken');
const cookie = require('js-cookie');
const config = require('../../../config');

const user = {
    //add user to database
    add: async (req, res) => {
        try {
            
            var body = req.body;
            var user = new model();
            
            //validate
            let users = await model.find();
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == body.email) return console.log('user already registered');    
            };

            //assign values
            user.username = body.username
            user.password = await encryptPassword(body.password);
            user.email = body.email

            //save user
            const savedUser = await user.save()

            const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
                expiresIn: '3h' // 3 horas
            });

            if (!savedUser) return res.status(404).send({ status: "Error", message: "No se ha podido guardar", error: err });
            return res.status(200).send({ status: "success", user, token })

        } catch (err) {

        }
    },

    // get users from database and logins them
    get: async (req, res) => {
        try {
            var query = await model.findOne({ email: req.body.email });

            if (!query) return res.status(400).send({ status: "Error", message: "usuario no encontrado" }); // handle error

            const matchPassword = await comparePassword(req.body.password, query.password);
            if (!matchPassword) return res.status(401).send({ status: "Error", message: "Contraseña incorrecta" });

            const token = jwt.sign({ id: query._id }, config.SECRET, {
                expiresIn: '3h'
            });
            
            res.set("x-access-token", token);
            res.cookie('token', token, { httpOnly: true, secure: false });
            return res.status(200).send({token});

        } catch (err) { console.log(err) }
    },
};

module.exports = user