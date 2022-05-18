const colorModel = require('../models/ColorModel');
const { mongooseToObject } = require('../util/mongoose');

class ColorController {
    // [POST] /store
    store(req, res, next) {
        const color = new colorModel(req.body);
        color
            .save()
            .then(() => res.send(color))
            .catch(next);
    }

    // [GET] /
    show(req, res, next) {
        Promise.all([colorModel.find({}), colorModel.countDocumentsDeleted()])
            .then(([Colors, deletedCount]) =>
                res.json({
                    deletedCount,
                    Colors,
                })
            )
            .catch(next);
    }

    // [GET] /:id/edit
    showById(req, res, next) {
        colorModel
            .findOne({ _id: req.params.id })
            .then((color) => {
                res.json(color);
            })
            .catch(next);
    }

    // [GET] /trash
    trash(req, res, next) {
        colorModel
            .findDeleted({})
            .then((color) => res.json(color))
            .catch(next);
    }

    // [PUT] /:id
    update(req, res, next) {
        colorModel
            .updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send(req.body))
            .catch(next);
    }

    // [DELETE] /
    destroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        colorModel
            .delete({ _id: idArr })
            .then(() => res.send('Delete Successfully !!!'))
            .catch(() => res.send({ message: 'Delete failed' }));
    }

    // [DELETE] /force
    forceDestroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        colorModel
            .deleteOne({ _id: idArr })
            .then(() => res.send('Delete Forever Successfully !!!'))
            .catch(() => res.send({ message: 'Delete Forever failed' }));
    }

    // [PATCH] /:id/restore
    restore(req, res, next) {
        try {
            const ids = req.body.data;
            ids.forEach((value) =>
                colorModel.restore({ _id: value }, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                })
            );
            res.send('Restore Successfully !!!');
        } catch (error) {
            res.send({ message: err });
        }
    }
}

module.exports = new ColorController();
