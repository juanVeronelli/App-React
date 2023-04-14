const jwt = require('jsonwebtoken');
const config = require('../../../config');
const { model } = require('../models/user');

exports.verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(400).send({ status: "Error", message: "Falta el token" });

    const decoded = jwt.verify(token, config.SECRET);
    const userId = decoded.id;

    const user = await model.findById(userId);
    if (!user) return res.status(404).send({ status: "Error", message: "No enocntramos el usuario" });
    res.status(200).send({ status: "Success", message: user});
    next();
}