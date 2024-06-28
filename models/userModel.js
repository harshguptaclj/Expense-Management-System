const mongoose = require('mongoose')

//Schema design
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);

//export
const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;