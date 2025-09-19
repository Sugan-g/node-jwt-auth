import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'please add a username'],
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: [true, 'please add an email'],
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'please add a password'],
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

// optional hide sensitive fields when converting to JSON 
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
}

export default mongoose.models.User || mongoose.model('User', userSchema);