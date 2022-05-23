const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const UserModel = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        // avartar: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: Number, default: 1 },
        sex: { type: Number, required: true, default: 0 },
        phone: { type: String, required: true, unique: true, default: 0 },
        address: { type: String, default: '' },
        favorites: [
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
            },
        ],
        faceBookId: { type: String, default: '' },
        googleId: { type: String, default: '' },
        provider: { type: String, default: '' },
    },
    {
        timestamps: true,
    }
);

// At Plugin
// mongoose.plugin(slug);
UserModel.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('User', UserModel);
