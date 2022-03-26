const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const ContactModel = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    reply: { type: String },
    repliedAt: { type: Date },
    status: { type: Boolean, default: false, }
}, {
    timestamps: true,
});

// At Plugin
ContactModel.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Contact', ContactModel);