// sett model
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    "username": String,
    "password": String,
    "email": String

});

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const comparePassword = async (password, hashPassword) =>{
    return await bcrypt.compare(password, hashPassword);
}

const model = mongoose.model('USERS', userSchema);
module.exports = {
    model,
    encryptPassword,
    comparePassword
}
