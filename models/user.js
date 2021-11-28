const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim : true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength : 7,
        trim : true,
    }
    
});

User.method.toJSON = function () {
    const user = this;
    const userobj = user.toObject();

    delete userobj.password;

    return userobj;
}

User.statics.findByCredentials = async (name, password) => {
    const user = await userModel.findOne({ name });
    // console.log(user);
    if (!user)
    {
        throw new Error('Unable to find user');
    }

    const isMatch = await bcrypt.compare(password, user.password); 

    if (!isMatch)
    {
        throw new Error('Unable to login');
    }

    return user;
}

User.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const userModel = mongoose.model('User', User);

module.exports = userModel;