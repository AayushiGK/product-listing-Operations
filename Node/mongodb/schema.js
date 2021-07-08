module.exports = function () {
    var mongoose = require("./connectdb")();
    // const AutoIncrement = require('mongoose-sequence')(mongoose);
    var UserSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        profileImage: String,
        isDeleted:{
            type:String,
            default:"0"
        },
        email: {
            type: String,
            validate: {
                validator: function (v) {
                    return /[0-9\+\-\ ]/;
                },
                message: 'Email validation failed'
            },
            required: [true, 'Email required']
        },

        contact: {
            type: String,
            validate: {
                validator: function (v) {
                    return /\d{3}-\d{3}-\d{4}/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            },
            required: [true, 'User phone number required']
        }
    });

    var Users = mongoose.model("users", UserSchema);
    return { model: { Users } }
}
