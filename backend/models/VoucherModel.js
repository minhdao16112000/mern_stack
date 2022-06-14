const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const VoucherModel = new Schema(
    {
        title: { type: String, required: true },
        idCharacter: { type: String, required: true },
        quantity: { type: Number, required: true },
        code: { type: Array, default: [] },
        type: { type: Number, required: true },
        discount: { type: Number, required: true },
        used: { type: Array, default: [] },
        expire: { type: Date, required: true },
        min: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

// At Plugin
mongoose.plugin(slug);
VoucherModel.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Voucher', VoucherModel);
