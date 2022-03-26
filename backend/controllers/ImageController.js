const { JsonWebTokenError } = require('jsonwebtoken');
const imageModel = require('../models/ImageModel');
const uploadFile = require('../util/multerImage');

class ImageController {

    uploadImg = uploadFile.single('image');

    /* ----Begin Actions Add Image ---- */

    //UploadImage
    uploadSingleImg = async (req, res, next) => {
        try {
            res.send('File Uploaded Successfully')
        } catch (error) {
            res.send(error.message);
        }
    }

    // [Image] /store
    store(req, res, next) {
        const info = JSON.parse(req.body.infos);
        const image = new imageModel({
            image: req.file.path.slice(23),
            categoryId: info.categoryId,
            title: info.title,
            content: info.content,
            promotion: info.promotion,
            position: info.position,
            status: info.status,
        });
        image.save()
            .then(() => res.json({
                info: {
                    image,
                },
                message: {
                    message: "Add Image Successfully !!!"
                }
            }))
            .catch(err => {
                res.json({ error: err });
            })
    }

    /* ----End Actions Add Image ---- */

    /* ----Begin Actions Update Image ---- */

    // [PUT] /:id
    update(req, res, next) {
        const info = JSON.parse(req.body.infos);
        let imagesArray = info.image;
        if (req.file) {
            imagesArray = req.file.path.slice(23);
        }
        imageModel.updateOne({ _id: req.params.id }, {
            image: imagesArray,
            categoryId: info.categoryId,
            title: info.title,
            content: info.content,
            promotion: info.promotion,
            position: info.position,
            status: info.status,
        })
            .then(() => res.send({ message: "Update Successfully !!!" }))
            .catch(() => res.send({ message: "Image Undefine !!!" }))
    }

    // [PATCH] /:id/active
    active = async (req, res, next) => {
        try {
            const image = await imageModel.findOne({ _id: req.params.id });
            const show = { status: "1" };
            const hidden = { status: "0" };
            image.status === "1"
                ? imageModel.findOneAndUpdate({ _id: image.id }, hidden, {
                    returnOriginal: false
                })
                    .then(() => res.send('hidden'))
                    .catch(next)
                : imageModel.findOneAndUpdate({ _id: req.params.id }, show, {
                    returnOriginal: false
                })
                    .then(() => res.send('show'))
                    .catch(next)
        } catch (error) {
            res.send({ error: "Error" });
        }
    }

    /* ----End Actions Update Image ---- */

    /* ----Begin Actions Restore Image ---- */

    // [PATCH] /restore
    restore(req, res, next) {
        try {
            const ids = req.body.data;
            ids.forEach(value => imageModel.restore({ _id: value }, (err, result) => {
                if (err) throw err;
                console.log(result);
            }));
            res.send('Restore Successfully !!!');
        } catch (error) {
            res.json({ error: err });
        }

    }

    /* ----End Actions Restore Image ---- */

    /* ----Begin Actions Delete Image ---- */

    // [DELETE] /force
    forceDestroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        imageModel.deleteMany({ _id: idArr })
            .then(() => res.send('Delete Forever Successfully !!!'))
            .catch(next);
    }

    // [DELETE] /
    destroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        imageModel.delete({ _id: idArr })
            .then(() => res.send('Delete Successfully !!!'))
            .catch(next);
    }

    /* ----End Actions Delete Image ---- */

    /* ----Begin Actions Show Image ---- */
    // [GET] /
    show(req, res, next) {
        Promise.all([imageModel.find({}), imageModel.countDocumentsDeleted()])
            .then(([Images, deletedCount]) =>
                res.json({
                    deletedCount,
                    Images
                })
            )
            .catch(next)
    }

    // [GET] /:id/edit
    showById(req, res, next) {
        imageModel.findOne({ _id: req.params.id })
            .then(image => {
                res.json(image)
            })
            .catch(next)
    }

    // [GET] /:slug
    showBySlug(req, res, next) {
        imageModel.findOne({ slug: req.params.slug })
            .then(image => {
                res.json(image)
            })
            .catch(next)
    }

    // [GET] /trash
    trash(req, res, next) {
        imageModel.findDeleted({})
            .then(image => res.json(image))
            .catch(next)
    }
    /* ----End Actions Show Image ---- */

    // [Image] /handle-form-actions
    // handleFormAction(req, res, next) {
    //     switch (req.body.action) {
    //         case 'delete':
    //             imageModel.delete({ _id: { $in: req.body.ImageIds } })
    //                 // .then(() => res.redirect('back'))
    //                 .then(() => res.send('Đã xóa các sản phẩm đã chọn !!!'))
    //                 .catch(next);
    //             break;

    //         default:
    //             res.json({ message: 'Action in invalid' })
    //     }
    // }

}

module.exports = new ImageController();