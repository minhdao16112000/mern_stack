const sizeModel = require('../models/SizeModel');
const { mongooseToObject } = require('../util/mongoose');


class SizeController {

    // [POST] /store
    store(req, res, next) {
        const size = new sizeModel(req.body);
        size.save()
            .then(() => res.json(size))
            .catch(next)
    }

    // [GET] /
    show(req, res, next) {
        Promise.all([sizeModel.find({}), sizeModel.countDocumentsDeleted()])
            .then(([Sizes, deletedCount]) =>
                res.json({
                    deletedCount,
                    Sizes
                })
            )
            .catch(next)
    }

    // [GET] /trash
    trash(req, res, next) {
        sizeModel.findDeleted({})
            .then(size => res.json(size))
            .catch(next)
    }

    // [GET] /:slug
    // show(req, res, next) {
    //     sizeModel.findOne({ slug: req.params.slug })
    //         .then(size => {
    //             // res.send(size, {
    //             // size: mongooseToObject(size)
    //             // });
    //             res.send(size)
    //         })
    //         .catch(next)
    // }



    // [GET] /:id/edit
    showById(req, res, next) {
        sizeModel.findById(req.params.id)
            .then(size => {
                res.json(size)
            })
            .catch(next)
    }

    // [PUT] /:id
    update(req, res, next) {
        sizeModel.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send(req.body)
            )
            .catch(next)
    }

    // [DELETE] /
    destroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        sizeModel.delete({ _id: idArr })
            .then(() => res.send('Delete Successfully !!!'))
            .catch(next);
    }

    // [DELETE] /force
    forceDestroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        sizeModel.deleteOne({ _id: idArr })
            .then(() => res.send('Delete Forever Successfully !!!'))
            .catch(next);
    }

    // [PATCH] /:id/restore
    restore(req, res, next) {
        try {
            const ids = req.body.data;
            ids.forEach(value => sizeModel.restore({ _id: value }, (err, result) => {
                if (err) throw err;
                console.log(result);
            }));
            res.send('Restore Successfully !!!');
        } catch (error) {
            res.json({ error: err });
        }
    }

    // [POST] /handle-form-actions
    // handleFormAction(req, res, next) {
    //     switch (req.body.action) {
    //         case 'delete':
    //             sizeModel.delete({ _id: { $in: req.body.sizeIds } })
    //                 // .then(() => res.redirect('back'))
    //                 .then(() => res.send('Đã xóa các size đã chọn !!!'))
    //                 .catch(next);
    //             break;

    //         default:
    //             res.json({ message: 'Action in invalid' })
    //     }
    // }

}

module.exports = new SizeController();