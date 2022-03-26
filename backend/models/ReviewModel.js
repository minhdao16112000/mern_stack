const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const ReviewModel = new Schema({
    productId: { type: String },
    content: { type: String },
    rating: { type: Number },
    isApproved: { type: Number, default: 1 },
    commParent: { type: String },
    created_by: { type: String },
    update_by: { type: String, default: "" }
}, {
    timestamps: true,
});

// At Plugin
mongoose.plugin(slug);
ReviewModel.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Review', ReviewModel);