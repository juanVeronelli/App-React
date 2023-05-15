const jwt = require('jsonwebtoken');
const decode = require('jwt-decode')
const config = require('../../../config');
const { model } = require('../models/user');

exports.verifyToken = async (req, res, next) => {
    try {

        const token = req.headers["x-access-token"];
        if (!token) return res.status(400).send({ status: "Error", message: "Falta el token" });

        const decoded = jwt.verify(token, process.env.SECRET);
        const userId = decoded.id;

        const user = await model.findById(userId);
        if (!user) return res.status(404).send({ status: "Error", message: "No enocntramos el usuario" });
        next();
    } catch (err) {
        console.log(err)
    }
}